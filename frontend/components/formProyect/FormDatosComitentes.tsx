"use client";

import { useForm } from "@context/FormContext";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Fragment, useState } from "react";

type Comitente = {
  nombre: string;
  cuit: string;
  direccion: string;
  contacto: string;
};

export default function FormDatosComitentes() {
  const { formData, updateField, deleteComitente } = useForm();

  const [cantComitentes, setCantComitentes] = useState(
    formData?.datosComitentes?.length || 1
  );

  const onUpdate = (value: number | string, label: string) => {
    updateField(label, value);
  };

  const onDelete = () => {
    setCantComitentes(cantComitentes - 1);
    deleteComitente(cantComitentes - 1);
  };

  const comitentes = [
    {
      value: "nombre",
      label: "Nombre",
    },
    {
      value: "cuit",
      label: "CUIT",
    },
    {
      value: "direccion",
      label: "Dirección",
    },
    {
      value: "contacto",
      label: "Contacto",
    },
  ];

  return (
    <div className="dark:bg-opacity-10 bg-white shadow-small rounded-lg w-full h-max px-4 py-4 flex flex-col md:grid  md:grid-cols-4 gap-4">
      <header className="col-span-4">
        <h3 className="text-lg font-semibold">Datos de los Comitentes</h3>
      </header>
      {Array.from({ length: cantComitentes }).map((_, index) => (
        <Fragment key={`${index}-fragment`}>
          {comitentes.map(({ label, value }) => (
            <Input
              key={`${index}-${value}-${label}`}
              label={`${label} Comitente ${index + 1}`}
              labelPlacement="inside"
              isDisabled={formData?.estado === "completado"}
              required
              value={
                (formData?.datosComitentes &&
                  formData?.datosComitentes[index] &&
                  formData?.datosComitentes[index]?.[
                    value as keyof Comitente
                  ]) ||
                ""
              }
              onChange={(e) =>
                onUpdate(e.target.value, `datosComitentes-${value}-${index}`)
              }
            />
          ))}
        </Fragment>
      ))}
      <div className="col-start-4 flex items-center justify-end gap-x-4">
        <Button
          color="danger"
          variant="ghost"
          onClick={onDelete}
          isDisabled={cantComitentes === 1 || formData?.estado === "completado"}
          className={cantComitentes === 1 ? "hidden" : ""}
        >
          Quitar comitente
        </Button>
        <Button
          isDisabled={formData?.estado === "completado"}
          color="primary"
          onClick={() => setCantComitentes(cantComitentes + 1)}
        >
          Agregar comitente
        </Button>
      </div>
    </div>
  );
}
