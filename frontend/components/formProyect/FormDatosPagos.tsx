"use client";

import { useForm } from "@context/FormContext";
import { parseDate } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { DatePicker } from "@nextui-org/react";
import { Fragment, useState } from "react";

type Pago = {
  fecha: string;
  monto: string;
  moneda: "USD" | "ARS";
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
    <div className="dark:bg-opacity-10 bg-white shadow-small rounded-lg w-full h-max px-4 py-4 flex flex-col md:grid  md:grid-cols-4 gap-4">
      <header className="col-span-4">
        <h3 className="text-lg font-semibold">Pagos realizados</h3>
      </header>
      {Array.from({ length: cantPagos }).map((_, index) => (
        <div
          key={`${index}-fragment`}
          className="col-span-2 col-start-1 grid grid-cols-2 gap-4"
        >
          <DatePicker
            label={`Fecha de Pago ${index + 1}`}
            value={
              formData?.pagos?.[index]?.fecha
                ? parseDate(formData.pagos[index].fecha)
                : undefined
            }
            onChange={(date) =>
              onUpdate(date?.toString(), `pagos-${index}-fecha`)
            }
          />
          <Input
            label={`Monto de Pago ${index + 1}`}
            placeholder="0.00"
            isDisabled={formData?.estado === "completado"}
            labelPlacement="inside"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            endContent={
              <div className="flex items-center">
                <label className="sr-only" htmlFor="currency">
                  Currency
                </label>
                <select
                  value={formData?.pagos?.[index]?.moneda || "USD"}
                  onChange={(e) =>
                    onUpdate(e.target.value, `pagos-${index}-moneda`)
                  }
                  className="outline-none border-0 bg-transparent text-default-400 text-small"
                  id="currency"
                  name="currency"
                >
                  <option>USD</option>
                  <option>ARS</option>
                </select>
              </div>
            }
            type="number"
            value={formData?.pagos?.[index]?.monto || ""}
            onChange={(e) => onUpdate(e.target.value, `pagos-${index}-monto`)}
          />
        </div>
      ))}
      <div className="col-span-2 col-start-3 bg-red-600 h-full"></div>

      <div className="col-start-2 flex items-center justify-end gap-x-4">
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
  );
}
