import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSessionFromRequest } from "./session";
import { validateCSRFToken } from "./csrf";
import type { UserRole } from "@/lib/rbac";
import { requireAdmin as isAdmin, requireRole as roleAtLeast } from "@/lib/rbac";

export interface AuthenticatedRequest {
  userId: string;
  userEmail: string;
  userRole: UserRole;
  sessionId: string;
}

export async function authenticateRequest(
  request: NextRequest,
  requireCSRF: boolean = true
): Promise<
  { success: true; auth: AuthenticatedRequest } | { success: false; response: NextResponse }
> {
  if (requireCSRF && ["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) {
    if (!validateCSRFToken(request)) {
      return {
        success: false,
        response: NextResponse.json({ error: "Invalid or missing CSRF token" }, { status: 403 }),
      };
    }
  }

  const sessionData = await getSessionFromRequest(request);
  if (!sessionData) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Unauthorized", message: "Invalid or expired session" },
        { status: 401 }
      ),
    };
  }

  return {
    success: true,
    auth: {
      userId: sessionData.user.id,
      userEmail: sessionData.user.email,
      userRole: sessionData.user.role as UserRole,
      sessionId: sessionData.session.id,
    },
  };
}

export async function requireAuth(
  request: NextRequest,
  options: {
    requireCSRF?: boolean;
    requireRole?: UserRole;
    requireAdmin?: boolean;
  } = {}
): Promise<
  { success: true; auth: AuthenticatedRequest } | { success: false; response: NextResponse }
> {
  const authResult = await authenticateRequest(request, options.requireCSRF ?? true);
  if (!authResult.success) return authResult;

  if (options.requireAdmin && !isAdmin(authResult.auth.userRole)) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Forbidden", message: "Admin access required" },
        { status: 403 }
      ),
    };
  }

  if (options.requireRole && !roleAtLeast(authResult.auth.userRole, options.requireRole)) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Forbidden", message: "Insufficient permissions" },
        { status: 403 }
      ),
    };
  }

  return authResult;
}
