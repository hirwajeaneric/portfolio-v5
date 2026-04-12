import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./jwt";
import type { UserRole } from "@/lib/rbac";
import type { NextRequest } from "next/server";

export interface SessionInfo {
  ipAddress?: string;
  userAgent?: string;
  device?: string;
  browser?: string;
  browserVersion?: string;
  os?: string;
  osVersion?: string;
  platform?: string;
}

export function extractSessionInfo(request: NextRequest): SessionInfo {
  const userAgent = request.headers.get("user-agent") || undefined;
  const forwarded = request.headers.get("x-forwarded-for");
  const ipAddress = forwarded ? forwarded.split(",")[0].trim() : undefined;

  let device: string | undefined;
  let browser: string | undefined;
  let browserVersion: string | undefined;
  let os: string | undefined;
  let osVersion: string | undefined;
  let platform: string | undefined;

  if (userAgent) {
    if (/mobile|android|iphone|ipad/i.test(userAgent)) {
      device = "mobile";
      platform = /android/i.test(userAgent) ? "android" : "ios";
    } else if (/tablet|ipad/i.test(userAgent)) {
      device = "tablet";
    } else {
      device = "desktop";
      platform = "web";
    }
    if (/chrome/i.test(userAgent) && !/edge|edg/i.test(userAgent)) {
      browser = "Chrome";
      const match = userAgent.match(/Chrome\/(\d+)/);
      browserVersion = match ? match[1] : undefined;
    } else if (/firefox/i.test(userAgent)) {
      browser = "Firefox";
    } else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
      browser = "Safari";
    }
    if (/windows/i.test(userAgent)) os = "Windows";
    else if (/macintosh|mac os x/i.test(userAgent)) os = "macOS";
    else if (/linux/i.test(userAgent)) os = "Linux";
  }

  return { ipAddress, userAgent, device, browser, browserVersion, os, osVersion, platform };
}

export async function createSession(
  userId: string,
  userEmail: string,
  userRole: UserRole,
  sessionInfo: SessionInfo
) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const session = await prisma.session.create({
    data: {
      userId,
      token: "",
      refreshToken: "",
      expiresAt,
      ...sessionInfo,
    },
  });

  const accessToken = generateAccessToken({
    userId,
    email: userEmail,
    role: userRole,
    sessionId: session.id,
  });

  const refreshToken = generateRefreshToken({
    userId,
    sessionId: session.id,
  });

  const updatedSession = await prisma.session.update({
    where: { id: session.id },
    data: { token: accessToken, refreshToken },
  });

  return { session: updatedSession, accessToken, refreshToken };
}

export async function validateSession(token: string) {
  const payload = verifyAccessToken(token);
  if (!payload) return null;

  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
    include: { user: true },
  });

  if (!session || !session.isActive || session.expiresAt < new Date()) {
    return null;
  }

  await prisma.session.update({
    where: { id: session.id },
    data: { lastActivity: new Date() },
  });

  return { session, user: session.user, payload };
}

export async function refreshSession(refreshToken: string) {
  const payload = verifyRefreshToken(refreshToken);
  if (!payload) return null;

  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
    include: { user: true },
  });

  if (!session || !session.isActive || session.expiresAt < new Date()) return null;
  if (session.refreshToken !== refreshToken) return null;

  const newAccessToken = generateAccessToken({
    userId: session.userId,
    email: session.user.email,
    role: session.user.role as UserRole,
    sessionId: session.id,
  });

  const newRefreshToken = generateRefreshToken({
    userId: session.userId,
    sessionId: session.id,
  });

  const updatedSession = await prisma.session.update({
    where: { id: session.id },
    data: {
      token: newAccessToken,
      refreshToken: newRefreshToken,
      lastActivity: new Date(),
    },
  });

  return {
    session: updatedSession,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user: session.user,
  };
}

export async function revokeSession(sessionId: string) {
  return prisma.session.update({
    where: { id: sessionId },
    data: { isActive: false },
  });
}

export async function getSessionFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    return validateSession(token);
  }
  const cookieToken = request.cookies.get("access-token")?.value;
  if (cookieToken) return validateSession(cookieToken);
  return null;
}

/** Server Components / Server Actions — reads `access-token` from the incoming request cookies. */
export async function getSessionFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access-token")?.value;
  if (!token) return null;
  return validateSession(token);
}
