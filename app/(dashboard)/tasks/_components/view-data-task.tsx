"use client";

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { TASK_CATEGORY_OPTIONS } from "@/app/_constants/data_tasks";
import { Tasks, TasksCategory, TasksStatus } from "@prisma/client";
import { format, isSameMinute } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import { updateTaskName } from "@/app/_actions/tasks/update-task-name";
import { toast } from "sonner";
import { Input } from "@/app/_components/ui/input";
import {
  AlignLeftIcon,
  CalendarCheckIcon,
  CaptionsIcon,
  ExternalLinkIcon,
  LoaderIcon,
  OptionIcon,
  SaveIcon,
  TagIcon,
} from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import Editor from "@/app/_components/rich-text/editor";
import { updateDescriptionTask } from "@/app/_actions/tasks/update-task-description";
import { Separator } from "@/app/_components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { updateTaskCategory } from "@/app/_actions/tasks/update-task-category";
import { updateTaskEndTime } from "@/app/_actions/tasks/update-task-endTime";
import { updateTaskStartTime } from "@/app/_actions/tasks/update-task-startTime";
import { updateTaskStatus } from "@/app/_actions/tasks/update-task-status";
import { DateTimePicker24h } from "./datetime-picker-24h";
import { tasksTimeIguais } from "@/app/_data-access/tasks/tasks-time-iguais";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Switch } from "@/app/_components/ui/switch";
import { Label } from "@/app/_components/ui/label";
import TasksTypeBadge from "./type-badge";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

interface ViewDataTaskProps {
  task: Tasks;
}

