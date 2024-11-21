import { Chip } from "@nextui-org/react";
import Link from "next/link";
import { ExportIcon } from "@components/icons/ExportIcon";

export default function CalendarItem({
  dateEntry,
  getDayFromDateEntry,
  getWeekdayFromDateEntry,
}: {
  dateEntry: any;
  getDayFromDateEntry: any;
  getWeekdayFromDateEntry: any;
}) {
  return (
    <article className="w-full h-max p-4 flex flex-col border border-white shadow-small rounded-md">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <span className="text-2xl font-bold">
            {getDayFromDateEntry(dateEntry.date)}
          </span>
          <span className="text-lg font-medium opacity-80">
            {getWeekdayFromDateEntry(dateEntry.date)}
          </span>
        </div>
        <Chip color="default">
          {dateEntry.events?.length > 0 && (
            <span>
              {dateEntry.events?.length} evento
              {dateEntry.events?.length !== 1 ? "s" : ""}
            </span>
          )}
        </Chip>
      </header>

      {dateEntry.events?.length > 0 ? (
        <ul className="flex flex-col gap-y-1 mt-4">
          {dateEntry.events.map((event: any, index: any) => (
            <li
              key={`${event.name}-${event.id}-${index}`}
              className="flex items-center gap-x-2"
            >
              <Link
                className="flex items-center gap-x-2 group"
                href={`/proyectos/${event.id}`}
              >
                {event.name} - {`Proyecto ${event.id}`}
                <ExportIcon className="size-4 opacity-0 group-hover:opacity-100 duration-100 ease-linear transition-opacity" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No hay eventos para este día
        </p>
      )}
    </article>
  );
}
