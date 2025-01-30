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
import { Tasks } from "@prisma/client";
import { currentTasksSchedule } from "../_data-access/tasks/current-task-schedule";
import { DateTime } from "luxon";

const formatTime = (date: Date) =>
  `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

export function NavTasks() {
  const { isMobile, setOpenMobile } = useSidebar();
  const [currentTasks, setCurrentTasks] = useState<Tasks[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const year = new Date().getFullYear().toString();
        const month = (new Date().getMonth() + 1).toString();
        const day = new Date().getDate().toString();

        const result = await currentTasksSchedule({ year, month, day });

        // Captura o timezone do cliente
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Converte as datas UTC para o fuso horário local do cliente
        const convertedTasks = result.map((task) => ({
          ...task,
          startTime: DateTime.fromJSDate(task.startTime, {
            zone: "utc",
          })
            .setZone(timezone)
            .toJSDate(),
        }));

        setCurrentTasks(convertedTasks);
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
