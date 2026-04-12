import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { Prisma } from "@/generated/prisma/client";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { blogPostCreateSchema } from "@/lib/admin/schemas";
import { slugFromText } from "@/lib/admin/slug";
import { uniqueBlogSlug } from "@/lib/admin/unique-slug";

const SORT_FIELDS = ["updatedAt", "title", "status", "createdAt"] as const;
type SortField = (typeof SORT_FIELDS)[number];

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: false, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10) || 1);
  const pageSize = Math.min(100, Math.max(1, Number.parseInt(searchParams.get("pageSize") || "10", 10) || 10));
  const q = searchParams.get("q")?.trim();
  const sortByRaw = searchParams.get("sortBy") || "updatedAt";
  const sortBy: SortField = SORT_FIELDS.includes(sortByRaw as SortField)
    ? (sortByRaw as SortField)
    : "updatedAt";
  const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

  const where: Prisma.BlogPostWhereInput = q
    ? {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { slug: { contains: q, mode: "insensitive" } },
          { introduction: { contains: q, mode: "insensitive" } },
        ],
      }
    : {};

  const orderBy: Prisma.BlogPostOrderByWithRelationInput = { [sortBy]: sortOrder };

  const [items, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        updatedAt: true,
        createdAt: true,
        category: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.blogPost.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, pageSize });
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = blogPostCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const baseSlug = data.slug ?? slugFromText(data.title);
  if (!baseSlug) {
    return NextResponse.json({ error: "Could not derive slug from title" }, { status: 400 });
  }
  const slug = await uniqueBlogSlug(baseSlug);

  if (data.categoryId) {
    const cat = await prisma.blogCategory.findUnique({ where: { id: data.categoryId } });
    if (!cat) return NextResponse.json({ error: "Category not found" }, { status: 400 });
  }

  const post = await prisma.blogPost.create({
    data: {
      title: data.title,
      slug,
      introduction: data.introduction,
      content: data.content,
      coverImageUrl: data.coverImageUrl,
      readTime: data.readTime ?? "5 min",
      status: data.status,
      categoryId: data.categoryId ?? null,
    },
  });

  return NextResponse.json({ id: post.id, slug: post.slug }, { status: 201 });
}
