import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth/session";

export default async function AdminUsersLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionFromCookies();
  if (!session?.user?.active || session.user.role !== "ADMIN") {
    redirect("/admin/dashboard");
  }
  return <>{children}</>;
}
