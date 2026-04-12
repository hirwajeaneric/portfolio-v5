"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { UserRole } from "@/lib/rbac";
import { AdminAppSidebar } from "./AdminAppSidebar";
import { AdminSiteHeader } from "./AdminSiteHeader";

export function AdminShell({
  user,
  children,
}: {
  user: { name: string; email: string; role: UserRole };
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      className="min-h-svh"
      style={
        {
          "--sidebar-width": "14rem",
          "--header-height": "3.5rem",
        } as React.CSSProperties
      }
    >
      <AdminAppSidebar user={user} />
      <SidebarInset>
        <AdminSiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
