"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TasksCategory, TasksStatus } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { TASK_CATEGORY_OPTIONS } from "@/app/_constants/data_tasks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { cn } from "@/app/_lib/utils";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/app/_components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { DialogClose, DialogFooter } from "@/app/_components/ui/dialog";
import { toast } from "sonner";
import Editor from "@/app/_components/rich-text/editor";
import {
  createTasksSchema,
  CreateTasksSchema,
} from "@/app/_actions/tasks/create-task/schema";
import { createTasks } from "@/app/_actions/tasks/create-task";
import DatetimePickerForm24h from "./datetime-picker-form-24h";

interface CreateTaskDialogContentProps {
  onSuccess?: () => void;
  taskId?: string;
  defaultValues?: CreateTasksSchema;
}

const CreateTaskDialogContent = ({
  onSuccess,
  taskId,
  defaultValues,
}: CreateTaskDialogContentProps) => {
  const form = useForm<CreateTasksSchema>({
    shouldUnregister: true,
    resolver: zodResolver(createTasksSchema),
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
      category: TasksCategory.STUDY,
      startTime: new Date(),
      endTime: new Date(),
    },
  });

  const onSubmit = async (data: CreateTasksSchema) => {
    try {
      await createTasks({
        ...data,
        status: TasksStatus.NOT_STARTED,
      });

      onSuccess?.();
      toast.success(
        `Tarefa ${taskId ? "atualizada" : "adicionada"}  com sucesso!`,
        {
          description: format(
            new Date(),
            "EEEE, dd 'de' MMMM , yyyy 'às' h:mm a",
            {
              locale: ptBR,
            },
          ),
        },
      );
    } catch {
      toast.error(
        `Ocorreu um erro ao tentar ${taskId ? "atualizar" : "adicionar"} a tarefa!`,
      );
    }
  };

  const handleTimeChange = (
    fieldName: keyof CreateTasksSchema,
    type: "hour" | "minute",
    value: string,
  ) => {
    const currentDate = form.getValues(fieldName) || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    }

    form.setValue(fieldName, newDate);
  };

  const isUpdate = Boolean(taskId);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full space-y-6 px-1"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome da tarefa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Editor
                  content={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder="Descrição da tarefa"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-64 md:w-96" align="end">
                  {TASK_CATEGORY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-6 md:flex-row">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex flex-col md:basis-1/2">
                <FormLabel>Data e Hora de Início</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPPp", {
                            locale: ptBR,
                          })
                        ) : (
                          <span>Escolha a data e o horário</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 sm:flex" align="end">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (date) {
                          form.setValue("startTime", date);
                        }
                      }}
                      disabled={(date) => date <= new Date()}
                      locale={ptBR}
                      initialFocus
                    />

                    <DatetimePickerForm24h
                      field={field}
                      name="startTime"
                      onTimeChange={handleTimeChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="flex flex-col md:basis-1/2">
                <FormLabel>Data e Hora de Término</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPPp", {
                            locale: ptBR,
                          })
                        ) : (
                          <span>Escolha a data e o horário</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 sm:flex" align="end">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (date) {
                          const updatedDateTime = new Date(
                            date.setHours(
                              field.value?.getHours() || 0,
                              field.value?.getMinutes() || 0,
                            ),
                          );
                          field.onChange(updatedDateTime);
                        } else {
                          field.onChange(undefined); // Define como undefined caso nenhuma data seja selecionada
                        }
                      }}
                      disabled={(date) => date < new Date()}
                      locale={ptBR}
                      initialFocus
                    />

                    <DatetimePickerForm24h
                      field={field}
                      name="endTime"
                      onTimeChange={handleTimeChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter className="gap-3">
          <DialogClose asChild disabled={form.formState.isSubmitting}>
            <Button type="reset" variant="destructive">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2Icon size={16} className="animate-spin" />
            )}
            {isUpdate ? "Atualizar" : "Adicionar"} Tarefa
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateTaskDialogContent;
