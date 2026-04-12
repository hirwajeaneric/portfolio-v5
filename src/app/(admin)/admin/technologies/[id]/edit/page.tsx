import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TechnologyForm } from "@/components/admin/TechnologyForm";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ id: string }> };

export default async function Page({ params }: Props) {
  const { id } = await params;
  const t = await prisma.technology.findUnique({ where: { id } });
  if (!t) notFound();
  return (
    <div className="space-y-6 max-w-xl">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/technologies">← Back</Link>
      </Button>
      <h1 className="text-2xl font-semibold">Edit technology</h1>
      <TechnologyForm mode="edit" initial={t} />
    </div>
  );
}
