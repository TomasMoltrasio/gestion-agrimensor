import { CalendarIcon } from "@components/icons/CalendarIcon";
import CalendarItem from "./CalendarItem";

export default function CalendarContainer() {
  return (
    <section className="w-full h-max p-4 flex flex-col justify-start items-start rounded-md">
      <div className="flex text-center justify-center gap-x-2 h-max">
        <CalendarIcon className="size-7" />
        <h3 className="text-2xl font-medium">Noviembre 2024</h3>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 w-full">
        <CalendarItem />
        <CalendarItem />
        <CalendarItem />
        <CalendarItem />
      </div>
    </section>
  );
}
