import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { blogCategoryCreateSchema } from "@/lib/admin/schemas";
import { slugFromText } from "@/lib/admin/slug";

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = blogCategoryCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const slug = parsed.data.slug ?? slugFromText(parsed.data.name);
  if (!slug) return NextResponse.json({ error: "Could not derive slug" }, { status: 400 });

  const clash = await prisma.blogCategory.findUnique({ where: { slug } });
  if (clash) return NextResponse.json({ error: "Slug already in use" }, { status: 409 });

  const row = await prisma.blogCategory.create({
    data: { name: parsed.data.name, slug },
  });

  return NextResponse.json({ id: row.id, slug: row.slug }, { status: 201 });
}
