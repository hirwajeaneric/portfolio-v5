import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { prisma } from "@/lib/prisma";
import { siteSettingsPatchSchema } from "@/lib/admin/schemas";

/** Upsert the single `default` site settings row (admin only). */
export async function PATCH(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: true, requireAdmin: true });
  if (!auth.success) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = siteSettingsPatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;
  const updated = await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      siteName: d.siteName ?? null,
      socialLinks: d.socialLinks ?? [],
      iconCloudSlugs: d.iconCloudSlugs ?? [],
    },
    update: {
      ...(d.siteName !== undefined && { siteName: d.siteName }),
      ...(d.socialLinks !== undefined && { socialLinks: d.socialLinks }),
      ...(d.iconCloudSlugs !== undefined && { iconCloudSlugs: d.iconCloudSlugs }),
    },
  });

  return NextResponse.json({
    id: updated.id,
    siteName: updated.siteName,
    socialLinks: updated.socialLinks,
    iconCloudSlugs: updated.iconCloudSlugs,
  });
}
