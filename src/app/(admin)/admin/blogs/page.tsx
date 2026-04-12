import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminBlogPostsDataTable } from "@/components/admin/AdminBlogPostsDataTable";

export const metadata: Metadata = { title: "Blog posts" };

export default function AdminBlogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Blog posts</h1>
          <p className="text-sm text-muted-foreground mt-1">Search, sort, and paginate. HTML content is edited with the rich text editor.</p>
        </div>
        <Button asChild>
          <Link href="/admin/blogs/new">New post</Link>
        </Button>
      </div>
      <AdminBlogPostsDataTable />
    </div>
  );
}
