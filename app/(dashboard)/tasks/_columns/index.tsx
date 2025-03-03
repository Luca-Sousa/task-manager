"use client";

import { Tasks } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TasksTypeBadge from "../_components/type-badge";
import { TASK_CATEGORY_LABELS } from "@/app/_constants/data_tasks";
import DeleteTaskButton from "../_components/delete-task-button";
import ViewDataTask from "../_components/view-data-task";
import { Button } from "@/app/_components/ui/button";
import { ArrowUpDown, ClockIcon } from "lucide-react";

const formatTime = (date: Date) =>
  `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;

export const tasksColumns: ColumnDef<Tasks>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoria
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row: { original: task } }) => TASK_CATEGORY_LABELS[task.category],
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row: { original: task } }) => <TasksTypeBadge task={task} />,
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Horário Inicial
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row: { original: task } }) => {
      const startDate = formatTime(task.startTime);
      return (
        <div className="flex items-center gap-3">
          <ClockIcon size={16} className="text-muted-foreground" />
          {startDate}
        </div>
      );
    },
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Horário Final
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row: { original: task } }) => {
      const startDate = formatTime(task.endTime);
      return (
        <div className="flex items-center gap-3">
          <ClockIcon size={16} className="text-muted-foreground" />
          {startDate}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: task } }) => {
      return (
        <div className="space-x-0.5">
          <ViewDataTask task={task} />

          <DeleteTaskButton taskId={task.id} status={task.status} />
        </div>
      );
    },
  },
];
