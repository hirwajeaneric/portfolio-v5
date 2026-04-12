import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { promoUpdateSchema } from "@/lib/admin/schemas";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.promoAd.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = promoUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const updated = await prisma.promoAd.update({
    where: { id },
    data: {
      ...(data.placements !== undefined && { placements: data.placements }),
      ...(data.kicker !== undefined && { kicker: data.kicker }),
      ...(data.headlineLead !== undefined && { headlineLead: data.headlineLead }),
      ...(data.headlineEmphasis !== undefined && { headlineEmphasis: data.headlineEmphasis }),
      ...(data.body !== undefined && { body: data.body }),
      ...(data.ctaLabel !== undefined && { ctaLabel: data.ctaLabel }),
      ...(data.ctaUrl !== undefined && { ctaUrl: data.ctaUrl }),
      ...(data.active !== undefined && { active: data.active }),
      ...(data.priority !== undefined && { priority: data.priority }),
    },
  });

  return NextResponse.json({ id: updated.id });
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.promoAd.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.promoAd.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
