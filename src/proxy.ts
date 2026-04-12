import { NextResponse, type NextRequest } from "next/server";
import { VISITOR_COOKIE } from "@/lib/constants";

/**
 * Next.js 16+ network-boundary handler (replaces deprecated `middleware.ts`).
 * @see https://nextjs.org/docs/messages/middleware-to-proxy
 */
export function proxy(request: NextRequest) {
  const res = NextResponse.next();
  if (!request.cookies.get(VISITOR_COOKIE)?.value) {
    res.cookies.set(VISITOR_COOKIE, crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 400,
    });
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
