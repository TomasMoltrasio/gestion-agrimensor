"use client";

import { Input, Select, SelectItem } from "@nextui-org/react";
import { useForm } from "@context/FormContext";

export default function FormDatosProyecto() {
  const profesionales = [
    { label: "Tomás Portales", value: "Tomás Portales" },
    { label: "Mariana López", value: "Mariana López" },
  ];

  const tiposTrabajo = [
    { label: "Mensura", value: "mensura" },
    { label: "Ph", value: "ph" },
    { label: "Cep", value: "cep" },
    { label: "Amojonamiento", value: "amojonamiento" },
    { label: "Relevamiento", value: "relevamiento" },
    { label: "947", value: "947" },
  ];

  const prioridades = [
    { label: "Alta", value: 1 },
    { label: "Media", value: 2 },
    { label: "Baja", value: 3 },
  ];

  const { formData, updateField } = useForm();

  const onUpdate = (value: number | string, label: string) => {
    updateField(label, value);
  };

  return (
    <div className="dark:bg-opacity-10 bg-white shadow-small rounded-lg w-full h-max px-4 py-4 flex flex-col md:grid md:grid-cols-2 gap-4">
      <header className="col-span-2 ">
        <h3 className="text-lg font-semibold">Datos del Proyecto</h3>
      </header>
      <Input
        label="Nombre"
        labelPlacement="inside"
        required
        value={formData?.nombre || ""}
        onChange={(e) => onUpdate(e.target.value, "nombre")}
        isDisabled={formData?.estado === "completado"}
      />
      <Input
        label="Dirección"
        labelPlacement="inside"
        required
        value={formData?.direccion || ""}
        onChange={(e) => onUpdate(e.target.value, "direccion")}
        isDisabled={formData?.estado === "completado"}
      />
      <Select
        label="Profesional"
        labelPlacement="inside"
        isDisabled={formData?.estado === "completado"}
        required
        defaultSelectedKeys={
          formData?.profesional && [`${formData?.profesional}`]
        }
        value={formData?.profesional || ""}
        onChange={(e) => onUpdate(e.target.value, "profesional")}
      >
        {profesionales.map((profesional) => (
          <SelectItem key={profesional.value} value={profesional.value}>
            {profesional.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Tipo de Trabajo"
        isDisabled={formData?.estado === "completado"}
        labelPlacement="inside"
        defaultSelectedKeys={
          formData?.tipoTrabajo && [`${formData?.tipoTrabajo}`]
        }
        value={formData?.tipoTrabajo || ""}
        onChange={(e) => onUpdate(e.target.value, "tipoTrabajo")}
      >
        {tiposTrabajo.map((tipo) => (
          <SelectItem key={tipo.value} value={tipo.value}>
            {tipo.label}
          </SelectItem>
        ))}
      </Select>
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Prioridad"
          isDisabled={formData?.estado === "completado"}
          labelPlacement="inside"
          required
          defaultSelectedKeys={
            formData?.prioridad && [`${formData?.prioridad}`]
          }
          value={formData?.prioridad || ""}
          onChange={(e) => onUpdate(e.target.value, "prioridad")}
        >
          {prioridades.map((prioridad) => (
            <SelectItem key={prioridad.value} value={prioridad.value}>
              {prioridad.label}
            </SelectItem>
          ))}
        </Select>
        <Input
          label="Presupuesto"
          placeholder="0.00"
          isDisabled={formData?.estado === "completado"}
          labelPlacement="inside"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
          endContent={
            <div className="flex items-center">
              <label className="sr-only" htmlFor="currency">
                Currency
              </label>
              <select
                value={formData?.presupuesto?.moneda || "USD"}
                onChange={(e) => onUpdate(e.target.value, "presupuesto.moneda")}
                className="outline-none border-0 bg-transparent text-default-400 text-small"
                id="currency"
                name="currency"
              >
                <option>USD</option>
                <option>ARS</option>
              </select>
            </div>
          }
          type="number"
          value={formData?.presupuesto?.total?.toString() || ""}
          onChange={(e) => onUpdate(e.target.value, "presupuesto.total")}
        />
      </div>
      <Input
        label="Archivos iCloud"
        isDisabled={formData?.estado === "completado"}
        labelPlacement="inside"
        value={formData?.archivosIcloud || ""}
        onChange={(e) => onUpdate(e.target.value, "archivosIcloud")}
      />
    </div>
  );
}
