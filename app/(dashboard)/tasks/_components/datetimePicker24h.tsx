"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/app/_lib/utils";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { ScrollArea, ScrollBar } from "@/app/_components/ui/scroll-area";
import { CalendarIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";

interface DateTimePicker24hProps {
  date: Date;
  onChange: (date: Date) => void;
}

export function DateTimePicker24h({ date, onChange }: DateTimePicker24hProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(date?.getHours() || 0);
      newDate.setMinutes(date?.getMinutes() || 0);
      onChange(newDate);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", value: number) => {
    if (date) {
      const newDate = new Date(date);
      if (type === "hour") {
        newDate.setHours(value);
      } else if (type === "minute") {
        newDate.setMinutes(value);
      }

      onChange(newDate);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-fit justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPPp", {
              locale: ptBR,
            })
          ) : (
            <span>Escolha a data e o horário</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={(date) => {
              const today = new Date();
              date.setHours(0, 0, 0, 0);
              today.setHours(0, 0, 0, 0);
              return date < today;
            }}
            locale={ptBR}
            initialFocus
          />

          <div className="space-y-3 text-center">
            <span className="text-center text-sm font-semibold text-foreground sm:p-2">
              Horário
            </span>

            <div className="space-y-3 text-center">
              <span className="text-center text-sm font-semibold text-foreground sm:p-2">
                Horário
              </span>

              <div className="flex flex-col divide-y sm:h-[260px] sm:flex-row sm:divide-x sm:divide-y-0">
                {/* Seletor de horas */}
                <ScrollArea className="w-64 sm:w-auto">
                  <div className="flex p-2 sm:flex-col">
                    {hours.reverse().map((hour) => {
                      const now = new Date(); // Data e hora atuais
                      const selectedDate = date ? new Date(date) : null; // Data selecionada

                      // Verifica se o horário está no passado
                      const isPastTime =
                        selectedDate &&
                        selectedDate.getDate() === now.getDate() && // Mesmo dia
                        selectedDate.getMonth() === now.getMonth() && // Mesmo mês
                        selectedDate.getFullYear() === now.getFullYear() && // Mesmo ano
                        hour < now.getHours(); // Horário anterior ao atual

                      return (
                        <Button
                          key={hour}
                          size="icon"
                          variant={
                            date && date.getHours() === hour
                              ? "default"
                              : "ghost"
                          }
                          className="aspect-square shrink-0 sm:w-full"
                          onClick={() => handleTimeChange("hour", hour)}
                          disabled={isPastTime as boolean} // Desabilita o botão se o horário estiver no passado
                        >
                          {hour}
                        </Button>
                      );
                    })}
                  </div>
                  <ScrollBar orientation="horizontal" className="sm:hidden" />
                </ScrollArea>

                {/* Seletor de minutos */}
                <ScrollArea className="w-64 sm:w-auto">
                  <div className="flex p-2 sm:flex-col">
                    {Array.from({ length: 60 }, (_, i) => i).map((minute) => {
                      const now = new Date(); // Data e hora atuais
                      const selectedDate = date ? new Date(date) : null; // Data selecionada

                      // Verifica se o minuto está no passado
                      const isPastMinute =
                        selectedDate &&
                        selectedDate.getDate() === now.getDate() && // Mesmo dia
                        selectedDate.getMonth() === now.getMonth() && // Mesmo mês
                        selectedDate.getFullYear() === now.getFullYear() && // Mesmo ano
                        selectedDate.getHours() === now.getHours() && // Mesma hora
                        minute < now.getMinutes(); // Minuto anterior ao atual

                      return (
                        <Button
                          key={minute}
                          size="icon"
                          variant={
                            date && date.getMinutes() === minute
                              ? "default"
                              : "ghost"
                          }
                          className="aspect-square shrink-0 sm:w-full"
                          onClick={() => handleTimeChange("minute", minute)}
                          disabled={isPastMinute as boolean} // Desabilita o botão se o minuto estiver no passado
                        >
                          {minute.toString().padStart(2, "0")}
                        </Button>
                      );
                    })}
                  </div>
                  <ScrollBar orientation="horizontal" className="sm:hidden" />
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
