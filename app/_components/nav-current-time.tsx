"use client";

import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Calendar } from "@/app/_components/ui/calendar";
import React from "react";
import { ptBR } from "date-fns/locale";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const CurrentTime = () => {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ring-offset-2 ring-offset-sidebar-accent"
            >
              <div className="w-full">
                <div className="flex items-center">
                  {format(new Date(), "PPP", {
                    locale: ptBR,
                  })}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </div>
                <div className="flex items-center text-2xl">
                  {format(new Date(), "HH:mm")}
                  <ClockIcon className="ml-auto h-4 w-4 animate-spin opacity-50" />
                </div>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-fit rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0">
              <Calendar
                mode="single"
                selected={new Date()}
                initialFocus
                locale={ptBR}
                className="p-2"
              />
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default CurrentTime;
