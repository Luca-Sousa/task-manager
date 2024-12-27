"use client";

import * as React from "react";
import {
  CircleHelpIcon,
  Frame,
  LayoutDashboardIcon,
  Map,
  PieChart,
  SignatureIcon,
} from "lucide-react";

import { NavMain } from "@/app/_components/nav-main";
import { NavProjects } from "@/app/_components/nav-projects";
import { NavUser } from "@/app/_components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/app/_components/ui/sidebar";
import { Logo } from "./logo";

// This is sample data.
const data = {
  // teams: [
  //   {
  //     name: "Acme Inc",
  //     logo: GalleryVerticalEnd,
  //     plan: "Enterprise",
  //   },
  //   {
  //     name: "Acme Corp.",
  //     logo: AudioWaveform,
  //     plan: "Startup",
  //   },
  //   {
  //     name: "Evil Corp.",
  //     logo: Command,
  //     plan: "Free",
  //   },
  // ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboardIcon,
      isActive: true,
      items: [
        {
          title: "Visualizar",
          url: "/",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Assinatura",
      url: "/subscription",
      icon: SignatureIcon,
      items: [
        {
          title: "Ver Planos",
          url: "/subscription",
        },
        {
          title: "Adquirir Premium",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "FAQs",
      url: "/faq",
      icon: CircleHelpIcon,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
  ],
  tasks: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.tasks} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
