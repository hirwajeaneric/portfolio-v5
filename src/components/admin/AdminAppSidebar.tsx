"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Award,
  BarChart3,
  Briefcase,
  Building2,
  Cpu,
  FileText,
  FolderTree,
  ImageIcon,
  LayoutDashboard,
  Mail,
  Megaphone,
  MessageSquare,
  MessageSquareQuote,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
import type { UserRole } from "@/lib/rbac";
import { useAuthStore } from "@/lib/stores/auth-store";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type NavItem = { title: string; href: string; icon: React.ElementType; adminOnly?: boolean };

const mainNav: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Blog posts", href: "/admin/blogs", icon: FileText },
  { title: "Categories", href: "/admin/blog-categories", icon: FolderTree },
  { title: "Projects", href: "/admin/projects", icon: Briefcase },
  { title: "Services", href: "/admin/services", icon: Wrench },
  { title: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { title: "Awards", href: "/admin/awards", icon: Award },
  { title: "Experience", href: "/admin/experience", icon: Building2 },
  { title: "Technologies", href: "/admin/technologies", icon: Cpu },
  { title: "Statistics", href: "/admin/statistics", icon: BarChart3 },
  { title: "Comments", href: "/admin/comments", icon: MessageSquare },
  { title: "Contact", href: "/admin/contact", icon: Mail },
  { title: "Promos", href: "/admin/promos", icon: Megaphone },
  { title: "Media", href: "/admin/media", icon: ImageIcon },
];

const adminNav: NavItem[] = [
  { title: "Site settings", href: "/admin/settings", icon: Settings, adminOnly: true },
  { title: "Users", href: "/admin/users", icon: Users, adminOnly: true },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AdminAppSidebar({ user }: { user: { name: string; email: string; role: UserRole } }) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const extra = user.role === "ADMIN" ? adminNav : [];

  function activeHref(href: string) {
    if (href === "/admin/dashboard") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <span className="text-xs font-bold">JH</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Portfolio CMS</span>
                  <span className="truncate text-xs text-muted-foreground">Jean Eric Hirwa</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={activeHref(item.href)} tooltip={item.title}>
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {extra.length ? (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {extra.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={activeHref(item.href)} tooltip={item.title}>
                        <Link href={item.href}>
                          <Icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">{initials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{user.role}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" side="bottom" sideOffset={4}>
                <div className="px-2 py-1.5 text-xs text-muted-foreground">{user.email}</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">View site</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await logout(true);
                    router.push("/auth/login");
                    router.refresh();
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
