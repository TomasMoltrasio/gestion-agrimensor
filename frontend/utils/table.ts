import { ChipProps } from "@nextui-org/react";

export const statusColorMap: Record<string, ChipProps["color"]> = {
  "en curso": "primary",
  completado: "success",
};

export const priorityColorMap: Record<string, ChipProps["color"]> = {
  1: "danger",
  2: "default",
  3: "warning",
  4: "primary",
};

export const priorityOptions = [
  { name: "Alta", uid: 1 },
  { name: "Cobrar", uid: 2 },
  { name: "Media", uid: 3 },
  { name: "Baja", uid: 4 },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "nombre",
  "prioridad",
  "partido",
  "partida",
  "propietario",
  "detalle",
  "acciones",
];
