import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { blogPostUpdateSchema } from "@/lib/admin/schemas";
import { uniqueBlogSlug } from "@/lib/admin/unique-slug";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = blogPostUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  if (data.categoryId) {
    const cat = await prisma.blogCategory.findUnique({ where: { id: data.categoryId } });
    if (!cat) return NextResponse.json({ error: "Category not found" }, { status: 400 });
  }

  let slug = existing.slug;
  if (data.slug !== undefined) {
    slug = await uniqueBlogSlug(data.slug, id);
  }

  const updated = await prisma.blogPost.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      slug,
      ...(data.introduction !== undefined && { introduction: data.introduction }),
      ...(data.content !== undefined && { content: data.content }),
      ...(data.coverImageUrl !== undefined && { coverImageUrl: data.coverImageUrl }),
      ...(data.readTime !== undefined && { readTime: data.readTime }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
    },
  });

  return NextResponse.json({ id: updated.id, slug: updated.slug });
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
