import type { Metadata } from "next";
import Link from "next/link";
import { getSessionFromCookies } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Dashboard",
};

const editorCards = [
  { href: "/admin/blogs", title: "Blog posts", desc: "Create, edit, and publish articles." },
  { href: "/admin/blog-categories", title: "Categories", desc: "Manage blog taxonomy." },
  { href: "/admin/projects", title: "Projects", desc: "Portfolio work entries." },
  { href: "/admin/services", title: "Services", desc: "Offerings and section copy." },
  { href: "/admin/testimonials", title: "Testimonials", desc: "Quotes and author details." },
  { href: "/admin/awards", title: "Awards", desc: "Certificates and recognition." },
  { href: "/admin/experience", title: "Experience", desc: "Roles and timelines." },
  { href: "/admin/technologies", title: "Technologies", desc: "Stack items for the site." },
  { href: "/admin/statistics", title: "Site statistics", desc: "Homepage stat blocks." },
  { href: "/admin/comments", title: "Comments", desc: "Approve, reject, or remove comments." },
  { href: "/admin/contact", title: "Contact inbox", desc: "Read messages and update status." },
  { href: "/admin/promos", title: "Promo ads", desc: "Home, about, contact, and blog promos." },
  { href: "/admin/media", title: "Media upload", desc: "Images to Cloudinary." },
];

const adminCards = [
  { href: "/admin/settings", title: "Site settings", desc: "Name, social links, icon cloud." },
  { href: "/admin/users", title: "Users", desc: "Create accounts and manage roles." },
];

export default async function AdminDashboardPage() {
  const session = await getSessionFromCookies();
  const isAdmin = session?.user?.role === "ADMIN";
  const cards = isAdmin ? [...editorCards, ...adminCards] : editorCards;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Choose a section below or use the sidebar. All routes require an editor or admin session.
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="block rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:bg-zinc-200/40 dark:hover:bg-zinc-800/40 transition-colors"
            >
              <h2 className="font-medium text-zinc-900 dark:text-zinc-100">{c.title}</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{c.desc}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
