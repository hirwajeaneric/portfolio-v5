import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { refreshSession } from "@/lib/auth/session";
import { getAccessTokenMaxAge, getRefreshTokenMaxAge } from "@/lib/auth/jwt";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh-token")?.value;
    if (!refreshToken) {
      return NextResponse.json({ error: "Refresh token not found" }, { status: 401 });
    }

    const sessionData = await refreshSession(refreshToken);
    if (!sessionData) {
      cookieStore.delete("access-token");
      cookieStore.delete("refresh-token");
      cookieStore.delete("csrf-token");
      return NextResponse.json({ error: "Invalid or expired refresh token" }, { status: 401 });
    }

    cookieStore.set("access-token", sessionData.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: getAccessTokenMaxAge(),
      path: "/",
    });
    cookieStore.set("refresh-token", sessionData.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: getRefreshTokenMaxAge(),
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: sessionData.user.id,
        email: sessionData.user.email,
        name: sessionData.user.name,
        role: sessionData.user.role,
      },
    });
  } catch (error) {
    console.error("Refresh session error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
