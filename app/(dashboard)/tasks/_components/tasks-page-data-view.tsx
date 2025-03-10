"use client";

import DataItemsTasks from "./data-items";
import { Badge } from "@/app/_components/ui/badge";
import Image from "next/image";
import { DataTable } from "@/app/_components/ui/data-table";
import { tasksColumns } from "../_columns";
import { Tasks } from "@prisma/client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import TimeSelect from "@/app/_components/time-select";

interface TasksPageDataViewProps {
  tasks: Tasks[];
}

const TasksPageDataView = ({ tasks }: TasksPageDataViewProps) => {
  const [viewMode, setViewMode] = useState("cards");

  return (
    <div className="w-full space-y-10">
      <div className="flex justify-end gap-3">
        {tasks.length > 0 && (
          <Select
            onValueChange={(value) => setViewMode(value)}
            defaultValue={viewMode}
          >
            <SelectTrigger className="hidden w-28 sm:w-32 lg:flex">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="cards">Quadro</SelectItem>
              <SelectItem value="table">Tabela</SelectItem>
            </SelectContent>
          </Select>
        )}

        <TimeSelect path="tasks" />
      </div>

      {tasks.length > 0 ? (
        viewMode === "cards" ? (
          <DataItemsTasks tasks={tasks} />
        ) : (
          <DataTable data={tasks} columns={tasksColumns} />
        )
      ) : (
        <div className="flex h-full flex-1 flex-col items-center justify-between">
          <div className="mr-auto max-w-3xl space-y-5 lg:pl-6 xl:pl-16">
            <div className="flex flex-wrap gap-2 lg:gap-4">
              <Badge className="w-fit rounded-full bg-transparent px-3 ring-2 ring-sky-700 hover:bg-transparent">
                Gerencie
              </Badge>
              <Badge className="w-fit rounded-full bg-transparent px-3 ring-2 ring-violet-700 hover:bg-transparent">
                Crie
              </Badge>
              <Badge className="w-fit rounded-full bg-transparent px-3 ring-2 ring-rose-700 hover:bg-transparent">
                Organize-se
              </Badge>
            </div>

            <h1 className="text-3xl font-bold sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-balance">
              Crie novas <span className="text-primary">Tarefas</span> hoje
              mesmo, gerencie sua <span className="text-primary">Rotina</span>!
            </h1>
          </div>

          <div className="relative aspect-square w-full max-w-xs sm:max-w-md lg:aspect-video lg:max-w-lg xl:max-w-xl">
            <Image
              alt="Imagem informando que não tem tarefas cadastradas"
              src="/undraw_add_tasks.svg"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPageDataView;
