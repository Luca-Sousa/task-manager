"use client";

import {
  ClockIcon,
  FilePenLineIcon,
  MoreHorizontal,
  Trash2Icon,
  ViewIcon,
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
import Link from "next/link";
import { useEffect, useState } from "react";
import { tasksDayByUser } from "../_data-access/tasks/tasks-current-time-user-sidebar";
import { Tasks } from "@prisma/client";

const formatTime = (date: Date) =>
  `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

export function NavTasks() {
  const { isMobile, setOpenMobile } = useSidebar();
  const [currentTasks, setCurrentTasks] = useState<Tasks[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await tasksDayByUser();
        const formattedTasks = result.map((task: Tasks) => ({
          ...task,
        }));
        setCurrentTasks(formattedTasks);
      } catch (error) {
        console.error("Erro ao carregar as tarefas:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-sm">
        <span className="mr-auto">Tarefas de Hoje</span>
        <div className="-mr-1.5 rounded-full bg-primary px-2 py-1 text-xs font-bold">
          {currentTasks.length}
        </div>
      </SidebarGroupLabel>

      <SidebarMenu>
        {currentTasks.map((task) => (
          <SidebarMenuItem key={task.id}>
            <SidebarMenuButton
              onClick={() => setOpenMobile(false)}
              asChild
              className="justify-between"
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-1.5">
                  <FilePenLineIcon size={14} />
                  <span className="w-28 truncate">{task.name}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ClockIcon size={12} />
                  {formatTime(new Date(task.startTime))}
                </div>
              </div>
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
          <SidebarMenuButton
            className="text-sidebar-foreground/70"
            onClick={() => setOpenMobile(false)}
            asChild
          >
            <Link href="/tasks">
              <MoreHorizontal className="text-sidebar-foreground/70" />
              <span>Ver Tarefas</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
