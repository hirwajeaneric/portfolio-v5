import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { listCloudinaryImages } from "@/lib/cloudinary";

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: false, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      { error: "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET." },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get("prefix") ?? undefined;
  const q = searchParams.get("q") ?? undefined;
  const nextCursor = searchParams.get("cursor") ?? undefined;
  const limitRaw = searchParams.get("limit");
  const limit = limitRaw ? Math.min(100, Math.max(1, Number.parseInt(limitRaw, 10) || 24)) : 24;

  try {
    const result = await listCloudinaryImages({
      prefix,
      maxResults: limit,
      nextCursor: nextCursor || null,
      search: q || undefined,
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error("Cloudinary list error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to list media" },
      { status: 500 }
    );
  }
}
