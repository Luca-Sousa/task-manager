"use client";

import * as React from "react";
import { SquareIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TasksStatus } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TasksPieChartProps {
  dateFilter: Date;
  notStartedTotal: number;
  inProgressTotal: number;
  completedTotal: number;
  unrealizedTotal: number;
  tasksTotal: number;
  percentageOfTasksCompleted: number;
}

const chartConfig = {
  [TasksStatus.NOT_STARTED]: {
    label: "Não Iniciado",
    color: "hsl(var(--chart-1))",
  },
  [TasksStatus.IN_PROGRESS]: {
    label: "Em Andamento",
    color: "hsl(var(--chart-3))",
  },
  [TasksStatus.COMPLETED]: {
    label: "Completado",
    color: "hsl(var(--chart-2))",
  },
  [TasksStatus.UNREALIZED]: {
    label: "Não Realizado",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const TasksPieChart = ({
  dateFilter,
  notStartedTotal,
  inProgressTotal,
  completedTotal,
  unrealizedTotal,
  tasksTotal,
  percentageOfTasksCompleted,
}: TasksPieChartProps) => {
  const chartData = [
    {
      type: TasksStatus.NOT_STARTED,
      value: notStartedTotal,
      fill: chartConfig[TasksStatus.NOT_STARTED].color,
    },
    {
      type: TasksStatus.IN_PROGRESS,
      value: inProgressTotal,
      fill: chartConfig[TasksStatus.IN_PROGRESS].color,
    },
    {
      type: TasksStatus.COMPLETED,
      value: completedTotal,
      fill: chartConfig[TasksStatus.COMPLETED].color,
    },
    {
      type: TasksStatus.UNREALIZED,
      value: unrealizedTotal,
      fill: chartConfig[TasksStatus.UNREALIZED].color,
    },
  ];

  return (
    <Card className="flex flex-col bg-muted/20 hover:bg-muted/30">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-xl font-bold">
          Gráfico de Desempenho
        </CardTitle>
        <CardDescription>
          {format(dateFilter, "PPP", { locale: ptBR })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="type"
              innerRadius={70}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {tasksTotal}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tarefas
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="flex flex-col items-center gap-1.5 xl:flex-row xl:gap-3">
          <div className="flex w-full flex-col gap-1.5">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <SquareIcon className="fill-chart-1 stroke-chart-1" size={16} />
              <span>Não Iniciado</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <SquareIcon className="fill-chart-3 stroke-chart-3" size={16} />
              <span>Em Andamento</span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <SquareIcon className="fill-chart-2 stroke-chart-2" size={16} />
              <span>Concluído</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <SquareIcon className="fill-chart-5 stroke-chart-5" size={16} />
              <span>Não Realizado</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2 pt-6 text-sm 2xl:pt-0">
        <div className="flex items-center gap-2 font-medium leading-none">
          <div>
            Tarefas Concluídas:{" "}
            <span
              className={`${percentageOfTasksCompleted > 50 ? "text-chart-2" : "text-chart-5"}`}
            >
              {percentageOfTasksCompleted}%
            </span>
          </div>
          {percentageOfTasksCompleted > 50 ? (
            <TrendingUpIcon
              className={`${percentageOfTasksCompleted > 50 ? "text-chart-2" : "text-chart-5"} size-4`}
            />
          ) : (
            <TrendingDownIcon
              className={`${percentageOfTasksCompleted > 50 ? "text-chart-2" : "text-chart-5"} size-4`}
            />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          {percentageOfTasksCompleted > 50
            ? "Desempenho Ótimo"
            : "Desempenho Ruim"}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TasksPieChart;
