"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/stores/auth-store";
import { adminHeaders } from "./admin-fetch";

const ta =
  "flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm font-mono text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

function stringify(value: unknown, fb: string) {
  try {
    return JSON.stringify(value ?? JSON.parse(fb), null, 2);
  } catch {
    return fb;
  }
}

export function SiteSettingsForm({
  siteName,
  socialLinks,
  iconCloudSlugs,
}: {
  siteName: string | null;
  socialLinks: unknown;
  iconCloudSlugs: unknown;
}) {
  const router = useRouter();
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [name, setName] = useState(siteName ?? "");
  const [socialJson, setSocialJson] = useState(stringify(socialLinks, "[]"));
  const [iconsJson, setIconsJson] = useState(stringify(iconCloudSlugs, "[]"));
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const socialLinksParsed = JSON.parse(socialJson) as unknown;
      const iconCloudSlugsParsed = JSON.parse(iconsJson) as unknown;
      if (!Array.isArray(socialLinksParsed)) throw new Error("socialLinks must be a JSON array");
      if (!Array.isArray(iconCloudSlugsParsed)) throw new Error("iconCloudSlugs must be a JSON array");
      for (const item of socialLinksParsed) {
        if (
          !item ||
          typeof item !== "object" ||
          typeof (item as { name?: unknown }).name !== "string" ||
          typeof (item as { url?: unknown }).url !== "string"
        ) {
          throw new Error('socialLinks items must be { "name", "url" }');
        }
      }
      for (const s of iconCloudSlugsParsed) {
        if (typeof s !== "string") throw new Error("iconCloudSlugs must be string[]");
      }

      const res = await fetch("/api/admin/site-settings", {
        method: "PATCH",
        credentials: "include",
        headers: adminHeaders(csrfToken),
        body: JSON.stringify({
          siteName: name.trim() || null,
          socialLinks: socialLinksParsed,
          iconCloudSlugs: iconCloudSlugsParsed,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error || "Save failed");
        return;
      }
      toast.success("Site settings saved");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid JSON");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-4">
      <div className="grid gap-2 max-w-md">
        <Label>Site name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Social links (JSON array of {`{ name, url }`})</Label>
        <textarea className={ta} value={socialJson} onChange={(e) => setSocialJson(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label>Icon cloud slugs (JSON string array — Simple Icons slugs)</Label>
        <textarea className={ta} value={iconsJson} onChange={(e) => setIconsJson(e.target.value)} />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving…" : "Save site settings"}
      </Button>
    </form>
  );
}
