import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionFromCookies } from "@/lib/auth/session";
import { UserCreateForm } from "@/components/admin/UserCreateForm";
import { UserRowEditor } from "@/components/admin/UserRowEditor";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Users" };

export default async function Page() {
  const session = await getSessionFromCookies();
  if (!session?.user) {
    redirect("/auth/login?next=/admin/users");
  }
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
      requirePasswordReset: true,
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/dashboard">← Dashboard</Link>
        </Button>
        <h1 className="text-2xl font-semibold">Users</h1>
      </div>
      <UserCreateForm />
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-200/60 dark:bg-zinc-800/60 text-left">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Active</th>
              <th className="p-2">Save</th>
              <th className="p-2">Password</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <UserRowEditor key={u.id} user={u} currentUserId={session.user.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
