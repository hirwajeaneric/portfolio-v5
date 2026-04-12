"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  type ColumnDef,
  useReactTable,
} from "@tanstack/react-table";
import { Copy, Loader2, RefreshCw, Search, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export function AdminMediaLibrary() {
  const csrfToken = useAuthStore((s) => s.csrfToken);
  const [rows, setRows] = useState<CloudRow[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [prefix, setPrefix] = useState("portfolio");
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadFolder, setUploadFolder] = useState("portfolio");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q]);

  const fetchMedia = useCallback(
    async (opts: { append: boolean; cursor?: string }) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ limit: "30" });
        if (prefix) params.set("prefix", prefix);
        if (debouncedQ) params.set("q", debouncedQ);
        if (opts.cursor) params.set("cursor", opts.cursor);
        const res = await fetch(`/api/admin/media?${params.toString()}`, { credentials: "include" });
        const data = (await res.json()) as {
          resources?: CloudRow[];
          next_cursor?: string;
          error?: string;
        };
        if (!res.ok) {
          toast.error(data.error || "Failed to load");
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
    [prefix, debouncedQ]
  );

  useEffect(() => {
    setRows([]);
    setNextCursor(undefined);
    void fetchMedia({ append: false });
  }, [prefix, debouncedQ, fetchMedia]);

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch {
      toast.error("Copy failed");
    }
  }

  async function upload() {
    if (!uploadFile) {
      toast.error("Select a file");
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
      toast.success("Uploaded");
      setUploadFile(null);
      void fetchMedia({ append: false });
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const columns = useMemo<ColumnDef<CloudRow>[]>(
    () => [
      {
        id: "preview",
        header: "Preview",
        cell: ({ row }) => (
          <div className="relative h-14 w-20 overflow-hidden rounded-md border bg-muted">
            <Image src={row.original.secure_url} alt="" fill className="object-cover" sizes="80px" />
          </div>
        ),
      },
      {
        accessorKey: "public_id",
        header: "Public ID",
        cell: ({ row }) => <code className="text-xs break-all text-muted-foreground">{row.original.public_id}</code>,
      },
      {
        id: "size",
        header: "Size",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">
            {row.original.width}×{row.original.height} · {(row.original.bytes / 1024).toFixed(1)} KB
          </span>
        ),
      },
      {
        accessorKey: "created_at",
        header: "Created",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">{row.original.created_at?.slice(0, 10) ?? "—"}</span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            <Button type="button" variant="outline" size="sm" onClick={() => copyText(row.original.secure_url)}>
              <Copy className="size-3.5" />
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => copyText(row.original.public_id)}>
              ID
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Media library</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Browse Cloudinary uploads, copy URLs, and add new images. Use <strong>Choose from library</strong> on blog
          and project forms to insert into fields.
        </p>
      </div>

      <div className="grid gap-4 rounded-lg border bg-card p-4 md:grid-cols-3">
        <div className="grid gap-2 md:col-span-2">
          <Label>Search</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Filename or public id…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Folder prefix</Label>
          <Input value={prefix} onChange={(e) => setPrefix(e.target.value)} placeholder="portfolio" />
        </div>
      </div>

      <div className="grid gap-4 rounded-lg border bg-card p-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>Upload folder</Label>
          <Input value={uploadFolder} onChange={(e) => setUploadFolder(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label>Image file</Label>
          <Input type="file" accept="image/*" onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)} />
        </div>
        <div className="md:col-span-2 flex flex-wrap gap-2">
          <Button type="button" onClick={upload} disabled={!uploadFile || uploading} className="gap-2">
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            Upload
          </Button>
          <Button type="button" variant="outline" size="sm" disabled={loading} onClick={() => void fetchMedia({ append: false })} className="gap-2">
            <RefreshCw className={loading ? "size-4 animate-spin" : "size-4"} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                  {loading ? "Loading…" : "No images."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {nextCursor ? (
        <Button type="button" variant="secondary" disabled={loading} onClick={() => void fetchMedia({ append: true, cursor: nextCursor })}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Load more"}
        </Button>
      ) : null}
    </div>
  );
}
