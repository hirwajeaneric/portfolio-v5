"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/widgets/nav-main"
import { NavProjects } from "@/components/widgets/nav-projects"
import { NavUser } from "@/components/widgets/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Jean Eric Hirwa",
    email: "hirwajeric@gmail.com",
    avatar: "/user-sample.png",
  },
  teams: [
    {
      name: "Personal Portfolio",
      logo: GalleryVerticalEnd,
      plan: "Free",
    }
  ],
  navMain: [
    {
      title: "Blog",
      url: "/dashboard/blog",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All Stories",
          url: "/dashboard/blog",
        },
        {
          title: "Create Story",
          url: "/dashboard/blog/new",
        },
        {
          title: "All Categories",
          url: "/dashboard/blog/categories",
        },
        {
          title: "Add Categories",
          url: "/dashboard/blog/categories/new",
        },
      ],
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: Bot,
      items: [
        {
          title: "All Projects",
          url: "/dashboard/projects",
        },
        {
          title: "New Project",
          url: "/dashboard/projects/new",
        },
        {
          title: "Project Categories",
          url: "/dashboard/projects/categories",
        },
        {
          title: "New Project Categories",
          url: "/dashboard/projects/categories/new",
        },
      ],
    },
    {
      title: "Services",
      url: "/dashboard/services",
      icon: BookOpen,
      items: [
        {
          title: "All Services",
          url: "/dashboard/services",
        },
        {
          title: "New Service",
          url: "/dashboard/services/new",
        }
      ],
    },
    {
      title: "Gallery",
      url: "/dashboard/gallery",
      icon: BookOpen,
      items: [
        {
          title: "All Assets",
          url: "/dashboard/gallery",
        },
      ],
    },
    {
      title: "Feedback",
      url: "/dashboard/reviews",
      icon: BookOpen,
      items: [
        {
          title: "Reviews",
          url: "/dashboard/reviews",
        },
        {
          title: "Messages",
          url: "/dashboard/messages",
        },
        {
          title: "Subscribers",
          url: "/dashboard/messages",
        }
      ],
    },
    {
      title: "Settings",
      url: "/dashbard/settings",
      icon: Settings2,
      items: [
        {
          title: "Home Settings",
          url: "/dashboard/settings/home",
        },
        {
          title: "About Settings",
          url: "/dashboard/settings/about",
        },
        {
          title: "Contact Settings",
          url: "/dashboard/settings/contact",
        }
      ],
    },
  ],
  projects: [
    {
      name: "Overview",
      url: "/dashboard",
      icon: Frame,
    },
    {
      name: "Statistics and Analytics",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
