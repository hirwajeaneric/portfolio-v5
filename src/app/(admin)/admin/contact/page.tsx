import type { Metadata } from "next";
import { AdminContactMessagesDataTable } from "@/components/admin/AdminContactMessagesDataTable";

export const metadata: Metadata = { title: "Contact messages" };

export default function AdminContactPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Contact messages</h1>
      <p className="text-sm text-muted-foreground">Use Manage to update status and internal notes.</p>
      <AdminContactMessagesDataTable />
    </div>
  );
}
