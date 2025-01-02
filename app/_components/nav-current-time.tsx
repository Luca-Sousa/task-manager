"use client";

import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";

import { Calendar } from "@/app/_components/ui/calendar";
import React, { useEffect, useState } from "react";
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
import { Skeleton } from "./ui/skeleton";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);
  const { isMobile } = useSidebar();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="w-full">
                <div className="flex items-center">
                  {format(new Date(), "PPP", {
                    locale: ptBR,
                  })}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </div>

                <div className="flex items-center">
                  {!isClient ? (
                    <div className="flex h-5 items-center">
                      <Skeleton className="h-2 w-32 bg-sidebar-accent" />
                    </div>
                  ) : (
                    format(currentTime, "HH 'h:' mm 'm:' ss 's'")
                  )}
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
