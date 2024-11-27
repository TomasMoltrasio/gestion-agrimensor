"use client";

import { useForm } from "@context/FormContext";
import { parseDate } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { DatePicker } from "@nextui-org/react";
import { Fragment, useState } from "react";
import DatosPagosTotal from "./DatosPagosTotal";
import DolarOficial from "./DolarOficial";
import BtnExportarPagos from "./BtnExportarPagos";

type Pago = {
  fecha: string;
  pesos: string;
  dolares: string;
  tipoCambio: string;
};

export default function FormDatosPagos() {
  const { formData, updateField, deletePago } = useForm();

  const [cantPagos, setCantPagos] = useState(formData?.pagos?.length || 1);

  const onUpdate = (value: number | string, label: string) => {
    updateField(label, value);
  };

  const onDelete = () => {
    setCantPagos(cantPagos - 1);
    deletePago(cantPagos - 1);
  };

  return (
    <div className="dark:bg-opacity-10 bg-white shadow-small rounded-lg w-full h-max px-4 py-4 flex flex-col">
      <header className="mb-4 flex flex-col justify-start items-start md:flex-row md:justify-between md:items-center">
        <h3 className="text-lg font-semibold">Pagos realizados </h3>
        <div className="flex flex-col-reverse items-end gap-y-1 md:gap-y-0 md:flex-row md:items-center gap-x-4">
          <DolarOficial presupuesto={formData?.presupuesto} />
          <BtnExportarPagos id={formData?.id?.toString()} />
        </div>
      </header>
      <div className="col-span-1 flex flex-col h-max md:grid md:grid-cols-4 gap-4 w-full">
        {Array.from({ length: cantPagos }).map((_, index) => (
          <Fragment key={`${index}-fragment`}>
            <DatePicker
              label={`Fecha de Pago ${index + 1}`}
              value={
                formData?.pagos?.[index]?.fecha
                  ? parseDate(formData.pagos[index].fecha)
                  : undefined
              }
              isDisabled={formData?.estado === "completado"}
              onChange={(date) =>
                onUpdate(date?.toString(), `pagos-${index}-fecha`)
              }
            />
            <Input
              label={`Pesos de Pago ${index + 1}`}
              type="string"
              value={formData?.pagos?.[index]?.pesos}
              isDisabled={formData?.estado === "completado"}
              onChange={(e) => onUpdate(e.target.value, `pagos-${index}-pesos`)}
            />
            <Input
              label={`Cambio de Pago ${index + 1}`}
              type="string"
              value={formData?.pagos?.[index]?.tipoCambio}
              isDisabled={formData?.estado === "completado"}
              onChange={(e) =>
                onUpdate(e.target.value, `pagos-${index}-tipoCambio`)
              }
            />
            <Input
              label={`Dólares de Pago ${index + 1}`}
              type="string"
              value={formData?.pagos?.[index]?.dolares}
              isDisabled={formData?.estado === "completado"}
              onChange={(e) =>
                onUpdate(e.target.value, `pagos-${index}-dolares`)
              }
            />
          </Fragment>
        ))}
        <DatosPagosTotal
          pagos={formData?.pagos}
          presupuesto={formData?.presupuesto}
        />
        <div className="col-start-1 col-span-2 md:col-span-1 md:col-start-4 flex items-center justify-end gap-x-4">
          <Button
            color="danger"
            variant="ghost"
            onClick={onDelete}
            isDisabled={cantPagos === 1 || formData?.estado === "completado"}
            className={cantPagos === 1 ? "hidden" : ""}
          >
            Quitar pago
          </Button>
          <Button
            isDisabled={formData?.estado === "completado"}
            color="primary"
            onClick={() => setCantPagos(cantPagos + 1)}
          >
            Agregar pago
          </Button>
        </div>
      </div>
    </div>
  );
}
