import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id }, select: { title: true } });
  return { title: post ? `Edit: ${post.title}` : "Edit post" };
}

export default async function AdminEditBlogPage({ params }: Props) {
  const { id } = await params;
  const [post, categories] = await Promise.all([
    prisma.blogPost.findUnique({ where: { id } }),
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!post) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/blogs">← Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">Edit post</h1>
      </div>
      <BlogPostForm
        mode="edit"
        categories={categories}
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          introduction: post.introduction,
          content: post.content,
          coverImageUrl: post.coverImageUrl,
          readTime: post.readTime,
          status: post.status,
          categoryId: post.categoryId,
        }}
      />
    </div>
  );
}
