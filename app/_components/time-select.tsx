"use client";

import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { CalendarIcon, FilterIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "../_lib/utils";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useUser } from "@clerk/nextjs";

interface TimeSelectProps {
  path: string;
  isOpenSelectFiltersPremium?: boolean;
}

const TimeSelect = ({ path, isOpenSelectFiltersPremium }: TimeSelectProps) => {
  const { user } = useUser();
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  const { push } = useRouter();
  const [date, setDate] = useState<Date | undefined>();
  const [filterType, setFilterType] = useState<"day" | "month" | "year">("day");
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleDailyChange = (selectedDate: Date) => {
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    const year = selectedDate.getFullYear();

    setDate(selectedDate);
    push(`${path}/?year=${year}&month=${month}&day=${day}`);
  };

  const handleSelectChange = (value: string) => {
    const daysToAdd = parseInt(value);
    const selectedDate = addDays(new Date(), daysToAdd);
    handleDailyChange(selectedDate);
  };

  const handleMonthChange = () => {
    if (selectedMonth !== null && selectedYear !== null) {
      push(`${path}/?year=${selectedYear}&month=${selectedMonth}`);
    }
  };

  const handleYearChange = () => {
    if (selectedYear !== null) {
      push(`${path}/?year=${selectedYear}`);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-fit justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {date ? (
            format(date, "PPP", { locale: ptBR })
          ) : (
            <span>Filtre as Tarefas p/ data</span>
          )}
          <FilterIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-auto flex-col space-y-2 p-2"
        align="end"
      >
        {/* Escolha entre "Dia", "Mês" ou "Ano" */}
        {hasPremiumPlan && isOpenSelectFiltersPremium && (
          <Select
            defaultValue="day"
            onValueChange={(value) =>
              setFilterType(value as "day" | "month" | "year")
            }
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filtrar por" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="day">Filtrar por Dia</SelectItem>
              <SelectItem value="month">Filtrar por Mês</SelectItem>
              <SelectItem value="year">Filtrar por Ano</SelectItem>
            </SelectContent>
          </Select>
        )}

        {filterType === "day" ? (
          <>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleção Rápida" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="-1">Ontem</SelectItem>
                <SelectItem value="0">Hoje</SelectItem>
                <SelectItem value="1">Amanhã</SelectItem>
                <SelectItem value="3">Daqui há 3 dias</SelectItem>
                <SelectItem value="7">Daqui há 1 semana</SelectItem>
              </SelectContent>
            </Select>

            <div className="rounded-md border">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  if (selectedDate) {
                    handleDailyChange(selectedDate);
                  }
                }}
                initialFocus
                locale={ptBR}
              />
            </div>
          </>
        ) : filterType === "month" ? (
          <>
            <Select onValueChange={(value) => setSelectedMonth(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha o Mês" />
              </SelectTrigger>
              <SelectContent position="popper">
                {Array.from({ length: 12 }, (_, index) => (
                  <SelectItem key={index} value={(index + 1).toString()}>
                    {format(new Date(2022, index, 1), "MMMM", { locale: ptBR })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSelectedYear(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha o Ano" />
              </SelectTrigger>
              <SelectContent position="popper">
                {Array.from({ length: 5 }, (_, index) => {
                  const year = new Date().getFullYear() - index;
                  return (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Button
              disabled={!selectedMonth || !selectedYear}
              onClick={handleMonthChange}
            >
              Filtrar
            </Button>
          </>
        ) : (
          <>
            <Select onValueChange={(value) => setSelectedYear(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha o Ano" />
              </SelectTrigger>
              <SelectContent position="popper">
                {Array.from({ length: 5 }, (_, index) => {
                  const year = new Date().getFullYear() - index;
                  return (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Button disabled={!selectedYear} onClick={handleYearChange}>
              Filtrar
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default TimeSelect;
