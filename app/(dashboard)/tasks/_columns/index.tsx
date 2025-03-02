"use client";

import { Tasks } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TasksTypeBadge from "../_components/type-badge";
import { TASK_CATEGORY_LABELS } from "@/app/_constants/data_tasks";
import DeleteTaskButton from "../_components/delete-task-button";
import ViewDataTask from "../_components/view-data-task";

const formatTime = (date: Date) =>
  `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;

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
    header: "Horário Inicial",
    cell: ({ row: { original: task } }) => {
      return formatTime(task.startTime);
    },
  },
  {
    accessorKey: "endTime",
    header: "Horário Final",
    cell: ({ row: { original: task } }) => {
      return formatTime(task.endTime);
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
