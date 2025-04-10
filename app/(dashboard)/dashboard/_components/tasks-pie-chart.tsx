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
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

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

  const params = useSearchParams();
  const day = params.get("day");
  const month = params.get("month");
  const year = params.get("year");

  return (
    <Card className="flex h-full flex-col justify-between bg-muted/20 hover:bg-muted/30">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-xl font-bold">
          Gráfico de Desempenho
        </CardTitle>
        <CardDescription>
          {tasksTotal > 0 && year && month && day && (
            <div>
              Dados do dia{" "}
              {format(dateFilter, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </div>
          )}
          {tasksTotal > 0 && year && month && !day && (
            <div>
              Dados do mês de{" "}
              {format(dateFilter, "MMMM 'de' yyyy", { locale: ptBR })}
            </div>
          )}
          {tasksTotal > 0 && year && !month && !day && (
            <div>
              Dados do ano {format(dateFilter, "yyyy", { locale: ptBR })}
            </div>
          )}
        </CardDescription>
      </CardHeader>

      {tasksTotal > 0 ? (
        <ScrollArea>
          <CardContent className="h-full flex-1 pb-0">
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

            <div className="my-12 flex w-full flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <SquareIcon className="fill-chart-1 stroke-chart-1" size={16} />
                <span>Não Iniciado</span>
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <SquareIcon className="fill-chart-3 stroke-chart-3" size={16} />
                <span>Em Andamento</span>
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <SquareIcon className="fill-chart-2 stroke-chart-2" size={16} />
                <span>Concluído</span>
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <SquareIcon className="fill-chart-5 stroke-chart-5" size={16} />
                <span>Não Realizado</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="mt-auto flex-col gap-2 pt-6 text-sm 2xl:pt-0">
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
        </ScrollArea>
      ) : (
        <div className="flex h-full flex-col items-center justify-between gap-5 pt-5">
          <p className="max-w-xs text-center text-base font-semibold text-muted-foreground sm:text-lg xl:max-w-sm 2xl:max-w-[16rem]">
            Sem dados para o gráfico, crie novas tarefas
            <br />
            <span className="texy-xl font-bold text-primary">HOJE MESMO!</span>
          </p>

          <div className="relative aspect-video w-full max-w-lg 2xl:aspect-square 2xl:max-w-xs">
            <Image
              src="/undraw_analytics.svg"
              alt="Imagem referente a de quantidade de tarefas por categoria"
              fill
              className="object-contain 2xl:object-bottom"
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default TasksPieChart;
