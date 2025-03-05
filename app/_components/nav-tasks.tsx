"use client";

import { ClockIcon, MoreHorizontal } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tasks } from "@prisma/client";
import { currentTasksSchedule } from "../_data-access/tasks/current-task-schedule";
import Image from "next/image";
import { TASK_CATEGORY_ICONS } from "../_constants/data_tasks";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";

const formatTime = (date: Date) =>
  `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

export function NavTasks() {
  const [currentTasks, setCurrentTasks] = useState<Tasks[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const year = new Date().getFullYear().toString();
        const month = (new Date().getMonth() + 1).toString();
        const day = new Date().getDate().toString();

        const result = await currentTasksSchedule({ year, month, day });

        setCurrentTasks(result);
      } catch (error) {
        console.error("Erro ao carregar as tarefas:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {currentTasks.length > 0 && (
        <div className="flex max-h-[300px] flex-col overflow-hidden lg:max-h-[450px]">
          <Separator className="group-data-[collapsible=icon]:hidden" />

          <SidebarGroupLabel className="mt-2 text-sm">
            <span className="mr-auto">Tarefas de Hoje</span>
            <div className="-mr-1.5 rounded-full bg-primary px-2 py-1 text-xs font-bold">
              {currentTasks.length}
            </div>
          </SidebarGroupLabel>

          <SidebarMenu className="mt-2 h-full flex-col gap-2 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-3 pr-2.5">
                {currentTasks.map((task) => (
                  <SidebarMenuItem key={task.id}>
                    <div className="flex justify-between px-2">
                      <div className="flex items-center gap-1.5">
                        <Image
                          src={TASK_CATEGORY_ICONS[task.category]}
                          alt="Ícone da Categoria da Tarefa"
                          width={18}
                          height={18}
                        />
                        <span className="w-32 truncate text-sm capitalize">
                          {task.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ClockIcon size={12} />
                        {formatTime(new Date(task.startTime))}
                      </div>
                    </div>
                  </SidebarMenuItem>
                ))}
              </div>
            </ScrollArea>

            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70" asChild>
                <Link href="/tasks">
                  <MoreHorizontal className="text-sidebar-foreground/70" />
                  <span>Ver Tarefas</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      )}
    </SidebarGroup>
  );
}
