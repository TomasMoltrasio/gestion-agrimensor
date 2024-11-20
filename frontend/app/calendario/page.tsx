import CalendarContainer from "@components/calendario/CalendarContainer";
import { BackIcon } from "@components/icons/BackIcon";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div className="flex items-center justify-start mb-8">
        <Link href={"/"} className="inline-flex gap-x-2 items-center">
          <BackIcon />
          Volver
        </Link>
      </div>
      <CalendarContainer />
    </div>
  );
}
