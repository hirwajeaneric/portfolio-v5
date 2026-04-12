import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Testimonials" };

export default async function AdminTestimonialsPage() {
  const rows = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <h1 className="text-2xl font-semibold">Testimonials</h1>
        <Button asChild>
          <Link href="/admin/testimonials/new">New</Link>
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-200/60 dark:bg-zinc-800/60 text-left">
            <tr>
              <th className="p-3">Author</th>
              <th className="p-3">Quote</th>
              <th className="p-3">Featured</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id} className="border-t border-zinc-200 dark:border-zinc-800">
                <td className="p-3">{t.authorName}</td>
                <td className="p-3 max-w-xs truncate">{t.quote}</td>
                <td className="p-3">{t.featured ? "Yes" : "No"}</td>
                <td className="p-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/testimonials/${t.id}/edit`}>Edit</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
