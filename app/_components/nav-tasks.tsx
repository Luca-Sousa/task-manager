"use client";

import {
  FilePenLineIcon,
  MoreHorizontal,
  Trash2Icon,
  ViewIcon,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/app/_components/ui/sidebar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";

interface NavTasksProps {
  tasks: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export function NavTasks({ tasks }: NavTasksProps) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-sm">
        <span className="mr-auto">Tarefas do Dia</span>
        <div className="rounded-full bg-primary px-1 py-0.5 font-bold -mr-1.5 text-xs">
          {format(new Date(), "dd", {
            locale: ptBR,
          })}
        </div>
      </SidebarGroupLabel>

      <SidebarMenu>
        {tasks.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem className="cursor-pointer">
                  <ViewIcon className="text-muted-foreground" />
                  <span>Vizualizar Tarefa</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <FilePenLineIcon className="text-muted-foreground" />
                  <span>Editar Tarefa</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer bg-destructive/70 focus:bg-destructive">
                  <Trash2Icon className="text-muted-foreground" />
                  <span>Deletar Tarefa</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>Ver Tarefas</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
