import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { Prisma } from "@/generated/prisma/client";
import { CommentStatus } from "@/generated/prisma/enums";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";

const COMMENT_STATUSES = new Set<string>(Object.values(CommentStatus));

const SORT_FIELDS = ["createdAt", "updatedAt", "status", "authorName"] as const;
type SortField = (typeof SORT_FIELDS)[number];

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: false, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10) || 1);
  const pageSize = Math.min(100, Math.max(1, Number.parseInt(searchParams.get("pageSize") || "10", 10) || 10));
  const q = searchParams.get("q")?.trim();
  const statusFilter = searchParams.get("status")?.trim();
  const sortByRaw = searchParams.get("sortBy") || "createdAt";
  const sortBy: SortField = SORT_FIELDS.includes(sortByRaw as SortField) ? (sortByRaw as SortField) : "createdAt";
  const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

  const where: Prisma.BlogCommentWhereInput = {
    ...(statusFilter && COMMENT_STATUSES.has(statusFilter)
      ? { status: statusFilter as CommentStatus }
      : {}),
    ...(q
      ? {
          OR: [
            { body: { contains: q, mode: "insensitive" } },
            { authorName: { contains: q, mode: "insensitive" } },
            { authorEmail: { contains: q, mode: "insensitive" } },
            { post: { title: { contains: q, mode: "insensitive" } } },
            { post: { slug: { contains: q, mode: "insensitive" } } },
          ],
        }
      : {}),
  };

  const orderBy: Prisma.BlogCommentOrderByWithRelationInput = { [sortBy]: sortOrder };

  const [items, total] = await Promise.all([
    prisma.blogComment.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        body: true,
        status: true,
        authorName: true,
        authorEmail: true,
        createdAt: true,
        updatedAt: true,
        post: { select: { id: true, title: true, slug: true } },
      },
    }),
    prisma.blogComment.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, pageSize });
}
