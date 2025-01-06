"use client";

import { Tasks } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TasksTypeBadge from "./_components/type-badge";

export const tasksColumns: ColumnDef<Tasks>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original: task } }) => <TasksTypeBadge task={task} />,
  },
  {
    accessorKey: "startTime",
    header: "Prazo Inicial",
  },
  {
    accessorKey: "endTime",
    header: "Prazo Final",
  },
  {
    accessorKey: "actions",
    header: "",
  },
];
