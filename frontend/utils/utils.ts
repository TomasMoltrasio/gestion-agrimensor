import Swal from "sweetalert2";
import { duplicateProject } from "@utils/api";

export function capitalize(str: any) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const handleDuplicate = async (id: string) => {
  try {
    await duplicateProject(id);
    Swal.fire({
      icon: "success",
      title: "Proyecto duplicado",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      location.replace("/");
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
