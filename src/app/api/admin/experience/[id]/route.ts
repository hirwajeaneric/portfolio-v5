import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { experienceUpdateSchema } from "@/lib/admin/schemas";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.experience.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = experienceUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;
  const updated = await prisma.experience.update({
    where: { id },
    data: {
      ...(d.company !== undefined && { company: d.company }),
      ...(d.title !== undefined && { title: d.title }),
      ...(d.location !== undefined && { location: d.location }),
      ...(d.startDate !== undefined && { startDate: d.startDate }),
      ...(d.endDate !== undefined && { endDate: d.endDate }),
      ...(d.current !== undefined && { current: d.current }),
      ...(d.bullets !== undefined && { bullets: d.bullets }),
      ...(d.sortOrder !== undefined && { sortOrder: d.sortOrder }),
    },
  });

  return NextResponse.json({ id: updated.id });
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.experience.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.experience.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
