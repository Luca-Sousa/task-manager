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
import { Separator } from "./ui/separator";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pt-5">
        <Logo />
      </SidebarHeader>

      <SidebarContent className="justify-between overflow-x-hidden">
        <div>
          <NavMain items={data.navMain} />
          <Separator className="group-data-[collapsible=icon]:hidden" />
          <NavTasks tasks={data.tasks} />
        </div>

        <CurrentTime />
      </SidebarContent>

      <Separator className="group-data-[collapsible=icon]:hidden" />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
