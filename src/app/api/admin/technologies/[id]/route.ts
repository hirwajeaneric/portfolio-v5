import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { technologyUpdateSchema } from "@/lib/admin/schemas";
import { uniqueTechnologySlug } from "@/lib/admin/unique-slug";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.technology.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = technologyUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;
  let slug = existing.slug;
  if (d.slug !== undefined) {
    slug = await uniqueTechnologySlug(d.slug, id);
  }

  const updated = await prisma.technology.update({
    where: { id },
    data: {
      slug,
      ...(d.name !== undefined && { name: d.name }),
      ...(d.category !== undefined && { category: d.category }),
      ...(d.iconKey !== undefined && { iconKey: d.iconKey }),
      ...(d.sortOrder !== undefined && { sortOrder: d.sortOrder }),
      ...(d.active !== undefined && { active: d.active }),
    },
  });

  return NextResponse.json({ id: updated.id, slug: updated.slug });
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.technology.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.technology.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
