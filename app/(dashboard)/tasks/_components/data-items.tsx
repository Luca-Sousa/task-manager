"use client";

import { Card } from "@/app/_components/ui/card";
import { Tasks, TasksStatus } from "@prisma/client";
import {
  SunIcon,
  SunMoonIcon,
  MoonIcon,
  ClockIcon,
  CheckCircle,
  XCircleIcon,
} from "lucide-react";
import TasksTypeBadge from "./type-badge";
import { Badge } from "@/app/_components/ui/badge";
import { useCallback, useEffect, useMemo, useState } from "react";
import { updateTaskStatus } from "../../../_actions/tasks/update-task-status";
import DeleteTaskButton from "./delete-task-button";
import { Switch } from "@/app/_components/ui/switch";
import { Label } from "@/app/_components/ui/label";
import { toast } from "sonner";
import { TASK_CATEGORY_OPTIONS } from "@/app/_constants/data_tasks";
import ViewDataTask from "./view-data-task";
import { Input } from "@/app/_components/ui/input";
import { Checkbox } from "@/app/_components/ui/checkbox";

interface DataItemsTasksProps {
  tasks: Tasks[];
}

const DataItemsTasks = ({ tasks }: DataItemsTasksProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const formatTime = (date: Date) =>
    `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [tasks, searchTerm]);

  const tasksByPeriod = useMemo(
    () => ({
      manhã: filteredTasks.filter(
        (task) =>
          new Date(task.startTime).getHours() >= 6 &&
          new Date(task.startTime).getHours() < 12,
      ),
      tarde: filteredTasks.filter(
        (task) =>
          new Date(task.startTime).getHours() >= 12 &&
          new Date(task.startTime).getHours() < 18,
      ),
      noite: filteredTasks.filter(
        (task) =>
          new Date(task.startTime).getHours() >= 18 ||
          new Date(task.startTime).getHours() < 6,
      ),
    }),
    [filteredTasks],
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
      await updateTaskStatus({ taskId: taskId, status });
    } catch (error) {
      toast.error(`Erro ao atualizar o status da tarefa: ${error}`);
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

      // Exibe uma mensagem de sucesso
      toast.success("Tarefa Finalizada com Sucesso!");
    } catch (error) {
      console.error("Erro ao finalizar a tarefa:", error);
      toast.error("Erro ao finalizar a tarefa.");
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
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex items-center">
        <Input
          placeholder="Pesquisar Tarefas p/ Nome..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="space-y-5">
        {Object.entries(tasksByPeriod).map(
          ([period, tasks]) =>
            tasks.length > 0 && (
              <div key={period} className="flex flex-col gap-3">
                <div className="flex items-center gap-1.5 text-xl font-bold">
                  {period === "manhã" && <SunIcon size={12} />}
                  {period === "tarde" && <SunMoonIcon size={12} />}
                  {period === "noite" && <MoonIcon size={12} />}
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </div>

                <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
                                  {formatTime(new Date(task.startTime))} -{" "}
                                  {formatTime(new Date(task.endTime))}
                                </div>
                              </div>

                              <TasksTypeBadge task={task} />
                            </div>
                          </div>
                        </div>

                        <div className="pt-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {task.status === TasksStatus.NOT_STARTED ? (
                              <div className="flex flex-1 items-center space-x-2 text-foreground">
                                <Checkbox
                                  className="size-5 rounded-full border-2"
                                  id={task.id}
                                  disabled={
                                    new Date(task.startTime).getTime() >
                                    Date.now()
                                  }
                                  onCheckedChange={() =>
                                    handleCheckboxChange(task.id)
                                  }
                                />
                                <Label htmlFor={task.id}>Iniciar Tarefa</Label>
                              </div>
                            ) : task.status === TasksStatus.IN_PROGRESS ? (
                              <div className="flex flex-1 items-center space-x-2 text-foreground">
                                <Switch
                                  id={task.id}
                                  onCheckedChange={() =>
                                    handleSwitchChange(task.id)
                                  }
                                />
                                <Label htmlFor={task.id}>
                                  Finalizar Tarefa
                                </Label>
                              </div>
                            ) : (
                              <div className="flex flex-1 items-center space-x-2">
                                {task.status === TasksStatus.COMPLETED ? (
                                  <CheckCircle
                                    className="stroke-green-700"
                                    size={20}
                                  />
                                ) : (
                                  <XCircleIcon
                                    className="stroke-red-700"
                                    size={20}
                                  />
                                )}
                                <label
                                  htmlFor={task.id}
                                  className="text-sm font-medium leading-none"
                                >
                                  {task.status === TasksStatus.COMPLETED
                                    ? "Tarefa Concluída"
                                    : "Tarefa não realizada"}
                                </label>
                              </div>
                            )}

                            <div className="flex items-center gap-0.5">
                              <ViewDataTask task={task} />

                              <DeleteTaskButton
                                status={task.status}
                                taskId={task.id}
                              />
                            </div>
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
  );
};

export default DataItemsTasks;
