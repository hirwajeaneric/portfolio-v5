import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { contactPatchSchema } from "@/lib/admin/schemas";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  const { id } = await ctx.params;
  const existing = await prisma.contactMessage.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactPatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const nextStatus = data.status ?? existing.status;
  const updated = await prisma.contactMessage.update({
    where: { id },
    data: {
      ...(data.status !== undefined && { status: data.status }),
      ...(data.adminNotes !== undefined && { adminNotes: data.adminNotes }),
      ...(nextStatus === "REPLIED" && !existing.repliedAt ? { repliedAt: new Date() } : {}),
    },
  });

  return NextResponse.json({
    id: updated.id,
    status: updated.status,
    adminNotes: updated.adminNotes,
    repliedAt: updated.repliedAt,
  });
}
