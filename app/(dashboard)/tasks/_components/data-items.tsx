"use client";

import { Card } from "@/app/_components/ui/card";
import { Tasks, TasksStatus } from "@prisma/client";

import {
  SunIcon,
  SunMoonIcon,
  MoonIcon,
  ClockIcon,
  ExternalLinkIcon,
} from "lucide-react";
import TasksTypeBadge from "./type-badge";
import { Separator } from "@/app/_components/ui/separator";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import { useCallback, useEffect, useMemo } from "react";
import { updateTaskStatus } from "../../../_actions/tasks/update-task-status";
import DeleteTaskButton from "./delete-task-button";
import EditButtonTask from "./edit-button-task";
import TimeSelect from "@/app/_components/time-select";
import { Switch } from "@/app/_components/ui/switch";
import { Label } from "@/app/_components/ui/label";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { toast } from "sonner";
import { TASK_CATEGORY_OPTIONS } from "@/app/_constants/data_tasks";

interface DataItemsTasksProps {
  tasks: Tasks[];
}

const DataItemsTasks = ({ tasks }: DataItemsTasksProps) => {
  const formatTime = (date: Date) =>
    `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;

  const tasksByPeriod = useMemo(
    () => ({
      manhã: tasks.filter(
        (task) =>
          new Date(task.startTime).getHours() >= 6 &&
          new Date(task.startTime).getHours() < 12,
      ),
      tarde: tasks.filter(
        (task) =>
          new Date(task.startTime).getHours() >= 12 &&
          new Date(task.startTime).getHours() < 18,
      ),
      noite: tasks.filter(
        (task) =>
          new Date(task.startTime).getHours() >= 18 ||
          new Date(task.startTime).getHours() < 6,
      ),
    }),
    [tasks],
  );

  const statusColors = {
    NOT_STARTED: "border-0 bg-gray-700",
    COMPLETED: "border-0 bg-green-700",
    IN_PROGRESS: "border-0 bg-yellow-700",
    UNREALIZED: "border-0 bg-red-700",
  };

  const handleUpdateTaskStatus = async (
    taskId: string,
    status: TasksStatus,
  ) => {
    try {
      await updateTaskStatus({ id: taskId, status });
    } catch (error) {
      console.error("Erro ao atualizar o status da tarefa:", error);
    }
  };

  const handleCheckboxChange = async (taskId: string) => {
    try {
      await handleUpdateTaskStatus(taskId, TasksStatus.IN_PROGRESS);
      toast.success("Tarefa Iniciada com Sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o status da tarefa:", error);
    }
  };

  const handleSwitchChange = async (taskId: string) => {
    try {
      await handleUpdateTaskStatus(taskId, TasksStatus.COMPLETED);
      toast.success("Tarefa Completada com Sucesso!");
    } catch (error) {
      console.error("Erro ao finalizar a tarefa:", error);
    }
  };

  const checkTaskStatus = useCallback(async (task: Tasks) => {
    const currentTime = new Date().getTime();
    const endDate = new Date(task.endTime).getTime();

    if (task.status === TasksStatus.NOT_STARTED && currentTime > endDate) {
      await handleUpdateTaskStatus(task.id, TasksStatus.UNREALIZED);
    }

    if (task.status === TasksStatus.IN_PROGRESS && currentTime > endDate) {
      await handleUpdateTaskStatus(task.id, TasksStatus.COMPLETED);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      tasks.forEach((task) => checkTaskStatus(task));
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks, checkTaskStatus]);

  return (
    <>
      <Separator className="my-4" />

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-center justify-end lg:hidden">
          <TimeSelect path="tasks" />
        </div>

        <div className="space-y-5">
          {Object.entries(tasksByPeriod).map(
            ([period, tasks]) =>
              tasks.length > 0 && (
                <div key={period} className="flex flex-col gap-3">
                  <div className="flex items-center gap-1.5 font-bold">
                    {period === "manhã" && <SunIcon size={12} />}
                    {period === "tarde" && <SunMoonIcon size={12} />}
                    {period === "noite" && <MoonIcon size={12} />}
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </div>

                  <div className="grid gap-3 xl:grid-cols-2 2xl:grid-cols-3">
                    {tasks.map((task, index) => (
                      <Card
                        key={task.id}
                        className={`flex flex-1 flex-col bg-muted/20 px-3 py-2 hover:bg-muted/30`}
                      >
                        <div className="flex flex-col justify-between">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <Badge
                                className={`${statusColors[task.status]} hover:bg-${statusColors[task.status]} h-2 w-16`}
                              />

                              <span className="text-sm text-gray-600">
                                #{index + 1}
                              </span>
                            </div>

                            <div>
                              <div className="w-64 truncate font-bold sm:w-full">
                                {task.name}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="text-xs text-muted-foreground">
                                  <span>
                                    {
                                      TASK_CATEGORY_OPTIONS.find(
                                        (category) =>
                                          category.value === task.category,
                                      )?.label
                                    }
                                  </span>

                                  <div className="flex items-center gap-1.5">
                                    <ClockIcon size={12} />
                                    {formatTime(
                                      new Date(task.startTime),
                                    )} - {formatTime(new Date(task.endTime))}
                                  </div>
                                </div>

                                <TasksTypeBadge task={task} />
                              </div>
                            </div>
                          </div>

                          <div className="pt-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="flex flex-1 items-center space-x-2">
                                <Checkbox
                                  id={task.id}
                                  disabled={
                                    task.status === TasksStatus.IN_PROGRESS ||
                                    task.status === TasksStatus.COMPLETED ||
                                    task.status === TasksStatus.UNREALIZED ||
                                    new Date(task.startTime).getTime() >
                                      Date.now()
                                  }
                                  checked={
                                    task.status === TasksStatus.IN_PROGRESS ||
                                    task.status === TasksStatus.COMPLETED ||
                                    task.status === TasksStatus.UNREALIZED
                                  }
                                  onCheckedChange={() =>
                                    handleCheckboxChange(task.id)
                                  }
                                />
                                <label
                                  htmlFor={task.id}
                                  className="text-sm font-medium leading-none"
                                >
                                  {task.status === TasksStatus.COMPLETED
                                    ? "Tarefa Finalizada"
                                    : task.status === TasksStatus.UNREALIZED
                                      ? "Tarefa não realizada"
                                      : task.status === TasksStatus.IN_PROGRESS
                                        ? "Tarefa Iniciada"
                                        : "Iniciar Tarefa"}
                                </label>
                              </div>

                              <div
                                className={`${(task.status === TasksStatus.COMPLETED || task.status === TasksStatus.NOT_STARTED || task.status === TasksStatus.UNREALIZED) && "hidden transition-all"} ${task.status === TasksStatus.IN_PROGRESS && "flex items-center space-x-2 text-foreground"} `}
                              >
                                <Switch
                                  id={task.id}
                                  disabled={
                                    task.status === TasksStatus.COMPLETED
                                  }
                                  onCheckedChange={() =>
                                    handleSwitchChange(task.id)
                                  }
                                />
                                <Label htmlFor={task.id}>
                                  {task.status === TasksStatus.COMPLETED
                                    ? "Tarefa Completada"
                                    : "Finalizar Tarefa"}
                                </Label>
                              </div>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground"
                              >
                                <ExternalLinkIcon />
                              </Button>

                              <EditButtonTask task={task} />
                              <DeleteTaskButton
                                status={task.status}
                                taskId={task.id}
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </>
  );
};

export default DataItemsTasks;
