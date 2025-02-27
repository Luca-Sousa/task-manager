import { Button } from "@/app/_components/ui/button";
import { ScrollArea, ScrollBar } from "@/app/_components/ui/scroll-area";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface DatetimePickerForm24hProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  field: ControllerRenderProps<TFieldValues>;
  name: keyof TFieldValues;
  onTimeChange: (
    name: keyof TFieldValues,
    type: "hour" | "minute",
    value: string,
  ) => void;
}

const DatetimePickerForm24h = <TFieldValues extends FieldValues = FieldValues>({
  field,
  name,
  onTimeChange,
}: DatetimePickerForm24hProps<TFieldValues>) => {
  return (
    <div className="flex flex-col sm:max-h-[300px]">
      <span className="text-center text-sm font-semibold text-foreground sm:p-2">
        Horário
      </span>
      <div className="flex h-full flex-col divide-y overflow-hidden sm:flex-row sm:divide-x sm:divide-y-0">
        <ScrollArea className="h-full w-64 sm:w-auto">
          <div className="flex h-full p-2 sm:flex-col">
            {Array.from({ length: 24 }, (_, i) => i)
              .reverse()
              .map((hour) => (
                <Button
                  key={hour}
                  size="icon"
                  variant={
                    field.value && field.value.getHours() === hour
                      ? "default"
                      : "ghost"
                  }
                  className="aspect-square shrink-0 sm:w-full"
                  onClick={() => onTimeChange(name, "hour", hour.toString())}
                >
                  {hour}
                </Button>
              ))}
          </div>
          <ScrollBar orientation="horizontal" className="sm:hidden" />
        </ScrollArea>

        <ScrollArea className="w-64 sm:w-auto">
          <div className="flex p-2 sm:flex-col">
            {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
              <Button
                key={minute}
                size="icon"
                variant={
                  field.value && field.value.getMinutes() === minute
                    ? "default"
                    : "ghost"
                }
                className="aspect-square shrink-0 sm:w-full"
                onClick={() => onTimeChange(name, "minute", minute.toString())}
              >
                {minute.toString().padStart(2, "0")}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="sm:hidden" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default DatetimePickerForm24h;
