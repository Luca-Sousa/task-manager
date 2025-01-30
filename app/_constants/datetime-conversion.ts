import { DateTime } from "luxon";

interface DatetimeConversionProps {
  year: string;
  month: string;
  day: string;
}

export const DatetimeConversion = ({
  year,
  month,
  day,
}: DatetimeConversionProps) => {
  const timeZone = "America/Sao_Paulo";

  const startOfDay = DateTime.fromObject(
    {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      hour: 0,
      minute: 0,
      second: 0,
    },
    { zone: timeZone },
  )
    .toUTC() // Converte para UTC
    .toISO(); // Retorna como string no formato ISO

  const endOfDay = DateTime.fromObject(
    {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      hour: 23,
      minute: 59,
      second: 59,
    },
    { zone: timeZone },
  )
    .toUTC() // Converte para UTC
    .toISO(); // Retorna como string no formato ISO

  if (!startOfDay || !endOfDay) {
    throw new Error("Invalid date range");
  }

  return { startOfDay, endOfDay };
};
