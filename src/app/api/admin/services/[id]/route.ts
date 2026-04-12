import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { serviceUpdateSchema } from "@/lib/admin/schemas";
import { uniqueServiceSlug } from "@/lib/admin/unique-slug";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = serviceUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  let slug = existing.slug;
  if (data.slug !== undefined) {
    slug = await uniqueServiceSlug(data.slug, id);
  }

  const sectionsPayload = data.sections;
  const hasSectionReplace = sectionsPayload !== undefined;

  await prisma.$transaction(async (tx) => {
    await tx.service.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        slug,
        ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription }),
        ...(data.heroImageUrl !== undefined && { heroImageUrl: data.heroImageUrl }),
        ...(data.showOnHome !== undefined && { showOnHome: data.showOnHome }),
        ...(data.homeSortOrder !== undefined && { homeSortOrder: data.homeSortOrder }),
        ...(data.technologies !== undefined && { technologies: data.technologies }),
      },
    });

    if (hasSectionReplace) {
      await tx.serviceSection.deleteMany({ where: { serviceId: id } });
      const rows = sectionsPayload!.map((s, i) => ({
        serviceId: id,
        title: s.title,
        description: s.description,
        sortOrder: s.sortOrder ?? i,
      }));
      if (rows.length) await tx.serviceSection.createMany({ data: rows });
    }
  });

  return NextResponse.json({ id, slug });
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.service.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
