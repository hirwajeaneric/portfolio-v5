import type { Metadata } from "next";
import Link from "next/link";
import { PromoForm } from "@/components/admin/PromoForm";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "New promo" };

export default function AdminNewPromoPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/promos">← Back</Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">New promo</h1>
      </div>
      <PromoForm mode="create" initial={null} />
    </div>
  );
}
