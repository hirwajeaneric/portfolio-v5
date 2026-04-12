import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SiteStatisticForm } from "@/components/admin/SiteStatisticForm";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ id: string }> };

export default async function Page({ params }: Props) {
  const { id } = await params;
  const s = await prisma.siteStatistic.findUnique({ where: { id } });
  if (!s) notFound();
  return (
    <div className="space-y-6 max-w-md">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/admin/statistics">← Back</Link>
      </Button>
      <h1 className="text-2xl font-semibold">Edit statistic</h1>
      <SiteStatisticForm mode="edit" initial={s} />
    </div>
  );
}
