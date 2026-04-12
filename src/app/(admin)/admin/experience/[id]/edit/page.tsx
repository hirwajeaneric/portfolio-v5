import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ id: string }> };

export default async function Page({ params }: Props) {
  const { id } = await params;
  const x = await prisma.experience.findUnique({ where: { id } });
  if (!x) notFound();
  return (
    <div className="space-y-6 max-w-3xl">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/experience">← Back</Link>
      </Button>
      <h1 className="text-2xl font-semibold">Edit experience</h1>
      <ExperienceForm mode="edit" initial={x} />
    </div>
  );
}
