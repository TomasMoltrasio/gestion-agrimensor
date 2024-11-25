import { ChipProps } from "@nextui-org/react";

export const statusColorMap: Record<string, ChipProps["color"]> = {
  "en curso": "primary",
  completado: "success",
};

export const priorityColorMap: Record<string, ChipProps["color"]> = {
  1: "danger",
  2: "warning",
  3: "primary",
};

export const priorityOptions = [
  { name: "Alta", uid: 1 },
  { name: "Media", uid: 2 },
  { name: "Baja", uid: 3 },
];

export const INITIAL_VISIBLE_COLUMNS = [
  "nombre",
  "prioridad",
  "partido",
  "partida",
  "propietario",
  "acciones",
];
