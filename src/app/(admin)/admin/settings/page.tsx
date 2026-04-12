import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Site settings" };

export default async function Page() {
  const s = await prisma.siteSettings.findUnique({ where: { id: "default" } });
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/dashboard">← Dashboard</Link>
        </Button>
        <h1 className="text-2xl font-semibold">Site settings</h1>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Admin only. Updates the single `default` row: site name, social links, and icon cloud slugs.
      </p>
      <SiteSettingsForm
        siteName={s?.siteName ?? null}
        socialLinks={s?.socialLinks ?? []}
        iconCloudSlugs={s?.iconCloudSlugs ?? []}
      />
    </div>
  );
}
