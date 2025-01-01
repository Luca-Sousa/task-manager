"use client";

import * as React from "react";

import { NavMain } from "@/app/_components/nav-main";
import { NavTasks } from "@/app/_components/nav-tasks";
import { NavUser } from "@/app/_components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/app/_components/ui/sidebar";
import { Logo } from "./logo";

import CurrentTime from "./nav-current-time";
import { data } from "../_constants/data_sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pt-5">
        <Logo />
      </SidebarHeader>

      <SidebarContent className="justify-between overflow-x-hidden">
        <div>
          <NavMain items={data.navMain} />
          <NavTasks tasks={data.tasks} />
        </div>

        <CurrentTime />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
