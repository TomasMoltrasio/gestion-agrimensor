"use client";

import FormDatosCatastrales from "@components/formProyect/FormDatosCatastrales";
import FormDatosComitentes from "@components/formProyect/FormDatosComitentes";
import FormDatosObservaciones from "@components/formProyect/FormDatosObservaciones";
import FormDatosProyecto from "@components/formProyect/FormDatosProyecto";
import BtnReset from "./BtnReset";
import BtnSave from "./BtnSave";
import { useForm } from "@context/FormContext";

export default function FormContainerVacio() {
  const { isLoading } = useForm();

  return (
    <form
      action={() => {
        alert("Formulario enviado");
      }}
      className="mt-4 w-full flex flex-col gap-y-8"
    >
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <FormDatosProyecto />
          <FormDatosComitentes />
          <FormDatosCatastrales />
          <FormDatosObservaciones />
          <div className="flex justify-end gap-x-4">
            <BtnReset />
            <BtnSave />
          </div>
        </>
      )}
    </form>
  );
}
