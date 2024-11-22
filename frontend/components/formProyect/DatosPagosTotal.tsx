"use client";

import { useEffect, useState } from "react";

type Pago = {
  fecha: string;
  monto: string;
  moneda: "USD" | "ARS";
};

export default function DatosPagosTotal({
  pagos,
  presupuesto,
}: {
  pagos: Pago[] | undefined;
  presupuesto:
    | {
        total: number;
        moneda: "USD" | "ARS";
      }
    | undefined;
}) {
  const [dolarOficial, setDolarOficial] = useState<number>(0);

  useEffect(() => {
    fetch("https://dolarapi.com/v1/dolares/oficial")
      .then((res) => res.json())
      .then((data) => {
        setDolarOficial(data.venta);
      });
  }, []);

  const getTotalPagos = (): string => {
    if (!pagos) return "0";

    let total = pagos.reduce((acc, pago) => {
      const monto = parseInt(pago.monto) || 0;
      return pago.moneda === "USD" ? acc + monto * dolarOficial : acc + monto;
    }, 0);

    return new Intl.NumberFormat("es-AR").format(total);
  };

  const getTotalPresupuesto = (): string => {
    if (!presupuesto) return "0";

    let total =
      presupuesto.moneda === "USD"
        ? presupuesto.total * dolarOficial
        : presupuesto.total;

    return new Intl.NumberFormat("es-AR").format(total);
  };

  const showPagos = [
    {
      label: "Cotizacion Dolar Oficial",
      value: dolarOficial,
    },
    {
      label: "Total Pagos",
      value: pagos && getTotalPagos(),
    },
    {
      label: "Presupuesto Total en pesos",
      value: pagos && getTotalPresupuesto(),
    },
  ];

  return (
    <div
      className={`col-span-1 flex flex-col md:flex-row justify-center mt-4 md:mt-0 items-center bg-default-100 rounded-lg gap-y-4 md:gap-y-0 md:gap-x-8 h-full py-4 md:py-0`}
    >
      {showPagos.map((item, index) => (
        <div
          key={`${index}-pagos`}
          className={`flex flex-col gap-y-2 justify-start items-center`}
        >
          <h3 className="text-base font-semibold opacity-70">{item.label}</h3>
          <p className="text-xl font-semibold">${item.value}</p>
        </div>
      ))}
    </div>
  );
}
