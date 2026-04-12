import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { awardUpdateSchema } from "@/lib/admin/schemas";

type Ctx = { params: Promise<{ id: string }> };

function parseIssuedAt(v: string | null | undefined) {
  if (v === undefined) return undefined;
  if (v === null || v === "") return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.award.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = awardUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;
  const issuedAt =
    d.issuedAt === undefined ? undefined : parseIssuedAt(d.issuedAt === null ? "" : d.issuedAt);

  const updated = await prisma.award.update({
    where: { id },
    data: {
      ...(d.kind !== undefined && { kind: d.kind }),
      ...(d.title !== undefined && { title: d.title }),
      ...(d.issuer !== undefined && { issuer: d.issuer }),
      ...(d.description !== undefined && { description: d.description }),
      ...(issuedAt !== undefined && { issuedAt }),
      ...(d.attachmentUrl !== undefined && { attachmentUrl: d.attachmentUrl }),
      ...(d.attachmentPublicId !== undefined && { attachmentPublicId: d.attachmentPublicId }),
      ...(d.thumbnailUrl !== undefined && { thumbnailUrl: d.thumbnailUrl }),
      ...(d.sortOrder !== undefined && { sortOrder: d.sortOrder }),
    },
  });

  return NextResponse.json({ id: updated.id });
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.award.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.award.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
