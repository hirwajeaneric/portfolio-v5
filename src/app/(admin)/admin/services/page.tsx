import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Services" };

export default async function AdminServicesPage() {
  const rows = await prisma.service.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { sections: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Services</h1>
        <Button asChild>
          <Link href="/admin/services/new">New service</Link>
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-200/60 dark:bg-zinc-800/60 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Sections</th>
              <th className="p-3">Home</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id} className="border-t border-zinc-200 dark:border-zinc-800">
                <td className="p-3">{s.name}</td>
                <td className="p-3 font-mono text-xs">{s.slug}</td>
                <td className="p-3">{s._count.sections}</td>
                <td className="p-3">{s.showOnHome ? "Yes" : "No"}</td>
                <td className="p-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/services/${s.id}/edit`}>Edit</Link>
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
