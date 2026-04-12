import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Promos" };

export default async function AdminPromosPage() {
  const promos = await prisma.promoAd.findMany({
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Promo ads</h1>
        <Button asChild>
          <Link href="/admin/promos/new">New promo</Link>
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-200/60 dark:bg-zinc-800/60 text-left">
            <tr>
              <th className="p-3 font-medium">Kicker</th>
              <th className="p-3 font-medium">Headline</th>
              <th className="p-3 font-medium">Placements</th>
              <th className="p-3 font-medium">Active</th>
              <th className="p-3 font-medium">Priority</th>
              <th className="p-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {promos.map((p) => (
              <tr key={p.id} className="border-t border-zinc-200 dark:border-zinc-800">
                <td className="p-3">{p.kicker}</td>
                <td className="p-3 max-w-[220px] truncate">
                  {p.headlineLead} <em>{p.headlineEmphasis}</em>
                </td>
                <td className="p-3 text-xs">{p.placements.join(", ")}</td>
                <td className="p-3">{p.active ? "Yes" : "No"}</td>
                <td className="p-3">{p.priority}</td>
                <td className="p-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/promos/${p.id}/edit`}>Edit</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {promos.length === 0 ? <p className="p-6 text-zinc-500">No promos.</p> : null}
      </div>
    </div>
  );
}
