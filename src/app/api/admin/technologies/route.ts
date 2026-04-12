import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { technologyCreateSchema } from "@/lib/admin/schemas";
import { slugFromText } from "@/lib/admin/slug";
import { uniqueTechnologySlug } from "@/lib/admin/unique-slug";

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = technologyCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;
  const baseSlug = d.slug ?? slugFromText(d.name);
  if (!baseSlug) return NextResponse.json({ error: "Could not derive slug" }, { status: 400 });
  const slug = await uniqueTechnologySlug(baseSlug);

  const row = await prisma.technology.create({
    data: {
      slug,
      name: d.name,
      category: d.category,
      iconKey: d.iconKey,
      sortOrder: d.sortOrder ?? 0,
      active: d.active ?? true,
    },
  });

  return NextResponse.json({ id: row.id, slug: row.slug }, { status: 201 });
}
