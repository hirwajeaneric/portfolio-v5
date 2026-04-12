import jwt from "jsonwebtoken";
import type { UserRole } from "@/lib/rbac";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

const JWT_ISSUER = "portfolio-v5";
const JWT_AUDIENCE = "portfolio-v5-users";

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error("JWT_SECRET and JWT_REFRESH_SECRET must be set in environment variables");
}

const JWT_SECRET_NON_NULL = JWT_SECRET!;
const JWT_REFRESH_SECRET_NON_NULL = JWT_REFRESH_SECRET!;

export function parseTimeToSeconds(timeString: string): number {
  const match = timeString.match(/^(\d+)([smhd])$/);
  if (!match) {
    console.warn(`Invalid time format: ${timeString}, defaulting to 15 minutes`);
    return 60 * 15;
  }
  const value = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 60 * 60 * 24;
    default:
      return 60 * 15;
  }
}

export function getAccessTokenMaxAge(): number {
  return parseTimeToSeconds(JWT_EXPIRES_IN);
}

export function getRefreshTokenMaxAge(): number {
  return parseTimeToSeconds(JWT_REFRESH_EXPIRES_IN);
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  sessionId: string;
}

export interface RefreshTokenPayload {
  userId: string;
  sessionId: string;
}

export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET_NON_NULL, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  } as jwt.SignOptions);
}

export function generateRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET_NON_NULL, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  } as jwt.SignOptions);
}

export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_NON_NULL, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    }) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET_NON_NULL, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    }) as RefreshTokenPayload;
    return decoded;
  } catch {
    return null;
  }
}
