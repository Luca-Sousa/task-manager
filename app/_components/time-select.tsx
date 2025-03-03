"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { FilterIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "../_lib/utils";
import { useEffect, useState } from "react";
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
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const day = searchParams.get("day");
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const [filterType, setFilterType] = useState<"day" | "month" | "year">("day");
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    if (year && month && day) {
      setFilterType("day");
    } else if (year && month) {
      setFilterType("month");
    } else if (year) {
      setFilterType("year");
    }
  }, [year, month, day]);

  const dateFilter = () => {
    if (year && month && day) {
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else if (year && month) {
      return new Date(parseInt(year), parseInt(month) - 1);
    } else if (year) {
      return new Date(parseInt(year), 0, 1);
    }
    return new Date();
  };

  const formatButtonText = () => {
    if (year && month && day) {
      return format(dateFilter(), "PPP", { locale: ptBR });
    } else if (year && month) {
      return format(dateFilter(), "'Informações de ' MMMM 'de' yyyy", {
        locale: ptBR,
      });
    } else if (year) {
      return format(dateFilter(), "'Informações de 'yyyy", { locale: ptBR });
    }
    return format(new Date(), "PPP", { locale: ptBR });
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
    push(
      `${path}/?year=${date.getFullYear()}&month=${date.getMonth() + 1}&day=${date.getDate()}`,
    );
    setIsOpen(false);
  };

  const handleSelectChange = (value: string) => {
    const daysToAdd = parseInt(value);
    const selectedDate = addDays(new Date(), daysToAdd);
    handleDateChange(selectedDate);
  };

  const handleMonthChange = () => {
    if (selectedMonth !== null && selectedYear !== null) {
      push(`${path}/?year=${selectedYear}&month=${selectedMonth}`);
    }
    setIsOpen(false);
  };

  const handleYearChange = () => {
    if (selectedYear !== null) {
      push(`${path}/?year=${selectedYear}`);
    }
    setIsOpen(false);
  };

  const renderMonthOptions = () => {
    return Array.from({ length: 12 }, (_, index) => (
      <SelectItem key={index} value={(index + 1).toString()}>
        {format(new Date(2022, index, 1), "MMMM", { locale: ptBR })}
      </SelectItem>
    ));
  };

  const renderYearOptions = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const year = new Date().getFullYear() - index;
      return (
        <SelectItem key={year} value={year.toString()}>
          {year}
        </SelectItem>
      );
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-fit justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          {formatButtonText()}
          <FilterIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-auto flex-col space-y-2 p-2"
        align="end"
      >
        {hasPremiumPlan && isOpenSelectFiltersPremium && (
          <Select
            defaultValue={filterType}
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
                onSelect={(selectedDate) =>
                  selectedDate && handleDateChange(selectedDate)
                }
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
                {renderMonthOptions()}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSelectedYear(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha o Ano" />
              </SelectTrigger>
              <SelectContent position="popper">
                {renderYearOptions()}
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
                {renderYearOptions()}
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
