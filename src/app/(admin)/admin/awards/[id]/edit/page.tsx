import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AwardForm } from "@/components/admin/AwardForm";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ id: string }> };

export default async function Page({ params }: Props) {
  const { id } = await params;
  const a = await prisma.award.findUnique({ where: { id } });
  if (!a) notFound();
  return (
    <div className="space-y-6 max-w-3xl">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/awards">← Back</Link>
      </Button>
      <h1 className="text-2xl font-semibold">Edit award</h1>
      <AwardForm mode="edit" initial={a} />
    </div>
  );
}
