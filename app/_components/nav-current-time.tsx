"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Calendar } from "@/app/_components/ui/calendar";
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
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="h-14 cursor-pointer ring-offset-2 ring-offset-sidebar-accent data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="w-full">
                <div className="flex items-center">
                  {format(currentTime, "PPP", { locale: ptBR })}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </div>
                <div className="flex items-center text-2xl">
                  {format(currentTime, "HH:mm")}
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
                selected={currentTime}
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
