import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { promoCreateSchema } from "@/lib/admin/schemas";

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = promoCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const row = await prisma.promoAd.create({
    data: {
      placements: data.placements,
      kicker: data.kicker,
      headlineLead: data.headlineLead,
      headlineEmphasis: data.headlineEmphasis,
      body: data.body,
      ctaLabel: data.ctaLabel,
      ctaUrl: data.ctaUrl,
      active: data.active ?? true,
      priority: data.priority ?? 0,
    },
  });

  return NextResponse.json({ id: row.id }, { status: 201 });
}
