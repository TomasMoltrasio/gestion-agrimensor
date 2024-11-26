"use client";

import { useEffect, useState } from "react";

export default function DolarOficial({
  presupuesto,
}: {
  presupuesto: { total: number; moneda: "USD" | "ARS" } | undefined;
}) {
  const [dolarOficial, setDolarOficial] = useState<number>(0);

  useEffect(() => {
    fetch("https://dolarapi.com/v1/dolares/oficial")
      .then((res) => res.json())
      .then((data) => {
        setDolarOficial(data.venta);
      });
  }, []);

  const getTotalPresupuesto = (): string => {
    if (!presupuesto) return "0";

    let total =
      presupuesto.moneda === "USD"
        ? presupuesto.total
        : presupuesto.total / dolarOficial;

    return new Intl.NumberFormat("es-AR").format(total);
  };

  return (
    <div className="flex  gap-x-4 items-center">
      <div className="flex flex-col md:flex-row gap-y-1 md:gap-y-0 md:gap-x-1 items-center">
        <span className="text-sm opacity-70">
          Presupuesto total en dólares:
        </span>
        <span className="text-base font-semibold">
          ${getTotalPresupuesto()}
        </span>
      </div>
      <div className="flex flex-col md:flex-row gap-y-1 md:gap-y-0 md:gap-x-1 items-center">
        <span className="text-sm opacity-70">Dolar Oficial:</span>
        <span className="text-base font-semibold">${dolarOficial}</span>
      </div>
    </div>
  );
}
