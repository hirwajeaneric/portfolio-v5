import type { NextRequest } from "next/server";
import Tokens from "csrf";

const CSRF_SECRET = process.env.CSRF_SECRET;

if (!CSRF_SECRET) {
  throw new Error("CSRF_SECRET must be set in environment variables");
}

const tokens = new Tokens();

export function generateCSRFToken(): string {
  return tokens.create(CSRF_SECRET!);
}

export function verifyCSRFToken(token: string): boolean {
  try {
    return tokens.verify(CSRF_SECRET!, token);
  } catch {
    return false;
  }
}

export function getCSRFTokenFromRequest(request: NextRequest): string | null {
  return (
    request.headers.get("X-CSRF-Token") ||
    request.headers.get("X-XSRF-Token") ||
    request.cookies.get("csrf-token")?.value ||
    null
  );
}

export function validateCSRFToken(request: NextRequest): boolean {
  const token = getCSRFTokenFromRequest(request);
  if (!token) return false;
  return verifyCSRFToken(token);
}
