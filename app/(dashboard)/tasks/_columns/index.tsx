"use client";

import { Tasks } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TasksTypeBadge from "../_components/type-badge";
import { Button } from "@/app/_components/ui/button";
import { ExternalLinkIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { TASK_CATEGORY_LABELS } from "@/app/_constantes";

export const tasksColumns: ColumnDef<Tasks>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: task } }) => TASK_CATEGORY_LABELS[task.category],
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original: task } }) => <TasksTypeBadge task={task} />,
  },
  {
    accessorKey: "startTime",
    header: "Prazo Inicial",
    cell: ({ row: { original: task } }) =>
      new Date(task.startTime).getHours() +
      ":" +
      new Date(task.startTime).getMinutes().toString().padStart(2, "0") +
      ", " +
      new Date(task.endTime).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "endTime",
    header: "Prazo Final",
    cell: ({ row: { original: task } }) =>
      new Date(task.endTime).getHours() +
      ":" +
      task.startTime.getMinutes().toString().padStart(2, "0") +
      ", " +
      new Date(task.endTime).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: () => {
      return (
        <div className="space-x-0.5">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <ExternalLinkIcon />
          </Button>

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <PencilIcon />
          </Button>

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Trash2Icon />
          </Button>
        </div>
      );
    },
  },
];
