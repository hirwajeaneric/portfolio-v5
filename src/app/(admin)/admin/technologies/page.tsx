import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Technologies" };

export default async function Page() {
  const rows = await prisma.technology.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <h1 className="text-2xl font-semibold">Technologies</h1>
        <Button asChild>
          <Link href="/admin/technologies/new">New</Link>
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-200/60 dark:bg-zinc-800/60 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Category</th>
              <th className="p-3">Active</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id} className="border-t border-zinc-200 dark:border-zinc-800">
                <td className="p-3">{t.name}</td>
                <td className="p-3 font-mono text-xs">{t.slug}</td>
                <td className="p-3">{t.category}</td>
                <td className="p-3">{t.active ? "Yes" : "No"}</td>
                <td className="p-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/technologies/${t.id}/edit`}>Edit</Link>
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
