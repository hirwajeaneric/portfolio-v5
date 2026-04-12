import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, extractSessionInfo } from "@/lib/auth/session";
import { rateLimitLogin } from "@/lib/auth/rate-limit";
import { validateRequest, loginSchema } from "@/lib/auth/validation";
import { generateCSRFToken } from "@/lib/auth/csrf";
import { getAccessTokenMaxAge, getRefreshTokenMaxAge } from "@/lib/auth/jwt";

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimitLogin(request);
    if (!rateLimitResult.success) return rateLimitResult.response!;

    const body = await request.json();
    const validation = validateRequest(loginSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: validation.errors.issues.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    if (!user.active) {
      return NextResponse.json({ error: "Account is deactivated" }, { status: 403 });
    }

    const passwordValid = await verifyPassword(password, user.password);
    if (!passwordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const sessionInfo = extractSessionInfo(request);
    const { session, accessToken, refreshToken } = await createSession(
      user.id,
      user.email,
      user.role,
      sessionInfo
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const csrfToken = generateCSRFToken();
    const cookieStore = await cookies();
    cookieStore.set("access-token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: getAccessTokenMaxAge(),
      path: "/",
    });
    cookieStore.set("refresh-token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: getRefreshTokenMaxAge(),
      path: "/",
    });
    cookieStore.set("csrf-token", csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: getRefreshTokenMaxAge(),
      path: "/",
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        session: {
          id: session.id,
          device: session.device,
          browser: session.browser,
          os: session.os,
          ipAddress: session.ipAddress,
        },
        requirePasswordReset: user.requirePasswordReset,
        csrfToken,
      },
      {
        status: 200,
        headers: { "X-CSRF-Token": csrfToken },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
