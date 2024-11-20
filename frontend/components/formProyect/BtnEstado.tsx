"use client";

import { Button } from "@nextui-org/button";
import { useForm } from "@context/FormContext";

export default function BtnEstado({ id }: { id?: string }) {
  const { formData, updateEstado, isLoading } = useForm();

  return (
    <Button
      isLoading={isLoading}
      color={
        formData?.estado && formData?.estado === "en curso"
          ? "success"
          : "primary"
      }
      onClick={() => {
        if (id && formData?.estado && formData?.estado === "en curso") {
          updateEstado("completado", id);
        } else if (id) {
          updateEstado("en curso", id);
        }
      }}
    >
      {formData?.estado && formData?.estado === "en curso"
        ? "Finalizar"
        : "Reabrir"}
    </Button>
  );
}
