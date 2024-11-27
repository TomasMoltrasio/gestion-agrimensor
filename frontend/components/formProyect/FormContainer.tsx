"use client";

import FormDatosCatastrales from "@components/formProyect/FormDatosCatastrales";
import FormDatosComitentes from "@components/formProyect/FormDatosComitentes";
import FormDatosObservaciones from "@components/formProyect/FormDatosObservaciones";
import FormDatosProyecto from "@components/formProyect/FormDatosProyecto";
import BtnReset from "@components/formProyect/BtnReset";
import BtnSave from "@components/formProyect/BtnSave";
import { useForm } from "@context/FormContext";
import { useEffect } from "react";
import FormContainerSkeleton from "@components/formProyect/FormContainerSkeleton";
import FormDatosPagos from "@components/formProyect/FormDatosPagos";
import BtnEstado from "@components/formProyect/BtnEstado";
import BtnDuplicar from "@components/formProyect/BtnDuplicar";

export default function FormContainer({ id }: { id?: string }) {
  const { loadProject, isLoading, resetFormData, formData } = useForm();

  useEffect(() => {
    if (id) {
      loadProject(id);
    } else {
      formData !== null && resetFormData();
    }
  }, [id]);

  return (
    <form
      action={() => {
        alert("Formulario enviado");
      }}
      className="mt-4 w-full flex flex-col gap-y-8"
    >
      {isLoading ? (
        <FormContainerSkeleton />
      ) : (
        <>
          <FormDatosProyecto />
          <FormDatosComitentes />
          <FormDatosCatastrales />
          <FormDatosPagos />
          <FormDatosObservaciones />
          <div className="flex justify-end items-center gap-x-2 mb-20 md:mb-0 ">
            <BtnDuplicar id={id} />
            <BtnEstado id={id} />
          </div>
          <div className="flex md:flex-col justify-start gap-x-4 md:gap-x-0 md:gap-y-4 fixed bottom-4 left-4 z-10">
            <BtnReset />
          </div>
          <div className="flex md:flex-col justify-end gap-x-4 md:gap-x-0 md:gap-y-4 fixed bottom-4 right-4 z-10">
            <BtnSave />
          </div>
        </>
      )}
    </form>
  );
}
