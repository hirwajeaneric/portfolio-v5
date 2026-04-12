import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { awardCreateSchema } from "@/lib/admin/schemas";

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = awardCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;
  const issuedAt =
    d.issuedAt === undefined || d.issuedAt === null || d.issuedAt === ""
      ? null
      : new Date(d.issuedAt);

  const row = await prisma.award.create({
    data: {
      kind: d.kind,
      title: d.title,
      issuer: d.issuer ?? null,
      description: d.description ?? null,
      issuedAt,
      attachmentUrl: d.attachmentUrl ?? null,
      attachmentPublicId: d.attachmentPublicId ?? null,
      thumbnailUrl: d.thumbnailUrl ?? null,
      sortOrder: d.sortOrder ?? 0,
    },
  });

  return NextResponse.json({ id: row.id }, { status: 201 });
}
