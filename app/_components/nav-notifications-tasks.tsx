"use client";

import React, { useEffect, useState } from "react";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MessageCircleIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { format, differenceInMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "./ui/button";
import Link from "next/link";
import { getUserNotifications } from "../_data-access/get-user-notifications";
import { markNotificationAsRead } from "../_actions/notifications/update-notification-status-as-read";
import { Checkbox } from "./ui/checkbox";
import { NotificationsStatus } from "@prisma/client";
import { ScrollArea } from "./ui/scroll-area";

type Notification = {
  id: string;
  status: NotificationsStatus;
  taskName: string;
  taskStartTime: Date;
};

type Notifications = Notification[];

const NavNotificationsTasks = () => {
  const { isMobile } = useSidebar();
  const [notifications, setNotifications] = useState<Notifications>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getUserNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Atualiza a cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, status: "READ" } : n,
        ),
      );
    } catch (error) {
      console.error("Erro ao atualizar status da notificação:", error);
    }
  };

  // Filtra as notificações que estão dentro do intervalo de 10 minutos antes do início
  // Filtra as notificações para exibir todas as notificações, mas apenas as de tarefas futuras quando faltarem 10 minutos para começar
  const filteredNotifications = notifications.filter((notification) => {
    const now = new Date();
    const taskStartTime = new Date(notification.taskStartTime);
    const minutesUntilStart = differenceInMinutes(taskStartTime, now);

    // Mostra notificações de tarefas futuras apenas quando faltarem 10 minutos para o início
    if (minutesUntilStart > 10) {
      return false; // Não exibe notificações de tarefas futuras que faltam mais de 10 minutos
    }

    return true; // Exibe todas as notificações de tarefas passadas ou tarefas futuras com menos de 10 minutos
  });

  // Ordena as notificações pela data de início (taskStartTime)
  const sortedNotifications = filteredNotifications.sort((a, b) => {
    return (
      new Date(b.taskStartTime).getTime() - new Date(a.taskStartTime).getTime()
    );
  });

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer justify-between ring-offset-2 ring-offset-sidebar-accent data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex items-center gap-1.5">
                <MessageCircleIcon />
                <p>Notificações</p>
              </div>

              {sortedNotifications.some((n) => n.status === "UNREAD") && (
                <div className="flex h-full items-start">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping-large rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex size-2.5 rounded-full bg-primary"></span>
                  </span>
                </div>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="flex h-[600px] w-[--radix-dropdown-menu-trigger-width] min-w-[430px] flex-col overflow-hidden rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="h-full flex-col overflow-hidden p-4 pb-16">
              <h1 className="text-lg font-bold">Notificações</h1>
              <DropdownMenuSeparator className="my-5" />

              <ScrollArea className="h-full">
                <div className="pr-3.5">
                  {sortedNotifications.length === 0 ? (
                    <p className="text-gray-500">
                      Nenhuma Notificação no Momento
                    </p>
                  ) : (
                    sortedNotifications.map((notification) => (
                      <Card
                        key={notification.id}
                        className={`mb-3 flex h-full items-center justify-between px-3 ${
                          notification.status === "UNREAD" ? "bg-gray-900" : ""
                        }`}
                      >
                        <div className="group flex items-center">
                          <div className="hidden flex-1 items-center space-x-2 text-foreground transition-all duration-300 ease-in-out group-hover:flex">
                            <Checkbox
                              className="size-6 rounded-full border-2"
                              checked={notification.status === "READ"}
                              onCheckedChange={() => {
                                handleStatusChange(notification.id);
                              }}
                            />
                          </div>

                          <CardHeader className="p-3">
                            <CardTitle className="w-44 truncate">
                              Tarefa: {notification.taskName}
                            </CardTitle>
                            <CardDescription>
                              {notification.taskStartTime.getTime() <
                              new Date().getTime() ? (
                                "tarefa fora do horário de início"
                              ) : (
                                <>
                                  <span>A tarefa vai começar, às </span>
                                  {format(
                                    notification.taskStartTime,
                                    "HH:mm'!'",
                                    {
                                      locale: ptBR,
                                    },
                                  )}
                                </>
                              )}
                            </CardDescription>
                          </CardHeader>
                        </div>

                        <CardContent className="flex items-center justify-center p-0">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              handleStatusChange(notification.id);
                              setIsOpen(false);
                            }}
                            asChild
                          >
                            <Link href={"/tasks"} passHref>
                              Ver Tarefa
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavNotificationsTasks;
