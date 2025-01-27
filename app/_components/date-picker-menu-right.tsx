"use client";

import { Calendar } from "@/app/_components/ui/calendar";
import {
  SidebarGroup,
  SidebarGroupContent,
} from "@/app/_components/ui/sidebar";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export function DatePickerMenuLateral() {
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
    push(`tasks/?year=${year}&month=${month}&day=${day}`);
  };

  const handleSelectChange = (value: string) => {
    const daysToAdd = parseInt(value);
    const selectedDate = addDays(new Date(), daysToAdd);
    handleDailyChange(selectedDate);
  };

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <div className="space-y-5 px-2">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <CalendarIcon size={14} /> Data Filtrada:
            </div>
            <div className="w-full gap-3 text-center font-semibold text-muted-foreground">
              {date && format(date, "PPP", { locale: ptBR })}
            </div>
          </div>

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
        </div>

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
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
