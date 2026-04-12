import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { userPatchSchema } from "@/lib/admin/schemas";

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

  const parsed = userPatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;
  if (id === auth.auth.userId && d.active === false) {
    return NextResponse.json({ error: "You cannot deactivate your own account" }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { id },
    data: {
      ...(d.name !== undefined && { name: d.name }),
      ...(d.role !== undefined && { role: d.role }),
      ...(d.active !== undefined && { active: d.active }),
      ...(d.requirePasswordReset !== undefined && { requirePasswordReset: d.requirePasswordReset }),
    },
    select: { id: true, email: true, name: true, role: true, active: true, requirePasswordReset: true },
  });

  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireAdmin: true });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  if (id === auth.auth.userId) {
    return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
