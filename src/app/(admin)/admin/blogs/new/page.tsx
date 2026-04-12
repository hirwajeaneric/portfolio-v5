import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "New blog post" };

export default async function AdminNewBlogPage() {
  const categories = await prisma.blogCategory.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/blogs">← Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">New blog post</h1>
      </div>
      <BlogPostForm mode="create" categories={categories} initial={null} />
    </div>
  );
}
