// context/FormContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Proyecto as Project, ProyectoTable } from "@tipos/index";
import { URL_BASE } from "@utils/api";
import Swal from "sweetalert2";

interface FormContextType {
  formData: Project | null;
  initialData: Project | null;
  updateField: (field: string, value: any) => void;
  loadProject: (projectId: string) => Promise<void>;
  saveProject: (projectId?: string) => Promise<void>;
  resetForm: () => void;
  resetFormData: () => void;
  isModified: boolean;
  validateForm: () => boolean;
  validationErrors: string[];
  isLoading: boolean;
  updateEstado: (value: string, id: string) => void;
  deleteComitente: (index: number) => void;
  deletePago: (index: number) => void;
  loadAllProjects: () => Promise<void>;
  Projects: ProyectoTable[];
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<Project | null>(null);
  const [Projects, setProjects] = useState<ProyectoTable[]>([]); // Agregar el estado para almacenar los proyectos
  const [initialData, setInitialData] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const router = useRouter();

  const isModified = JSON.stringify(formData) !== JSON.stringify(initialData);

  const requiredFields: (keyof Project)[] = ["nombre"]; // Campos obligatorios agregar los necesarios

  const validateForm = (): boolean => {
    if (!formData) return false;
    const errors = requiredFields.filter((field) => !formData[field]);
    setValidationErrors(
      errors.map((field) => `El campo ${field} es obligatorio`)
    );
    return errors.length === 0;
  };

  const loadAllProjects = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(URL_BASE);
      if (!response.ok) {
        throw new Error("Error al cargar los proyectos");
      }
      const data: ProyectoTable[] = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error cargando los proyectos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadProject = async (projectId: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${URL_BASE}/${projectId}`);
      if (!response.ok) {
        throw new Error("Error al cargar el proyecto");
      }
      const data: Project = await response.json();
      setFormData({ ...data }); // Cargar los datos del proyecto
      setInitialData({ ...data }); // Guardar el estado inicial
    } catch (error) {
      console.error("Error cargando el proyecto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProject = async (projectId?: string): Promise<void> => {
    if (!validateForm()) {
      // alert("Por favor completa todos los campos obligatorios");
      Swal.fire({
        title: "¡Atención!",
        text: "Por favor completa todos los campos obligatorios",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    setIsLoading(true);
    const options = {
      urlBase: projectId ? `${URL_BASE}/${projectId}` : URL_BASE,
      method: projectId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    try {
      const response = await fetch(options.urlBase, {
        method: options.method,
        headers: options.headers,
        body: options.body,
      });
      if (!response.ok) {
        throw new Error("Error al guardar el proyecto");
      }
      // alert("Proyecto guardado exitosamente");
      Swal.fire({
        title: "¡Éxito!",
        text: "Proyecto guardado exitosamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        setInitialData(formData); // Actualizar estado inicial al guardar
        router.push("/");
      });
    } catch (error) {
      console.error("Error guardando el proyecto:", error);
      // alert("Hubo un error al guardar el proyecto");
      Swal.fire({
        title: "¡Error!",
        text: "Hubo un error al guardar el proyecto",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = (): void => {
    Swal.fire({
      title: "¡Atención!",
      text: "¿Estás seguro que deseas resetear el formulario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData(initialData); // Restaurar el estado inicial
        setValidationErrors([]); // Limpiar errores de validación
      }
    });
  };

  const resetFormData = (): void => {
    setFormData(null);
    setInitialData(null);
    setValidationErrors([]);
    window.location.reload();
  };

  const updateField = (field: string, value: any): void => {
    field.includes(".")
      ? setFormData((prev: any) => {
          const [parentField, childField] = field.split(".");

          if (!prev) return { [parentField]: { [childField]: value } };
          return {
            ...prev,
            [parentField]: {
              ...prev[parentField],
              [childField]: value,
            },
          };
        })
      : field.includes("datosComitentes")
        ? setFormData((prev: any) => {
            const [parentField, childField, index] = field.split("-");
            const indexNum = parseInt(index, 10);
            if (!prev) return { [parentField]: [{ [childField]: value }] };
            if (prev && !prev[parentField])
              return { ...prev, [parentField]: [{ [childField]: value }] };

            // Asegurarnos de que el array tenga la longitud suficiente
            let updatedArray = [...prev[parentField]];
            while (updatedArray.length <= indexNum) {
              updatedArray.push({});
            }

            // Actualizar el elemento del array en el índice correspondiente
            updatedArray[indexNum] = {
              ...updatedArray[indexNum],
              [childField]: value,
            };

            return {
              ...prev,
              [parentField]: updatedArray,
            };
          })
        : field.includes("pagos")
          ? setFormData((prev: any) => {
              const [parentField, index, childField] = field.split("-");
              const indexNum = parseInt(index, 10);
              if (!prev) return { [parentField]: [{ [childField]: value }] };
              if (prev && !prev[parentField])
                return { ...prev, [parentField]: [{ [childField]: value }] };

              // Asegurarnos de que el array tenga la longitud suficiente
              let updatedArray = [...prev[parentField]];
              while (updatedArray.length <= indexNum) {
                updatedArray.push({});
              }

              // Actualizar el elemento del array en el índice correspondiente
              updatedArray[indexNum] = {
                ...updatedArray[indexNum],
                [childField]: value,
              };

              return {
                ...prev,
                [parentField]: updatedArray,
              };
            }) // Actualizar el campo directamente
          : setFormData((prev) =>
              prev
                ? { ...prev, [field]: value }
                : ({ [field]: value } as Project)
            );
  };

  const updateEstado = (value: string, id: string): void => {
    updateField("estado", value);
    if (!validateForm()) {
      // alert("Por favor completa todos los campos obligatorios");
      Swal.fire({
        title: "¡Atención!",
        text: "Por favor completa todos los campos obligatorios",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    setIsLoading(true);
    const options = {
      urlBase: `${URL_BASE}/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData
        ? JSON.stringify({
            ...formData,
            estado: value,
          })
        : JSON.stringify({ estado: value }),
    };
    fetch(options.urlBase, {
      method: options.method,
      headers: options.headers,
      body: options.body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al guardar el proyecto");
        }
        // alert("Estado del proyecto actualizado exitosamente");
        Swal.fire({
          title: "¡Éxito!",
          text: "Estado del proyecto actualizado exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        setInitialData(formData); // Actualizar estado inicial al guardar
      })
      .catch((error) => {
        console.error("Error guardando el proyecto:", error);
        // alert("Hubo un error al guardar el proyecto");
        Swal.fire({
          title: "¡Error!",
          text: "Hubo un error al guardar el proyecto",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteComitente = (index: number): void => {
    setFormData((prev: any) => {
      if (!prev) return;
      const updatedArray = prev.datosComitentes?.filter(
        (_: any, i: number) => i !== index
      );
      return {
        ...prev,
        datosComitentes: updatedArray,
      };
    });
  };

  const deletePago = (index: number): void => {
    setFormData((prev: any) => {
      if (!prev) return;
      const updatedArray = prev.pagos?.filter(
        (_: any, i: number) => i !== index
      );
      return {
        ...prev,
        pagos: updatedArray,
      };
    });
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        initialData,
        updateField,
        loadProject,
        saveProject,
        resetForm,
        isModified,
        validateForm,
        validationErrors,
        isLoading,
        deleteComitente,
        deletePago,
        updateEstado,
        resetFormData,
        loadAllProjects,
        Projects,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm debe usarse dentro de FormProvider");
  }
  return context;
};
