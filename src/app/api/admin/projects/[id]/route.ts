import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { projectUpdateSchema } from "@/lib/admin/schemas";
import { uniqueProjectSlug } from "@/lib/admin/unique-slug";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = projectUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  let slug = existing.slug;
  if (data.slug !== undefined) {
    slug = await uniqueProjectSlug(data.slug, id);
  }

  const updated = await prisma.project.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      slug,
      ...(data.category !== undefined && { category: data.category }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.deliverable !== undefined && { deliverable: data.deliverable }),
      ...(data.challenge !== undefined && { challenge: data.challenge }),
      ...(data.goal !== undefined && { goal: data.goal }),
      ...(data.result !== undefined && { result: data.result }),
      ...(data.client !== undefined && { client: data.client }),
      ...(data.timeline !== undefined && { timeline: data.timeline }),
      ...(data.link !== undefined && { link: data.link }),
      ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
      ...(data.typeLabel !== undefined && { typeLabel: data.typeLabel }),
      ...(data.technologies !== undefined && { technologies: data.technologies }),
      ...(data.otherLinks !== undefined && { otherLinks: data.otherLinks }),
      ...(data.gallery !== undefined && { gallery: data.gallery }),
      ...(data.published !== undefined && { published: data.published }),
      ...(data.sortOrder !== undefined && { sortOrder: data.sortOrder }),
    },
  });

  return NextResponse.json({ id: updated.id, slug: updated.slug });
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
