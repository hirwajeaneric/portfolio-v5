import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { Prisma } from "@/generated/prisma/client";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { projectCreateSchema } from "@/lib/admin/schemas";
import { slugFromText } from "@/lib/admin/slug";
import { uniqueProjectSlug } from "@/lib/admin/unique-slug";

const SORT_FIELDS = ["updatedAt", "createdAt", "name", "slug", "category", "published", "sortOrder"] as const;
type SortField = (typeof SORT_FIELDS)[number];

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: false, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10) || 1);
  const pageSize = Math.min(100, Math.max(1, Number.parseInt(searchParams.get("pageSize") || "10", 10) || 10));
  const q = searchParams.get("q")?.trim();
  const sortByRaw = searchParams.get("sortBy") || "sortOrder";
  const sortBy: SortField = SORT_FIELDS.includes(sortByRaw as SortField) ? (sortByRaw as SortField) : "sortOrder";
  const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

  const where: Prisma.ProjectWhereInput = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { slug: { contains: q, mode: "insensitive" } },
          { client: { contains: q, mode: "insensitive" } },
          { typeLabel: { contains: q, mode: "insensitive" } },
        ],
      }
    : {};

  const orderBy: Prisma.ProjectOrderByWithRelationInput = { [sortBy]: sortOrder };

  const [items, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        published: true,
        sortOrder: true,
        client: true,
        updatedAt: true,
        createdAt: true,
      },
    }),
    prisma.project.count({ where }),
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

  const parsed = projectCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const baseSlug = data.slug ?? slugFromText(data.name);
  if (!baseSlug) return NextResponse.json({ error: "Could not derive slug" }, { status: 400 });
  const slug = await uniqueProjectSlug(baseSlug);

  const row = await prisma.project.create({
    data: {
      name: data.name,
      slug,
      category: data.category,
      description: data.description ?? null,
      deliverable: data.deliverable ?? null,
      challenge: data.challenge ?? null,
      goal: data.goal ?? null,
      result: data.result ?? null,
      client: data.client,
      timeline: data.timeline,
      link: data.link,
      imageUrl: data.imageUrl,
      typeLabel: data.typeLabel,
      technologies: data.technologies,
      otherLinks: data.otherLinks,
      gallery: data.gallery,
      published: data.published ?? true,
      sortOrder: data.sortOrder ?? 0,
    },
  });

  return NextResponse.json({ id: row.id, slug: row.slug }, { status: 201 });
}
