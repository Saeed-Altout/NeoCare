import * as React from "react";
import {
  IconActivity,
  IconBolt,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileDescription,
  IconHelp,
  IconInnerShadowTop,
  IconReport,
  IconSearch,
  IconSettings,
  IconUser,
  IconUsers,
  IconStethoscope,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Dr. Admin",
    email: "admin@jaundice-system.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Patients",
      url: "/dashboard/patients",
      icon: IconUser,
    },
    {
      title: "Sessions",
      url: "/dashboard/sessions",
      icon: IconActivity,
    },
    {
      title: "Arduino Control",
      url: "/dashboard/arduino",
      icon: IconBolt,
    },
  ],
  navClouds: [
    {
      title: "Treatment Monitoring",
      icon: IconStethoscope,
      isActive: true,
      url: "/dashboard/sessions",
      items: [
        {
          title: "Active Sessions",
          url: "/dashboard/sessions",
        },
        {
          title: "Session History",
          url: "/dashboard/sessions",
        },
      ],
    },
    {
      title: "Patient Records",
      icon: IconFileDescription,
      url: "/dashboard/patients",
      items: [
        {
          title: "All Patients",
          url: "/dashboard/patients",
        },
        {
          title: "Recent Patients",
          url: "/dashboard/patients",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Patient Database",
      url: "/dashboard/patients",
      icon: IconDatabase,
    },
    {
      name: "Session Reports",
      url: "/dashboard/sessions",
      icon: IconReport,
    },
    {
      name: "System Analytics",
      url: "/dashboard/legacy",
      icon: IconChartBar,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconStethoscope className="!size-5" />
                <span className="text-base font-semibold">Jaundice Care</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
