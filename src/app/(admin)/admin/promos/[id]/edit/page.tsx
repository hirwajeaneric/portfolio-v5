import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PromoForm } from "@/components/admin/PromoForm";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = await prisma.promoAd.findUnique({ where: { id }, select: { kicker: true } });
  return { title: p ? `Edit promo: ${p.kicker}` : "Edit promo" };
}

export default async function AdminEditPromoPage({ params }: Props) {
  const { id } = await params;
  const promo = await prisma.promoAd.findUnique({ where: { id } });
  if (!promo) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/promos">← Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">Edit promo</h1>
      </div>
      <PromoForm
        mode="edit"
        initial={{
          id: promo.id,
          placements: promo.placements as string[],
          kicker: promo.kicker,
          headlineLead: promo.headlineLead,
          headlineEmphasis: promo.headlineEmphasis,
          body: promo.body,
          ctaLabel: promo.ctaLabel,
          ctaUrl: promo.ctaUrl,
          active: promo.active,
          priority: promo.priority,
        }}
      />
    </div>
  );
}
