import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { BlogStatus, CommentStatus } from "@/generated/prisma/enums";
import { rateLimitPublicWrite } from "@/lib/auth/rate-limit";

const postSchema = z.object({
  authorName: z.string().min(2).max(80),
  authorEmail: z.string().email().optional(),
  body: z.string().min(4).max(8000),
});

export async function GET(_request: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const post = await prisma.blogPost.findFirst({
    where: { slug, status: BlogStatus.PUBLISHED },
    select: { id: true },
  });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const comments = await prisma.blogComment.findMany({
    where: { postId: post.id, status: CommentStatus.APPROVED },
    orderBy: { createdAt: "asc" },
    select: { id: true, authorName: true, body: true, createdAt: true },
  });

  return NextResponse.json({ comments });
}

export async function POST(request: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  try {
    const rl = await rateLimitPublicWrite(request);
    if (!rl.success) return rl.response!;

    const { slug } = await ctx.params;
    const post = await prisma.blogPost.findFirst({
      where: { slug, status: BlogStatus.PUBLISHED },
      select: { id: true },
    });
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const json = (await request.json()) as Record<string, unknown>;
    if (typeof json.website === "string" && json.website.length > 0) {
      return NextResponse.json({ success: true, message: "Thanks — your comment is awaiting moderation." });
    }
    const parsed = postSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await prisma.blogComment.create({
      data: {
        postId: post.id,
        authorName: parsed.data.authorName,
        authorEmail: parsed.data.authorEmail,
        body: parsed.data.body,
        status: CommentStatus.PENDING,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thanks — your comment is awaiting moderation.",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
