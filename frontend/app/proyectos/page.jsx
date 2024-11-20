import FormContainer from "@components/formProyect/FormContainer";
import { BackIcon } from "@components/icons/BackIcon";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Link href={"/"} className="inline-flex gap-x-2 items-center">
          <BackIcon />
          Volver
        </Link>
        <h2 className="text-xl opacity-70">Crear nuevo proyecto</h2>
        <span></span>
      </div>
      <FormContainer />
    </div>
  );
}
