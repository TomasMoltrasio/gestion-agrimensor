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
