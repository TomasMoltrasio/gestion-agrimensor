import { ProyectoTable } from "@tipos/index";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Nombre", uid: "nombre", sortable: true },
  { name: "Fecha", uid: "fecha", sortable: true },
  { name: "Prioridad", uid: "prioridad", sortable: true },
  { name: "Partido", uid: "partido", sortable: true },
  { name: "Partida", uid: "partida", sortable: true },
  { name: "Propietario", uid: "propietario", sortable: false },
  { name: "Estado", uid: "estado", sortable: true },
  { name: "Direccion", uid: "direccion", sortable: false },
  { name: "Contacto", uid: "contacto", sortable: false },
  { name: "Presupuesto", uid: "presupuesto", sortable: false },
  { name: "Detalle", uid: "detalle", sortable: false },
  { name: "Icloud", uid: "icloud", sortable: false },
  { name: "Ver", uid: "acciones" },
];

const statusOptions = [
  { name: "En curso", uid: "en curso" },
  { name: "Completo", uid: "completado" },
];

const observaciones = [
  {
    value: "antecendenteCatastral",
    label: "Antecendente Catastral",
  },
  {
    value: "informeDominio",
    label: "Informe de Dominio",
  },
  {
    value: "relevamiento",
    label: "Relevamiento",
  },
  {
    value: "dibujo",
    label: "Dibujo",
  },
  {
    value: "c10",
    label: "C10",
  },
  {
    value: "planoObra",
    label: "Plano de Obra",
  },
  {
    value: "notaEscribano",
    label: "Nota de Escribano",
  },
  {
    value: "vMunicipal",
    label: "Visado Municipal",
  },
  {
    value: "vCPA",
    label: "Visado CPA",
  },
  {
    value: "vEdenorEdeaEdesur",
    label: "Visado Edenor, Edea, Edesur",
  },
  {
    value: "vVialidadProvincial",
    label: "Visado Vialidad Provincial",
  },
  {
    value: "vVialidadNacional",
    label: "Visado Vialidad Nacional",
  },
  {
    value: "vAda",
    label: "Visado ADA",
  },
  {
    value: "vTierras",
    label: "Visado Tierras",
  },
  {
    value: "vAgronoma",
    label: "Visado Agronoma",
  },
  {
    value: "vGeorreferenciacion",
    label: "Visado Georreferenciacion",
  },
  {
    value: "visadoPrevio",
    label: "Visado Previo",
  },
  {
    value: "definitivo",
    label: "Definitivo",
  },
  {
    value: "valorTierra",
    label: "Valor de Tierra",
  },
  {
    value: "ddjj",
    label: "DDJJ",
  },
  {
    value: "legajoParcelario",
    label: "Legajo Parcelario",
  },
  {
    value: "comunicacionAlRegistro",
    label: "Comunicacion al Registro",
  },
  {
    value: "visadoViaReclamo947",
    label: "Visado Via Reclamo 947",
  },
  {
    value: "presentacionDefinitiva947",
    label: "Presentacion Definitiva 947",
  },
  {
    value: "estadoParcelario",
    label: "Estado Parcelario",
  },
  {
    value: "consulta",
    label: "Consulta",
  },
];

export { columns, statusOptions, observaciones };
