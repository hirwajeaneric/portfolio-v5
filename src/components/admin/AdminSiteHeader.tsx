"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

const SEGMENT_LABELS: Record<string, string> = {
  admin: "Admin",
  dashboard: "Dashboard",
  blogs: "Blog posts",
  new: "New",
  edit: "Edit",
  "blog-categories": "Categories",
  projects: "Projects",
  services: "Services",
  testimonials: "Testimonials",
  awards: "Awards",
  experience: "Experience",
  technologies: "Technologies",
  statistics: "Statistics",
  comments: "Comments",
  contact: "Contact",
  promos: "Promos",
  media: "Media",
  settings: "Site settings",
  users: "Users",
};

function labelForSegment(segment: string) {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  if (/^[0-9a-f-]{8,}$/i.test(segment)) return "Details";
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function AdminSiteHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs: { href: string; label: string; isLast: boolean }[] = [];
  let acc = "";
  segments.forEach((seg, i) => {
    acc += `/${seg}`;
    crumbs.push({
      href: acc,
      label: labelForSegment(seg),
      isLast: i === segments.length - 1,
    });
  });

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {crumbs.map((c, i) => (
            <React.Fragment key={c.href}>
              {i > 0 ? <BreadcrumbSeparator className="hidden sm:block" /> : null}
              <BreadcrumbItem className={i === 0 ? "hidden sm:inline-flex" : ""}>
                {c.isLast ? (
                  <BreadcrumbPage>{c.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={c.href}>{c.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
