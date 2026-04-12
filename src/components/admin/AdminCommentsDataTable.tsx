"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { CommentActions } from "./CommentActions";

type Row = {
  id: string;
  body: string;
  status: string;
  authorName: string;
  authorEmail: string | null;
  createdAt: string;
  updatedAt: string;
  post: { id: string; title: string; slug: string } | null;
};

export function AdminCommentsDataTable() {
  const [data, setData] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [sorting, setSorting] = useState<SortingState>([{ id: "createdAt", desc: true }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q]);

  const sortBy = sorting[0]?.id ?? "createdAt";
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
      const res = await fetch(`/api/admin/comments?${params.toString()}`, { credentials: "include" });
      const json = (await res.json()) as { items?: Row[]; total?: number };
      if (!res.ok) {
        setData([]);
        setTotal(0);
        return;
      }
      setData(
        (json.items ?? []).map((r) => ({
          ...r,
          createdAt: typeof r.createdAt === "string" ? r.createdAt : new Date(r.createdAt).toISOString(),
          updatedAt: typeof r.updatedAt === "string" ? r.updatedAt : new Date(r.updatedAt).toISOString(),
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

  const loadRef = useRef(load);
  loadRef.current = load;

  useEffect(() => {
    setPage(1);
  }, [debouncedQ]);

  const columns = useMemo<ColumnDef<Row>[]>(
    () => [
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
        accessorKey: "authorName",
        header: ({ column }) => (
          <Button variant="ghost" className="-ml-3 h-8 px-2" onClick={() => column.toggleSorting()}>
            Author
            <ArrowUpDown className="ml-1 size-3.5 opacity-50" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="max-w-[140px] text-sm">
            <div className="font-medium truncate">{row.original.authorName}</div>
            {row.original.authorEmail ? (
              <div className="text-xs text-muted-foreground truncate">{row.original.authorEmail}</div>
            ) : null}
          </div>
        ),
      },
      {
        id: "post",
        header: "Post",
        cell: ({ row }) =>
          row.original.post ? (
            <Link href={`/blog/${row.original.post.slug}`} className="text-sm text-primary hover:underline line-clamp-2 max-w-[180px]">
              {row.original.post.title}
            </Link>
          ) : (
            "—"
          ),
      },
      {
        accessorKey: "body",
        header: "Comment",
        cell: ({ row }) => <p className="text-sm line-clamp-3 max-w-[280px] whitespace-pre-wrap">{row.original.body}</p>,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <Button variant="ghost" className="-ml-3 h-8 px-2" onClick={() => column.toggleSorting()}>
            Date
            <ArrowUpDown className="ml-1 size-3.5 opacity-50" />
          </Button>
        ),
        cell: ({ row }) => row.original.createdAt.slice(0, 16).replace("T", " "),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <CommentActions
            commentId={row.original.id}
            currentStatus={row.original.status}
            onAfterChange={() => void loadRef.current()}
          />
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
            placeholder="Search comment, author, post…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {total} comment{total === 1 ? "" : "s"}
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
                  No comments found.
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
