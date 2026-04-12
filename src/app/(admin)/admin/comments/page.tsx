import type { Metadata } from "next";
import { AdminCommentsDataTable } from "@/components/admin/AdminCommentsDataTable";

export const metadata: Metadata = { title: "Comments" };

export default function AdminCommentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Comments</h1>
      <p className="text-sm text-muted-foreground">Approve to show on public posts. Search and sort the full list.</p>
      <AdminCommentsDataTable />
    </div>
  );
}
