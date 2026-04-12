import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Awards" };

export default async function Page() {
  const rows = await prisma.award.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <h1 className="text-2xl font-semibold">Awards & certificates</h1>
        <Button asChild>
          <Link href="/admin/awards/new">New</Link>
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-200/60 dark:bg-zinc-800/60 text-left">
            <tr>
              <th className="p-3">Kind</th>
              <th className="p-3">Title</th>
              <th className="p-3">Issuer</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.id} className="border-t border-zinc-200 dark:border-zinc-800">
                <td className="p-3">{a.kind}</td>
                <td className="p-3">{a.title}</td>
                <td className="p-3">{a.issuer ?? "—"}</td>
                <td className="p-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/awards/${a.id}/edit`}>Edit</Link>
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
