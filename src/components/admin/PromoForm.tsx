"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/stores/auth-store";
import { adminHeaders } from "./admin-fetch";
import { PromoPlacement } from "@/generated/prisma/enums";

const placementsAll = Object.values(PromoPlacement) as string[];

type Promo = {
  id: string;
  placements: string[];
  kicker: string;
  headlineLead: string;
  headlineEmphasis: string;
  body: string;
  ctaLabel: string;
  ctaUrl: string;
  active: boolean;
  priority: number;
};

const textareaClass =
  "flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

export function PromoForm({ mode, initial }: { mode: "create" | "edit"; initial: Promo | null }) {
  const router = useRouter();
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [loading, setLoading] = useState(false);

  const [placements, setPlacements] = useState<string[]>(initial?.placements ?? [PromoPlacement.HOME]);
  const [kicker, setKicker] = useState(initial?.kicker ?? "");
  const [headlineLead, setHeadlineLead] = useState(initial?.headlineLead ?? "");
  const [headlineEmphasis, setHeadlineEmphasis] = useState(initial?.headlineEmphasis ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [ctaLabel, setCtaLabel] = useState(initial?.ctaLabel ?? "");
  const [ctaUrl, setCtaUrl] = useState(initial?.ctaUrl ?? "");
  const [active, setActive] = useState(initial?.active ?? true);
  const [priority, setPriority] = useState(String(initial?.priority ?? 0));

  function togglePlacement(p: string) {
    setPlacements((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!placements.length) {
      toast.error("Select at least one placement");
      return;
    }
    setLoading(true);
    const payload: Record<string, unknown> = {
      placements,
      kicker,
      headlineLead,
      headlineEmphasis,
      body,
      ctaLabel,
      ctaUrl,
      active,
      priority: Number.parseInt(priority, 10) || 0,
    };

    try {
      const url = mode === "create" ? "/api/admin/promos" : `/api/admin/promos/${initial!.id}`;
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        credentials: "include",
        headers: adminHeaders(csrfToken),
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error || "Save failed");
        return;
      }
      toast.success("Saved");
      router.push("/admin/promos");
      router.refresh();
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (!initial || !confirm("Delete this promo?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/promos/${initial.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: adminHeaders(csrfToken),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        toast.error(data.error || "Delete failed");
        return;
      }
      toast.success("Deleted");
      router.push("/admin/promos");
      router.refresh();
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-4">
      <div className="grid gap-2">
        <span className="text-sm font-medium">Placements</span>
        <div className="flex flex-wrap gap-3">
          {placementsAll.map((p) => (
            <label key={p} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={placements.includes(p)} onChange={() => togglePlacement(p)} />
              {p}
            </label>
          ))}
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="kick">Kicker</Label>
        <Input id="kick" value={kicker} onChange={(e) => setKicker(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="hl">Headline lead</Label>
        <Input id="hl" value={headlineLead} onChange={(e) => setHeadlineLead(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="he">Headline emphasis</Label>
        <Input id="he" value={headlineEmphasis} onChange={(e) => setHeadlineEmphasis(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="bdy">Body</Label>
        <textarea id="bdy" className={textareaClass} value={body} onChange={(e) => setBody(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cta">CTA label</Label>
        <Input id="cta" value={ctaLabel} onChange={(e) => setCtaLabel(e.target.value)} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ctu">CTA URL</Label>
        <Input id="ctu" value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} required />
      </div>
      <div className="flex items-center gap-2">
        <input id="act" type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
        <Label htmlFor="act">Active</Label>
      </div>
      <div className="grid gap-2 max-w-xs">
        <Label htmlFor="pri">Priority</Label>
        <Input id="pri" type="number" value={priority} onChange={(e) => setPriority(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : mode === "create" ? "Create promo" : "Save changes"}
        </Button>
        {mode === "edit" ? (
          <Button type="button" variant="destructive" disabled={loading} onClick={remove}>
            Delete
          </Button>
        ) : null}
      </div>
    </form>
  );
}
