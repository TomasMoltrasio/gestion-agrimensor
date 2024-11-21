"use client";

import { useForm } from "@context/FormContext";
import { Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { partidos } from "@utils/partidos";

export default function FormDatosCatastrales() {
  const { formData, updateField } = useForm();

  type DatosCatastralesKeys =
    | "partida"
    | "circunscripcion"
    | "seccion"
    | "chacra"
    | "quinta"
    | "fraccion"
    | "manzana"
    | "parcela"
    | "subParcela";

  const data: { label: string; value: DatosCatastralesKeys }[] = [
    {
      label: "Partida",
      value: "partida",
    },
    {
      label: "Circunscripción",
      value: "circunscripcion",
    },
    {
      label: "Sección",
      value: "seccion",
    },
    {
      label: "Chacra",
      value: "chacra",
    },
    {
      label: "Quinta",
      value: "quinta",
    },
    {
      label: "Fracción",
      value: "fraccion",
    },
    {
      label: "Manzana",
      value: "manzana",
    },
    {
      label: "Parcela",
      value: "parcela",
    },
    {
      label: "Sub Parcela",
      value: "subParcela",
    },
  ];

  const onUpdate = (value: number | string, label: string) => {
    updateField(label, value);
  };

  return (
    <div className="dark:bg-opacity-10 bg-white shadow-small rounded-lg w-full h-max px-4 py-4 grid grid-cols-4 gap-4">
      <div className="col-span-4">
        <h3 className="text-lg font-semibold">Datos Catastrales</h3>
      </div>
      <Autocomplete
        label="Partido"
        labelPlacement="inside"
        defaultItems={partidos}
        required
        className="col-span-2"
        isDisabled={formData?.estado === "completado"}
        defaultInputValue={
          formData?.datosCatastrales?.partido
            ? partidos.find((p) => p.id === formData.datosCatastrales.partido)
                ?.name
            : ""
        }
        selectedKey={
          formData?.datosCatastrales ? formData.datosCatastrales.partido : ""
        }
        onSelectionChange={(value) =>
          value && onUpdate(value, "datosCatastrales.partido")
        }
      >
        {(item) => (
          <AutocompleteItem key={item.id} startContent={`${item.id} - `}>
            {item.name}
          </AutocompleteItem>
        )}
      </Autocomplete>
      {data.map((item) => (
        <Input
          key={`${item.value} - datosCatastrales`}
          className="col-span-2"
          label={item.label}
          required={item.label === "Partida"}
          isDisabled={formData?.estado === "completado"}
          value={
            formData?.datosCatastrales
              ? formData.datosCatastrales[item.value]
              : ""
          }
          onChange={(e) =>
            onUpdate(e.target.value, `datosCatastrales.${item.value}`)
          }
        />
      ))}
    </div>
  );
}
