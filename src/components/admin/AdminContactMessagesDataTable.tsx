"use client";

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
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ContactMessageUpdateForm } from "./ContactMessageUpdateForm";

type Row = {
  id: string;
  fullName: string;
  email: string;
  message: string;
  status: string;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
};

export function AdminContactMessagesDataTable() {
  const [data, setData] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [sorting, setSorting] = useState<SortingState>([{ id: "createdAt", desc: true }]);
  const [loading, setLoading] = useState(true);
  const [sheetRow, setSheetRow] = useState<Row | null>(null);

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
      const res = await fetch(`/api/admin/contact-messages?${params.toString()}`, { credentials: "include" });
      const json = (await res.json()) as { items?: Row[]; total?: number };
      if (!res.ok) {
        setData([]);
        setTotal(0);
        return;
      }
      const rows = (json.items ?? []).map((r) => ({
        ...r,
        createdAt: typeof r.createdAt === "string" ? r.createdAt : new Date(r.createdAt).toISOString(),
        updatedAt: typeof r.updatedAt === "string" ? r.updatedAt : new Date(r.updatedAt).toISOString(),
      }));
      setData(rows);
      setTotal(json.total ?? 0);
      setSheetRow((prev) => {
        if (!prev) return null;
        const next = rows.find((x) => x.id === prev.id);
        return next ?? prev;
      });
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
        accessorKey: "createdAt",
        header: ({ column }) => (
          <Button variant="ghost" className="-ml-3 h-8 px-2" onClick={() => column.toggleSorting()}>
            Received
            <ArrowUpDown className="ml-1 size-3.5 opacity-50" />
          </Button>
        ),
        cell: ({ row }) => row.original.createdAt.slice(0, 16).replace("T", " "),
      },
      {
        accessorKey: "fullName",
        header: ({ column }) => (
          <Button variant="ghost" className="-ml-3 h-8 px-2" onClick={() => column.toggleSorting()}>
            Name
            <ArrowUpDown className="ml-1 size-3.5 opacity-50" />
          </Button>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <Button variant="ghost" className="-ml-3 h-8 px-2" onClick={() => column.toggleSorting()}>
            Email
            <ArrowUpDown className="ml-1 size-3.5 opacity-50" />
          </Button>
        ),
        cell: ({ row }) => <span className="text-sm text-muted-foreground truncate max-w-[200px] block">{row.original.email}</span>,
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
        accessorKey: "message",
        header: "Message",
        cell: ({ row }) => <p className="text-sm line-clamp-2 max-w-[240px] whitespace-pre-wrap">{row.original.message}</p>,
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Button type="button" variant="outline" size="sm" onClick={() => setSheetRow(row.original)}>
            Manage
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
      <Sheet open={!!sheetRow} onOpenChange={(open) => !open && setSheetRow(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Contact message</SheetTitle>
          </SheetHeader>
          {sheetRow ? (
            <div className="mt-6 space-y-4">
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">{sheetRow.fullName}</span>{" "}
                  <span className="text-muted-foreground">{sheetRow.email}</span>
                </p>
                <p className="text-xs text-muted-foreground">{sheetRow.createdAt.slice(0, 16).replace("T", " ")}</p>
                <p className="text-sm whitespace-pre-wrap border-l-2 border-border pl-3">{sheetRow.message}</p>
              </div>
              <ContactMessageUpdateForm
                messageId={sheetRow.id}
                initialStatus={sheetRow.status}
                initialNotes={sheetRow.adminNotes}
                onSuccess={() => {
                  setSheetRow(null);
                  void load();
                }}
              />
            </div>
          ) : null}
        </SheetContent>
      </Sheet>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search name, email, message…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {total} message{total === 1 ? "" : "s"}
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
                  No messages found.
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
