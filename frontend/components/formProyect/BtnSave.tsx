"use client";

import { Button } from "@nextui-org/button";
import { useForm } from "@context/FormContext";
import { useParams } from "next/navigation";

export default function BtnSave() {
  const { saveProject, formData, isModified } = useForm();

  const { id } = useParams();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    id ? saveProject(id as string) : saveProject();
  };

  return (
    <Button
      onClick={(e) => handleSubmit(e)}
      disabled={
        (formData?.estado && formData?.estado === "completado") || !isModified
      }
      type="submit"
      color="primary"
      variant="solid"
      className="disabled:opacity-0 disabled:hover:opacity-0"
      size="lg"
    >
      Guardar
    </Button>
  );
}
