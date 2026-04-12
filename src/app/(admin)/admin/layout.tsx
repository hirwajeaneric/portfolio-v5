import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth/session";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminSectionLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionFromCookies();
  if (!session?.user?.active) {
    redirect("/auth/login?next=/admin/dashboard");
  }

  return (
    <AdminShell
      user={{
        name: session.user.name,
        email: session.user.email,
        role: session.user.role as "ADMIN" | "EDITOR",
      }}
    >
      {children}
    </AdminShell>
  );
}
