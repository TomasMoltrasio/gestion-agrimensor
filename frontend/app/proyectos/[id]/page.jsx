import BtnEstado from "@components/formProyect/BtnEstado";
import BtnPDF from "@components/formProyect/BtnPDF";
import FormContainer from "@components/formProyect/FormContainer";
import { BackIcon } from "@components/icons/BackIcon";
import Link from "next/link";

export default function Page({ params }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Link href={"/"} className="inline-flex gap-x-2 items-center">
          <BackIcon />
          Volver
        </Link>
        <h2 className="text-xl opacity-70">Proyecto {params.id}</h2>
        <div className="flex gap-x-4 items-center">
          <BtnPDF id={params.id} />
          <BtnEstado id={params.id} />
        </div>
      </div>
      <FormContainer id={params.id} />
    </div>
  );
}
