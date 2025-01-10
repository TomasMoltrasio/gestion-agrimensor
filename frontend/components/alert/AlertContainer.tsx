"use client";

import { useState, useEffect } from "react";
import AlertComponent from "./Alerta";
import { getAlertas } from "@utils/api";

interface Alerta {
  id: number;
  mensaje: string;
  fecha: string;
  activa: boolean;
}

export default function AlertContainer() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);

  // Obtener alertas al cargar el componente
  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const alertasData = await getAlertas();
        setAlertas(alertasData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlertas();
  }, []);

  const handleAlertaUpdate = (alertaId: number) => {
    setAlertas((prevAlertas) =>
      prevAlertas.map((alerta) =>
        alerta.id === alertaId ? { ...alerta, activa: false } : alerta
      )
    );
  };

  return (
    <section className="flex flex-col absolute right-4 bottom-4 gap-y-4 z-50">
      {alertas.map((alerta) => (
        <AlertComponent
          key={alerta.id}
          alerta={alerta}
          onAlertaUpdate={handleAlertaUpdate} // Pasar la función para actualizar el estado
        />
      ))}
    </section>
  );
}
