import { DateValue } from "@heroui/react";
import { parseAbsoluteToLocal } from "@internationalized/date";

const standardDate = (date: number) => {
  if (date < 10) {
    return `0${date}`;
  } else {
    return date;
  }
};

const toDateStandard = (date: DateValue) => {
  const year = date.year;
  const month = date.month;
  const day = date.day;

  const hour = "hour" in date ? date.hour : 0;
  const minute = "minute" in date ? date.minute : 0;
  const second = "second" in date ? date.second : 0;

  const result = `${standardDate(year)}-${standardDate(month)}-${standardDate(day)} ${standardDate(hour)}:${standardDate(minute)}:${standardDate(second)}`;
  return result;
};

const toInputDate = (date: string) => {
  const [datePart, timePart] = date.split(" ");
  const [year, month, day] = datePart.split("-");
  const normalized = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${timePart}+07:00`;
  return parseAbsoluteToLocal(normalized);

  // const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);
  // return formattedDate;
};

export { toDateStandard, toInputDate };
