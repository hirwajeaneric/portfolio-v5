"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Copy, ImageIcon, Loader2, Search, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/stores/auth-store";
import { adminHeaders } from "./admin-fetch";

type CloudRow = {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
};

const PRESET_PREFIXES = ["", "portfolio", "blog", "projects"];

export function MediaAssetSelector({
  value,
  onSelect,
  trigger,
  title = "Media library",
  description = "Pick an image from Cloudinary or upload a new file.",
}: {
  value?: string;
  onSelect: (secureUrl: string) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
}) {
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("browse");
  const [prefix, setPrefix] = useState("portfolio");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [rows, setRows] = useState<CloudRow[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(value ?? null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadFolder, setUploadFolder] = useState("portfolio");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchInput.trim()), 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  const fetchMedia = useCallback(
    async (opts: { append: boolean; cursor?: string }) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("limit", "24");
        if (prefix) params.set("prefix", prefix);
        if (debouncedSearch) params.set("q", debouncedSearch);
        if (opts.cursor) params.set("cursor", opts.cursor);

        const res = await fetch(`/api/admin/media?${params.toString()}`, { credentials: "include" });
        const data = (await res.json()) as {
          resources?: CloudRow[];
          next_cursor?: string;
          error?: string;
        };
        if (!res.ok) {
          toast.error(data.error || "Failed to load media");
          return;
        }
        const list = data.resources ?? [];
        setRows((prev) => (opts.append ? [...prev, ...list] : list));
        setNextCursor(data.next_cursor);
      } catch {
        toast.error("Network error");
      } finally {
        setLoading(false);
      }
    },
    [prefix, debouncedSearch]
  );

  useEffect(() => {
    if (!open || tab !== "browse") return;
    setRows([]);
    setNextCursor(undefined);
    void fetchMedia({ append: false });
  }, [open, tab, prefix, debouncedSearch, fetchMedia]);

  useEffect(() => {
    if (open) setSelectedUrl(value ?? null);
  }, [open, value]);

  const selectedPublicId = useMemo(() => {
    const row = rows.find((r) => r.secure_url === selectedUrl);
    return row?.public_id;
  }, [rows, selectedUrl]);

  async function copyUrl() {
    if (!selectedUrl) return;
    try {
      await navigator.clipboard.writeText(selectedUrl);
      toast.success("URL copied");
    } catch {
      toast.error("Could not copy");
    }
  }

  async function applySelection() {
    if (!selectedUrl) {
      toast.error("Select an image first");
      return;
    }
    onSelect(selectedUrl);
    setOpen(false);
    toast.success("Image selected");
  }

  async function uploadNew() {
    if (!uploadFile) {
      toast.error("Choose a file");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("file", uploadFile);
      fd.set("folder", uploadFolder || "portfolio");
      const res = await fetch("/api/admin/uploads/image", {
        method: "POST",
        body: fd,
        credentials: "include",
        headers: adminHeaders(csrfToken),
      });
      const data = (await res.json()) as { secure_url?: string; error?: string };
      if (!res.ok || !data.secure_url) {
        toast.error(data.error || "Upload failed");
        return;
      }
      onSelect(data.secure_url);
      setOpen(false);
      toast.success("Uploaded and selected");
      setUploadFile(null);
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button type="button" variant="outline" size="sm" className="gap-2">
            <ImageIcon className="size-4" />
            Choose from library
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="border-b px-6 py-4 text-left">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col">
          <TabsList className="mx-6 mt-2 w-fit">
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="mt-0 flex min-h-0 flex-1 flex-col px-6 pb-4 pt-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="grid flex-1 gap-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    placeholder="public id or filename…"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid w-full gap-2 sm:w-48">
                <Label>Folder prefix</Label>
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                >
                  {PRESET_PREFIXES.map((p) => (
                    <option key={p || "all"} value={p}>
                      {p === "" ? "All images" : p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-3 max-h-[min(420px,55vh)] min-h-[280px] flex-1 overflow-auto rounded-md border">
              <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 md:grid-cols-4">
                {rows.map((r) => {
                  const active = selectedUrl === r.secure_url;
                  return (
                    <button
                      key={r.public_id}
                      type="button"
                      onClick={() => setSelectedUrl(r.secure_url)}
                      className={cn(
                        "group relative aspect-square overflow-hidden rounded-md border bg-muted text-left ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        active ? "ring-2 ring-primary" : "hover:border-primary/50"
                      )}
                    >
                      <Image src={r.secure_url} alt="" fill className="object-cover" sizes="120px" />
                      {active ? (
                        <span className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                          <Check className="size-3.5" />
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
              {loading && rows.length === 0 ? (
                <div className="flex items-center justify-center py-16 text-muted-foreground">
                  <Loader2 className="size-6 animate-spin" />
                </div>
              ) : null}
              {!loading && rows.length === 0 ? (
                <p className="p-8 text-center text-sm text-muted-foreground">No images match this filter.</p>
              ) : null}
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3">
              <div className="text-xs text-muted-foreground">
                {selectedPublicId ? (
                  <span className="font-mono break-all">{selectedPublicId}</span>
                ) : (
                  "No selection"
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" size="sm" onClick={copyUrl} disabled={!selectedUrl}>
                  <Copy className="mr-1 size-3.5" />
                  Copy URL
                </Button>
                {nextCursor ? (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={loading}
                    onClick={() => void fetchMedia({ append: true, cursor: nextCursor })}
                  >
                    {loading ? <Loader2 className="size-4 animate-spin" /> : "Load more"}
                  </Button>
                ) : null}
                <Button type="button" size="sm" onClick={applySelection} disabled={!selectedUrl}>
                  Use image
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="mx-6 mb-6 mt-2 space-y-4">
            <div className="grid gap-2 max-w-md">
              <Label>Folder</Label>
              <Input value={uploadFolder} onChange={(e) => setUploadFolder(e.target.value)} placeholder="portfolio" />
            </div>
            <div className="grid gap-2 max-w-md">
              <Label>Image file</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <Button type="button" onClick={uploadNew} disabled={!uploadFile || uploading} className="gap-2">
              {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
              Upload & select
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
