import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { userPasswordPatchSchema } from "@/lib/admin/schemas";
import { hashPassword } from "@/lib/auth/password";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireAdmin: true });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = userPasswordPatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const hashed = await hashPassword(parsed.data.password);
  await prisma.user.update({
    where: { id },
    data: {
      password: hashed,
      requirePasswordReset: id !== auth.auth.userId,
    },
  });

  return NextResponse.json({ ok: true });
}
