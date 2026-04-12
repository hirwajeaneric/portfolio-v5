import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BlogStatus } from "@/generated/prisma/enums";
import { VISITOR_COOKIE } from "@/lib/constants";
import { rateLimitPublicWrite } from "@/lib/auth/rate-limit";

export async function GET(request: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const post = await prisma.blogPost.findFirst({
    where: { slug, status: BlogStatus.PUBLISHED },
    select: { id: true },
  });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const visitor = request.cookies.get(VISITOR_COOKIE)?.value;
  const count = await prisma.blogLike.count({ where: { postId: post.id } });
  let liked = false;
  if (visitor) {
    const row = await prisma.blogLike.findFirst({
      where: { postId: post.id, visitorKey: visitor },
    });
    liked = !!row;
  }
  return NextResponse.json({ count, liked });
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

    const visitor = request.cookies.get(VISITOR_COOKIE)?.value;
    if (!visitor) {
      return NextResponse.json({ error: "Missing visitor cookie" }, { status: 400 });
    }

    const existing = await prisma.blogLike.findFirst({
      where: { postId: post.id, visitorKey: visitor },
    });

    let liked: boolean;
    if (existing) {
      await prisma.blogLike.delete({ where: { id: existing.id } });
      liked = false;
    } else {
      await prisma.blogLike.create({
        data: { postId: post.id, visitorKey: visitor },
      });
      liked = true;
    }

    const count = await prisma.blogLike.count({ where: { postId: post.id } });
    return NextResponse.json({ count, liked });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
