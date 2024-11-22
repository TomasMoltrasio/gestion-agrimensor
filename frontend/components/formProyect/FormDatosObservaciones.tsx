"use client";

import { useForm } from "@context/FormContext";
import { Textarea, DatePicker } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { observaciones } from "@utils/data";
import { parseDate } from "@internationalized/date";
import { ProyectoObservaciones } from "@tipos/index";

export default function FormDatosObservaciones() {
  const { formData, updateField } = useForm();

  const onUpdate = (value: number | string, label: string) => {
    updateField(label, value);
  };

  return (
    <div className="dark:bg-opacity-10 bg-white shadow-small rounded-lg w-full h-max px-4 py-4 flex flex-col gap-4">
      <div className="">
        <h3 className="text-lg font-semibold">Seguimiento del Proyecto</h3>
      </div>
      {observaciones.map(({ value, label }) => (
        <div
          key={`${value}-datosObservaciones`}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
        >
          <span className="text-base font-medium">{label}</span>
          <I18nProvider locale="es-AR">
            <DatePicker
              label="Fecha de Inicio"
              isDisabled={formData?.estado === "completado"}
              value={
                formData?.[value as keyof ProyectoObservaciones]?.fechaInicio
                  ? parseDate(
                      (formData[value as keyof ProyectoObservaciones] as any)
                        ?.fechaInicio
                    )
                  : undefined
              }
              onChange={(date) =>
                onUpdate(date?.toString(), `${value}.fechaInicio`)
              }
            />
          </I18nProvider>
          <I18nProvider locale="es-AR">
            <DatePicker
              label="Fecha de Aviso"
              isDisabled={formData?.estado === "completado"}
              value={
                formData?.[value as keyof ProyectoObservaciones]?.fechaAviso
                  ? parseDate(
                      (formData[value as keyof ProyectoObservaciones] as any)
                        ?.fechaAviso
                    )
                  : undefined
              }
              onChange={(date) =>
                onUpdate(date?.toString(), `${value}.fechaAviso`)
              }
            />
          </I18nProvider>
          <Textarea
            label="Observaciones"
            minRows={1}
            isDisabled={formData?.estado === "completado"}
            value={
              (formData?.[value as keyof ProyectoObservaciones] as any)
                ?.observaciones || ""
            }
            onChange={(e) => onUpdate(e.target.value, `${value}.observaciones`)}
          />
        </div>
      ))}
    </div>
  );
}
