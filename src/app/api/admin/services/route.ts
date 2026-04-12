import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { serviceCreateSchema } from "@/lib/admin/schemas";
import { slugFromText } from "@/lib/admin/slug";
import { uniqueServiceSlug } from "@/lib/admin/unique-slug";

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = serviceCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const baseSlug = data.slug ?? slugFromText(data.name);
  if (!baseSlug) return NextResponse.json({ error: "Could not derive slug" }, { status: 400 });
  const slug = await uniqueServiceSlug(baseSlug);

  const sections = data.sections.map((s, i) => ({
    title: s.title,
    description: s.description,
    sortOrder: s.sortOrder ?? i,
  }));

  const row = await prisma.service.create({
    data: {
      name: data.name,
      slug,
      shortDescription: data.shortDescription,
      heroImageUrl: data.heroImageUrl,
      showOnHome: data.showOnHome ?? false,
      homeSortOrder: data.homeSortOrder ?? 0,
      technologies: data.technologies,
      sections: { create: sections },
    },
  });

  return NextResponse.json({ id: row.id, slug: row.slug }, { status: 201 });
}
