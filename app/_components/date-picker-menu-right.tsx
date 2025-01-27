"use client";

import { Calendar } from "@/app/_components/ui/calendar";
import {
  SidebarGroup,
  SidebarGroupContent,
} from "@/app/_components/ui/sidebar";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
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
