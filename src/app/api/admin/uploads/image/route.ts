import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/middleware";
import { uploadImage } from "@/lib/cloudinary";

const MAX_BYTES = 15 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request, { requireCSRF: true, requireRole: "EDITOR" });
  if (!auth.success) return auth.response;

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json(
      { error: "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET." },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  const entry = formData.get("file");
  if (!(entry instanceof File)) {
    return NextResponse.json({ error: "Missing file field" }, { status: 400 });
  }

  if (entry.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 15MB)" }, { status: 400 });
  }

  const mime = entry.type || "";
  if (!mime.startsWith("image/")) {
    return NextResponse.json({ error: "Only image uploads are allowed" }, { status: 400 });
  }

  const folderRaw = formData.get("folder");
  const trimmed = typeof folderRaw === "string" ? folderRaw.trim() : "";
  const sanitized =
    trimmed.length > 0
      ? trimmed
          .replace(/^\/+|\/+$/g, "")
          .replace(/[^a-zA-Z0-9/_-]/g, "")
          .slice(0, 120)
      : "";
  const folder = sanitized.length > 0 ? sanitized : "portfolio";

  const buffer = Buffer.from(await entry.arrayBuffer());

  try {
    const uploaded = await uploadImage(buffer, {
      folder,
      tags: ["portfolio-admin", auth.auth.userId],
    });
    return NextResponse.json({
      public_id: uploaded.public_id,
      secure_url: uploaded.secure_url,
      width: uploaded.width,
      height: uploaded.height,
      format: uploaded.format,
    });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
