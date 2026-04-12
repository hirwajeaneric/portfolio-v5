import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { experienceCreateSchema } from "@/lib/admin/schemas";

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = experienceCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;
  const row = await prisma.experience.create({
    data: {
      company: d.company,
      title: d.title,
      location: d.location ?? null,
      startDate: d.startDate,
      endDate: d.endDate ?? null,
      current: d.current ?? false,
      bullets: d.bullets,
      sortOrder: d.sortOrder ?? 0,
    },
  });

  return NextResponse.json({ id: row.id }, { status: 201 });
}
