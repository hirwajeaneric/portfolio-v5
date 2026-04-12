import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revokeSession } from "@/lib/auth/session";
import { authenticateRequest } from "@/lib/auth/middleware";

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request, false);
    const cookieStore = await cookies();
    if (!authResult.success) {
      cookieStore.delete("access-token");
      cookieStore.delete("refresh-token");
      cookieStore.delete("csrf-token");
      return NextResponse.json({ success: true });
    }
    await revokeSession(authResult.auth.sessionId);
    cookieStore.delete("access-token");
    cookieStore.delete("refresh-token");
    cookieStore.delete("csrf-token");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