const ViewDataTask = ({ task }: ViewDataTaskProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskName, setTaskName] = useState(task.name);
  const [currentName, setCurrentName] = useState(task.name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);
  const [currentDescription, setCurrentDescription] = useState(
    task.description,
  );
  const [currentCateory, setCurrentCategory] = useState(task.category);
  const [startDate, setStartDate] = useState(task.startTime);
  const [endDate, setEndDate] = useState(task.endTime);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isSavingStartTime, setIsSavingStartTime] = useState(false);
  const [isSavingEndTime, setIsSavingEndTime] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  useEffect(() => {
    if (isEditingName && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditingName]);

  const handleNameTask = async (newName: string) => {
    if (newName.trim() && newName !== task.name) {
      try {
        updateTaskName({ taskId: task.id, name: newName });
        toast.success("Nome da tarefa atualizado com sucesso!");
      } catch (error) {
        toast.error(`Nome da tarefa atualizado com sucesso!, ${error}`);
      }
    }
  };

  const handleDescriptionTask = (newDesc: string) => {
    try {
      updateDescriptionTask({ taskId: task.id, description: newDesc });
      toast.success("Descrição da tarefa atualizado com sucesso!");
      setCurrentDescription(newDesc);
      setIsEditingDescription(false);
    } catch (error) {
      toast.error(`Descrição da tarefa atualizado com sucesso!, ${error}`);
    }
  };

  const handleCategoryTask = (newCategory: TasksCategory) => {
    try {
      updateTaskCategory({ taskId: task.id, category: newCategory });
      toast.success("Categoria da tarefa atualizada com sucesso!");
      setCurrentCategory(newCategory);
    } catch (error) {
      toast.error(`Categoria da tarefa atualizada com sucesso!, ${error}`);
    }
  };

  const handleUpdateTaskStatus = async (
    taskId: string,
    status: TasksStatus,
  ) => {
    try {
      await updateTaskStatus({ taskId: taskId, status });
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

  const handleStartTimeTask = async () => {
    if (task.status === TasksStatus.IN_PROGRESS) {
      toast.error(
        "Você já iniciou essa tarefa, por isso não pode alterar a data de ínicio.",
      );
      return;
    }

    if (task.status === TasksStatus.COMPLETED) {
      toast.error(
        "Você não pode alterar a data de início de uma tarefa finalizada.",
      );
      return;
    }

    if (task.status === TasksStatus.UNREALIZED) {
      toast.error(
        "Você não pode alterar a data de início de uma tarefa não realizada.",
      );
      return;
    }

    if (startDate < new Date()) {
      toast.error("A data de início não pode ser no passado.");
      return;
    }

    if (startDate >= endDate) {
      toast.error(
        "A data de início não pode ser anterior ou igual à data de término.",
      );
      return;
    }

    if (
      (
        await tasksTimeIguais({
          startTime: startDate,
          endTime: endDate,
          taskId: task.id,
        })
      ).length > 0
    ) {
      toast.error(
        "Já existe uma tarefa com data de início e término iguais. Por favor, escolha outra data.",
      );
      return;
    }

    setIsSavingStartTime(true);
    try {
      await updateTaskStartTime({
        taskId: task.id,
        startTime: startDate,
      });
      toast.success("Data de início atualizada com sucesso!");
      setStartDate(startDate);
    } catch (error) {
      toast.error(`Data de início atualizada com sucesso!, ${error}`);
    } finally {
      setIsSavingStartTime(false);
    }
  };

  const hasDateStartChanged = !isSameMinute(startDate, task.startTime);

  const handleEndTimeTask = async () => {
    if (task.status === TasksStatus.IN_PROGRESS) {
      toast.error(
        "Você já iniciou essa tarefa, por isso não pode alterar a data de término.",
      );
      return;
    }

    if (task.status === TasksStatus.COMPLETED) {
      toast.error(
        "Você não pode alterar a data de término de uma tarefa finalizada.",
      );
      return;
    }

    if (task.status === TasksStatus.UNREALIZED) {
      toast.error(
        "Você não pode alterar a data de término de uma tarefa não realizada.",
      );
      return;
    }

    if (endDate < new Date()) {
      toast.error("A data de término não pode ser no passado.");
      return;
    }

    if (
      endDate.getDate() !== startDate.getDate() ||
      endDate.getMonth() !== startDate.getMonth() ||
      endDate.getFullYear() !== startDate.getFullYear()
    ) {
      toast.error("A data de término deve ser no mesmo dia da data de início.");
      return;
    }

    if (endDate <= startDate) {
      toast.error(
        "A data de término não pode ser anterior ou igual à data de início.",
      );
      return;
    }

    if (
      (
        await tasksTimeIguais({
          startTime: startDate,
          endTime: endDate,
          taskId: task.id,
        })
      ).length > 0
    ) {
      toast.error(
        "Já existe uma tarefa com data de início e término iguais. Por favor, escolha outra data.",
      );
      return;
    }

    setIsSavingEndTime(true);
    try {
      updateTaskEndTime({
        taskId: task.id,
        endTime: endDate,
      });
      toast.success("Data de término da tarefa atualizada com sucesso!");
      setEndDate(endDate);
    } catch (error) {
      toast.error(
        `Data de término da tarefa atualizada com sucesso!, ${error}`,
      );
    } finally {
      setIsSavingEndTime(false);
    }
  };

  const hasDateEndChanged = !isSameMinute(endDate, task.endTime);

  return (
    <Sheet
      modal={false}
      open={isOpen}
      onOpenChange={(value) => {
        setIsOpen(value);
        setIsEditingDescription(false);
        setNewDescription(currentDescription);
        setIsEditingName(false);
        setTaskName(currentName);
      }}
    >
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <ExternalLinkIcon />
        </Button>
      </SheetTrigger>

      {isOpen && <div className="fixed inset-0 z-40 bg-black/80" />}

      <SheetContent className="z-50 flex min-w-full flex-col md:min-w-[40rem]">
        <SheetHeader>
          <SheetTitle className="text-lg">Informações da Tarefa</SheetTitle>
          <SheetDescription>
            Tarefa criada em:{" "}
            {format(task.createdAt, "dd 'de' MMMM 'de' yyyy - HH:mm", {
              locale: ptBR,
            })}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="pr-4">
          <div className="space-y-2 py-3">
            <div className="grid grid-cols-[2.5rem,1fr] items-center">
              <CaptionsIcon size={20} />
              <div className="flex w-full items-center justify-between md:min-h-9">
                <h2 className="text-lg font-bold text-muted-foreground">
                  Título
                </h2>
                {!isEditingName && (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingName(true)}
                  >
                    Editar
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[2.5rem,1fr] items-center">
              <span></span>
              {isEditingName ? (
                <div className="mr-1 space-y-3">
                  <Input
                    ref={inputRef}
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleNameTask(taskName);
                      }
                    }}
                    className="h-fit pl-3 !text-base"
                  />

                  <div className="flex items-center justify-end space-x-3">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsEditingName(false);
                        setTaskName(currentName);
                      }}
                    >
                      Cancelar
                    </Button>

                    <Button
                      onClick={() => {
                        handleNameTask(taskName);
                        setCurrentName(taskName);
                        setIsEditingName(false);
                      }}
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              ) : (
                <Input
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleNameTask(taskName);
                    }
                  }}
                  onClick={() => setIsEditingName(true)}
                  className="h-fit border-none pl-0 !text-base focus:pl-3"
                />
              )}
            </div>
          </div>

          <div className="ml-10">
            <Separator />
          </div>

          <div className="space-y-2 py-3">
            <div className="grid grid-cols-[2.5rem,1fr] items-center">
              <AlignLeftIcon size={20} />
              <div className="flex min-h-9 items-center justify-between">
                <h2 className="text-lg font-bold text-muted-foreground">
                  Descrição
                </h2>
                {!isEditingDescription && (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingDescription(true)}
                  >
                    Editar
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[2.5rem,1fr] items-center">
              <span />
              {isEditingDescription ? (
                <div className="space-y-3">
                  <Editor
                    content={newDescription}
                    onChange={(value) => setNewDescription(value)}
                    placeholder="Descrição da tarefa"
                  />

                  <div className="flex items-center justify-end space-x-3">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsEditingDescription(false);
                        setNewDescription(currentDescription);
                      }}
                    >
                      Cancelar
                    </Button>

                    <Button
                      onClick={() => handleDescriptionTask(newDescription)}
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setIsEditingDescription(true)}
                  dangerouslySetInnerHTML={{ __html: currentDescription }}
                  className="prose min-w-full leading-tight text-foreground prose-headings:text-foreground prose-a:text-foreground hover:prose-a:text-primary"
                />
              )}
            </div>
          </div>

          <div className="ml-10">
            <Separator />
          </div>

          <div className="grid grid-cols-[2.5rem,1fr] items-center py-3">
            <TagIcon size={20} />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <h2 className="text-lg font-bold text-muted-foreground">
                Categoria
              </h2>

              <Select
                onValueChange={(value) =>
                  handleCategoryTask(value as TasksCategory)
                }
                defaultValue={currentCateory}
              >
                <SelectTrigger className="max-w-fit gap-3">
                  <SelectValue placeholder={currentCateory} />
                </SelectTrigger>
                <SelectContent align="end">
                  {TASK_CATEGORY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="ml-10">
            <Separator />
          </div>

          <div className="grid grid-cols-[2.5rem,1fr] items-start py-3">
            <OptionIcon size={20} />
            <div className="flex flex-col justify-between gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-muted-foreground">
                  Status:
                </h2>

                <TasksTypeBadge task={task} />
              </div>

              <div>
                {task.status === TasksStatus.NOT_STARTED && (
                  <div className="flex flex-1 items-center space-x-2 text-foreground">
                    <Checkbox
                      className="size-5 rounded-full border-2"
                      id={task.id}
                      disabled={new Date(task.startTime).getTime() > Date.now()}
                      onCheckedChange={() => handleCheckboxChange(task.id)}
                    />
                    <Label htmlFor={task.id}>Iniciar Tarefa</Label>
                  </div>
                )}

                {task.status === TasksStatus.IN_PROGRESS && (
                  <div className="flex flex-1 items-center space-x-2 text-foreground">
                    <Switch
                      id={task.id}
                      onCheckedChange={() => handleSwitchChange(task.id)}
                    />
                    <Label htmlFor={task.id}>Finalizar Tarefa</Label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="ml-10">
            <Separator />
          </div>

          <div className="space-y-5 py-3 sm:space-y-2">
            <div className="grid grid-cols-[2.5rem,1fr] items-center">
              <CalendarCheckIcon size={20} />

              <h2 className="text-lg font-bold text-muted-foreground">Datas</h2>
            </div>

            <div className="grid grid-cols-[2.5rem,1fr] items-center">
              <span />
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <p className="text-sm font-semibold text-muted-foreground">
                  Data de início:
                </p>

                <div className="flex items-center gap-1.5">
                  <DateTimePicker24h date={startDate} onChange={setStartDate} />

                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={handleStartTimeTask}
                    disabled={isSavingStartTime || !hasDateStartChanged}
                  >
                    {isSavingStartTime ? (
                      <LoaderIcon className="animate-spin" />
                    ) : (
                      <SaveIcon />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[2.5rem,1fr] items-center">
              <span />
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <p className="text-sm font-semibold text-muted-foreground">
                  Data de término:
                </p>

                <div className="flex items-center gap-1.5">
                  <DateTimePicker24h date={endDate} onChange={setEndDate} />
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={handleEndTimeTask}
                    disabled={isSavingEndTime || !hasDateEndChanged}
                  >
                    {isSavingEndTime ? (
                      <LoaderIcon className="animate-spin" />
                    ) : (
                      <SaveIcon />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default ViewDataTask;
