import { Chip } from "@nextui-org/react";

export default function CalendarItem() {
  return (
    <article className="w-full h-max p-4 flex flex-col border border-white shadow-small rounded-md">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <span className="text-2xl font-bold">24</span>
          <span className="text-lg font-medium opacity-80">lun</span>
        </div>
        <Chip color="default">2 eventos</Chip>
      </header>
      <ul className="flex flex-col gap-y-1 mt-4">
        <li className="flex items-center gap-x-2">
          <span className="text-base ">Reunión de trabajo</span>
        </li>
        <li className="flex items-center gap-x-2">
          <span className="text-base ">Entrevista de trabajo</span>
        </li>
      </ul>
    </article>
  );
}
