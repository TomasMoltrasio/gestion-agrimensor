"use client";

type Pago = {
  fecha: string;
  pesos: string;
  dolares: string;
  tipoCambio: string;
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
  const getTotalPagos = (): string => {
    if (!pagos) return "0";

    let total = pagos.reduce((acc, pago) => {
      const monto =
        presupuesto?.moneda === "USD"
          ? parseInt(pago.dolares)
          : parseInt(pago.pesos);
      return monto ? acc + monto : acc;
    }, 0);

    return new Intl.NumberFormat("es-AR").format(total);
  };

  const getRestante = (): string => {
    if (!pagos || !presupuesto) return "0";

    let totalPagos = pagos.reduce((acc, pago) => {
      let monto =
        presupuesto.moneda === "USD"
          ? parseInt(pago.dolares)
          : parseInt(pago.pesos);
      return monto ? acc + monto : acc;
    }, 0);

    let totalPresupuesto = presupuesto.total;

    return new Intl.NumberFormat("es-AR").format(totalPresupuesto - totalPagos);
  };

  const showPagos = [
    {
      label: "Total Pagos",
      value: pagos && getTotalPagos(),
    },
    {
      label: "Restante",
      value: pagos && getRestante(),
    },
  ];

  return (
    <div className="col-span-4 flex justify-end gap-x-8 items-center">
      {showPagos.map((pago, index) => (
        <div key={index} className="flex flex-col items-end justify-center">
          <span className="font-semibold">{pago.label}</span>
          <span>${pago.value}</span>
        </div>
      ))}
    </div>
  );
}
