import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { Prisma } from "@/generated/prisma/client";
import { ContactStatus } from "@/generated/prisma/enums";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";

const SORT_FIELDS = ["createdAt", "updatedAt", "status", "fullName", "email"] as const;
type SortField = (typeof SORT_FIELDS)[number];

const MESSAGE_STATUSES = new Set<string>(Object.values(ContactStatus));

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

  const where: Prisma.ContactMessageWhereInput = {
    ...(statusFilter && MESSAGE_STATUSES.has(statusFilter)
      ? { status: statusFilter as ContactStatus }
      : {}),
    ...(q
      ? {
          OR: [
            { fullName: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
            { message: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const orderBy: Prisma.ContactMessageOrderByWithRelationInput = { [sortBy]: sortOrder };

  const [items, total] = await Promise.all([
    prisma.contactMessage.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        fullName: true,
        email: true,
        message: true,
        status: true,
        adminNotes: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.contactMessage.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, pageSize });
}
