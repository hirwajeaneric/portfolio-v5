import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { blogCategoryUpdateSchema } from "@/lib/admin/schemas";
import { slugFromText } from "@/lib/admin/slug";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.blogCategory.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = blogCategoryUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  let slug = existing.slug;
  if (data.slug !== undefined) slug = data.slug;
  else if (data.name !== undefined && data.slug === undefined) {
    const s = slugFromText(data.name);
    if (s) slug = s;
  }

  if (slug !== existing.slug) {
    const clash = await prisma.blogCategory.findFirst({
      where: { slug, NOT: { id } },
    });
    if (clash) return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
  }

  const updated = await prisma.blogCategory.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      slug,
    },
  });

  return NextResponse.json({ id: updated.id, slug: updated.slug });
}
