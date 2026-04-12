import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ id: string }> };

export default async function AdminEditServicePage({ params }: Props) {
  const { id } = await params;
  const row = await prisma.service.findUnique({
    where: { id },
    include: { sections: { orderBy: { sortOrder: "asc" } } },
  });
  if (!row) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/services">← Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold">Edit service</h1>
      </div>
      <ServiceForm
        mode="edit"
        initial={{
          id: row.id,
          name: row.name,
          slug: row.slug,
          shortDescription: row.shortDescription,
          heroImageUrl: row.heroImageUrl,
          showOnHome: row.showOnHome,
          homeSortOrder: row.homeSortOrder,
          technologies: row.technologies,
          sections: row.sections.map((s) => ({
            title: s.title,
            description: s.description,
            sortOrder: s.sortOrder,
          })),
        }}
      />
    </div>
  );
}
