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

const projects: ProyectoTable[] = [
  {
    id: 1,
    fecha: "2024-01-15",
    prioridad: 1,
    nombre: "Proyecto Solar",
    partido: 44,
    partida: 12345,
    propietario: "Carlos Gómez",
    estado: "en curso",
    direccion: "Calle 45 N°123",
    contacto: "carlos.gomez@example.com",
    presupuesto: { total: 50000, moneda: "USD" },
    archivosIcloud: "icloud.com/proyectosolar",
  },
  {
    id: 2,
    fecha: "2023-12-20",
    prioridad: 2,
    nombre: "Edificio Central",
    partido: 44,
    partida: 54321,
    propietario: "Ana López",
    estado: "completado",
    direccion: "Av. Libertador 500",
    contacto: "ana.lopez@example.com",
    presupuesto: { total: 750000, moneda: "ARS" },
    archivosIcloud: "icloud.com/edificiocentral",
  },
  {
    id: 3,
    fecha: "2024-03-01",
    prioridad: 3,
    nombre: "Parque Eólico",
    partido: 44,
    partida: 67890,
    propietario: "Energía Sustentable S.A.",
    estado: "en curso",
    direccion: "Ruta 3 km 200",
    contacto: "contacto@energiasustentable.com",
    presupuesto: { total: 250000, moneda: "USD" },
    archivosIcloud: "icloud.com/parqueeolico",
  },
  {
    id: 4,
    fecha: "2023-11-15",
    prioridad: 1,
    nombre: "Hospital Regional",
    partido: 44,
    partida: 24680,
    propietario: "Gobierno de Buenos Aires",
    estado: "completado",
    direccion: "Calle Principal 800",
    contacto: "contacto@buenosaires.gov",
    presupuesto: { total: 1500000, moneda: "ARS" },
    archivosIcloud: "icloud.com/hospitalregional",
  },
  {
    id: 20,
    fecha: "2024-05-25",
    prioridad: 2,
    nombre: "Planta de Reciclaje",
    partido: 44,
    partida: 99887,
    propietario: "EcoRecicla SRL",
    estado: "en curso",
    direccion: "Parque Industrial Tigre, Lote 12",
    contacto: "info@ecorecicla.com",
    presupuesto: { total: 600000, moneda: "ARS" },
    archivosIcloud: "icloud.com/plantareciclaje",
  },
];

export { columns, projects, statusOptions, observaciones };
