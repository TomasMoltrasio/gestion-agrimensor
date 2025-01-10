"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { updateActiveAlerta } from "@utils/api";

interface Alerta {
  id: number;
  mensaje: string;
  fecha: string;
  activa: boolean;
}

interface AlertaComponentProps {
  alerta: Alerta;
  onAlertaUpdate: (id: number) => void;
}

export default function AlertaComponent({
  alerta,
  onAlertaUpdate,
}: AlertaComponentProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const router = useRouter();

  const handleView = async () => {
    const updatedAlerta = await updateActiveAlerta(alerta.id);
    if (!updatedAlerta) return;
    setIsVisible(false);
    onAlertaUpdate(alerta.id); // Actualizar el estado en AlertContainer
    router.push(`/proyectos/${alerta.id}`);
  };

  return (
    <>
      {isVisible ? (
        <div className="dark:bg-blue-900/90 bg-white border-l-4 border-blue-400 p-4 shadow-lg rounded-lg relative">
          <div className="flex items-center justify-between">
            <p className="dark:text-white text-slate-900">{alerta.mensaje}</p>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Button
              className="bg-background dark:text-white text-slate-900 font-medium border-1 shadow-small"
              size="sm"
              variant="bordered"
              onClick={handleView}
            >
              Ir al proyecto
            </Button>
            <Button
              className="dark:text-white text-slate-900 font-medium underline underline-offset-4"
              size="sm"
              variant="light"
              onClick={() => setIsVisible(false)}
            >
              Recordarme después
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
