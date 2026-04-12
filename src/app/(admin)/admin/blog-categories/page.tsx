import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BlogCategoryCreateForm } from "@/components/admin/BlogCategoryCreateForm";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Blog categories" };

export default async function AdminBlogCategoriesPage() {
  const categories = await prisma.blogCategory.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/blogs">← Blog posts</Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">Blog categories</h1>
      </div>
      <BlogCategoryCreateForm />
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-200/60 dark:bg-zinc-800/60 text-left">
            <tr>
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Slug</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t border-zinc-200 dark:border-zinc-800">
                <td className="p-3">{c.name}</td>
                <td className="p-3 font-mono text-xs">{c.slug}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
