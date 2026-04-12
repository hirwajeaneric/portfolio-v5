import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { testimonialUpdateSchema } from "@/lib/admin/schemas";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.testimonial.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = testimonialUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;
  const updated = await prisma.testimonial.update({
    where: { id },
    data: {
      ...(d.headline !== undefined && { headline: d.headline }),
      ...(d.quote !== undefined && { quote: d.quote }),
      ...(d.authorName !== undefined && { authorName: d.authorName }),
      ...(d.authorRole !== undefined && { authorRole: d.authorRole }),
      ...(d.companyLogoUrl !== undefined && { companyLogoUrl: d.companyLogoUrl }),
      ...(d.avatarUrl !== undefined && { avatarUrl: d.avatarUrl }),
      ...(d.featured !== undefined && { featured: d.featured }),
      ...(d.sortOrder !== undefined && { sortOrder: d.sortOrder }),
    },
  });

  return NextResponse.json({ id: updated.id });
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.testimonial.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
