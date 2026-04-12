"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  type ColumnDef,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlogStatus } from "@/generated/prisma/enums";

type Row = {
  id: string;
  title: string;
  slug: string;
  status: (typeof BlogStatus)[keyof typeof BlogStatus];
  updatedAt: string;
  createdAt: string;
  category: { id: string; name: string; slug: string } | null;
};

export function AdminBlogPostsDataTable() {
  const [data, setData] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [sorting, setSorting] = useState<SortingState>([{ id: "updatedAt", desc: true }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q]);

  const sortBy = sorting[0]?.id ?? "updatedAt";
  const sortOrder = sorting[0]?.desc ? "desc" : "asc";

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        sortBy,
        sortOrder,
      });
      if (debouncedQ) params.set("q", debouncedQ);
      const res = await fetch(`/api/admin/blog-posts?${params.toString()}`, { credentials: "include" });
      const json = (await res.json()) as { items?: Row[]; total?: number; error?: string };
      if (!res.ok) {
        setData([]);
        setTotal(0);
        return;
      }
      setData(
        (json.items ?? []).map((r) => ({
          ...r,
          updatedAt: typeof r.updatedAt === "string" ? r.updatedAt : new Date(r.updatedAt).toISOString(),
          createdAt: typeof r.createdAt === "string" ? r.createdAt : new Date(r.createdAt).toISOString(),
        }))
      );
      setTotal(json.total ?? 0);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, debouncedQ, sortBy, sortOrder]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQ]);

  const columns = useMemo<ColumnDef<Row>[]>(
    () => [
      {
        accessorKey: "title",
        header: ({ column }) => (
          <Button variant="ghost" className="-ml-3 h-8 px-2" onClick={() => column.toggleSorting()}>
            Title
            <ArrowUpDown className="ml-1 size-3.5 opacity-50" />
          </Button>
        ),
        cell: ({ row }) => <span className="font-medium line-clamp-2 max-w-[220px]">{row.original.title}</span>,
      },
      {
        accessorKey: "slug",
        header: "Slug",
        cell: ({ row }) => <code className="text-xs text-muted-foreground">{row.original.slug}</code>,
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <Button variant="ghost" className="-ml-3 h-8 px-2" onClick={() => column.toggleSorting()}>
            Status
            <ArrowUpDown className="ml-1 size-3.5 opacity-50" />
          </Button>
        ),
      },
      {
        id: "category",
        header: "Category",
        accessorFn: (r) => r.category?.name ?? "",
        cell: ({ row }) => row.original.category?.name ?? "—",
      },
      {
        accessorKey: "updatedAt",
        header: ({ column }) => (
          <Button variant="ghost" className="-ml-3 h-8 px-2" onClick={() => column.toggleSorting()}>
            Updated
            <ArrowUpDown className="ml-1 size-3.5 opacity-50" />
          </Button>
        ),
        cell: ({ row }) => row.original.updatedAt.slice(0, 10),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/blogs/${row.original.id}/edit`}>Edit</Link>
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      setSorting(next);
      setPage(1);
    },
    manualSorting: true,
    manualPagination: true,
    pageCount: Math.max(1, Math.ceil(total / pageSize)),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search title, slug, intro…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {total} post{total === 1 ? "" : "s"}
        </p>
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  Loading…
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No posts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => setPage((p) => p - 1)}>
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {Math.max(1, Math.ceil(total / pageSize))}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= Math.ceil(total / pageSize) || loading || total === 0}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
