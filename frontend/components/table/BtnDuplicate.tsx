"use client";

import { duplicateProject } from "@utils/api";
import Swal from "sweetalert2";

export default function BtnDuplicate({ id }: { id: string }) {
  const handleDuplicate = async () => {
    try {
      await duplicateProject(id);
      Swal.fire({
        icon: "success",
        title: "Proyecto duplicado",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        location.reload();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al duplicar el proyecto",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return <button onClick={handleDuplicate}>Duplicar</button>;
}
