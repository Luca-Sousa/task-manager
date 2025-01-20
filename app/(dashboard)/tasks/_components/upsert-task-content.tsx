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
import { Textarea } from "@/app/_components/ui/textarea";
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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/app/_components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { Label } from "@/app/_components/ui/label";
import { Separator } from "@/app/_components/ui/separator";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { DialogClose, DialogFooter } from "@/app/_components/ui/dialog";
import { toast } from "sonner";
import { upsertTasksSchema } from "../_actions/upsert-task/schema";
import { upsertTasks } from "../_actions/upsert-task";

interface CreateTaskDialogContentProps {
  onSuccess?: () => void;
  taskId?: string;
  defaultValues?: upsertTasksSchema;
}

const UpsertTaskDialogContent = ({
  onSuccess,
  taskId,
  defaultValues,
}: CreateTaskDialogContentProps) => {
  const form = useForm<upsertTasksSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertTasksSchema),
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
      status: TasksStatus.NOT_STARTED,
      category: TasksCategory.STUDY,
      startTime: new Date(),
      endTime: new Date(),
    },
  });

  const onSubmit = async (data: upsertTasksSchema) => {
    try {
      form.setValue("status", TasksStatus.NOT_STARTED);
      data.status = TasksStatus.NOT_STARTED;
      await upsertTasks({ ...data, id: taskId });

      onSuccess?.();
      toast.success(
        `Tarefa ${taskId ? "atualizada" : "adicionada"}  com sucesso!`,
        {
          description: format(
            new Date(),
            "EEEE, dd 'de' MMMM , yyyy 'at' h:mm a",
            {
              locale: ptBR,
            },
          ),
        },
      );
    } catch (error) {
      console.log(error);
      toast.error(
        `Ocorreu um erro ao tentar ${taskId ? "atualizar" : "adicionar"} a tarefa!`,
      );
    }
  };

  const isUpdate = Boolean(taskId);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col overflow-hidden"
      >
        <ScrollArea className="h-full">
          <div className="mr-2 space-y-8 px-1">
            <div className="flex gap-3">
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
                name="status"
                render={({ field }) => (
                  <FormItem className="hidden w-40">
                    <FormLabel>Status</FormLabel>
                    <FormControl defaultValue={field.value}></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição da tarefa"
                      className="min-h-36 resize-none"
                      {...field}
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma Categoria..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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

            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
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
                    <PopoverContent className="w-auto p-0" align="start">
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
                        disabled={(date) => date <= new Date()}
                        locale={ptBR}
                        initialFocus
                      />

                      <Separator />

                      <div className="min-w-32 p-3">
                        <Label className="text-base">Horário</Label>
                        <Input
                          type="time"
                          className="mt-1.5 block"
                          value={
                            field.value ? format(field.value, "HH:mm") : ""
                          }
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value
                              .split(":")
                              .map(Number);
                            const updatedDateTime = new Date(
                              field.value?.setHours(hours, minutes),
                            );
                            field.onChange(updatedDateTime);
                          }}
                        />
                      </div>
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
                <FormItem className="flex flex-col">
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
                    <PopoverContent className="w-auto p-0" align="start">
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

                      <Separator />

                      <div className="min-w-32 p-3">
                        <Label className="text-base">Horário</Label>
                        <Input
                          type="time"
                          className="mt-1.5 block"
                          value={
                            field.value ? format(field.value, "HH:mm") : ""
                          }
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value
                              .split(":")
                              .map(Number);
                            const updatedDateTime = new Date(
                              field.value?.setHours(hours, minutes),
                            );
                            field.onChange(updatedDateTime);
                          }}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>

        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button type="reset" variant="destructive">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit">
            {isUpdate ? "Atualizar" : "Adicionar"} Tarefa
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpsertTaskDialogContent;
