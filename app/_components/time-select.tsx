"use client";

import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { CalendarIcon, FilterIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "../_lib/utils";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TimeSelectProps {
  path: string;
}

const TimeSelect = ({ path }: TimeSelectProps) => {
  const { push } = useRouter();
  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    if (!date) {
      const today = new Date();
      setDate(today);
    }
  }, [date]);

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
      </PopoverContent>
    </Popover>
  );
};

export default TimeSelect;
