import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Site statistics" };

export default async function Page() {
  const rows = await prisma.siteStatistic.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <h1 className="text-2xl font-semibold">Site statistics</h1>
        <Button asChild>
          <Link href="/admin/statistics/new">New</Link>
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-200/60 dark:bg-zinc-800/60 text-left">
            <tr>
              <th className="p-3">Label</th>
              <th className="p-3">Value</th>
              <th className="p-3">Sort</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id} className="border-t border-zinc-200 dark:border-zinc-800">
                <td className="p-3">{s.label}</td>
                <td className="p-3 font-medium">{s.value}</td>
                <td className="p-3">{s.sortOrder}</td>
                <td className="p-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/statistics/${s.id}/edit`}>Edit</Link>
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
