import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ProyectoTable = {
  id: number;
  fecha: string;
  prioridad: 1 | 2 | 3;
  nombre: string;
  partido: number;
  partida: number;
  propietario: string;
  estado: "en curso" | "completado";
  direccion: string;
  contacto: string;
  presupuesto: {
    total: number;
    moneda: "USD" | "ARS";
  };
  archivosIcloud: string;
};

export type Proyecto = {
  id: number;
  nombre: string;
  direccion: string;
  tipoTrabajo: string;
  profesional: "Tomás Portales" | "Juan Perez";
  prioridad: 1 | 2 | 3;
  archivosIcloud: string;
  estado: "en curso" | "completado";
  presupuesto: {
    total: number;
    moneda: "USD" | "ARS";
  };
  datosCatastrales: {
    partido: number;
    partida: string;
    circunscripcion: string;
    seccion: string;
    chacra: string;
    quinta: string;
    fraccion: string;
    manzana: string;
    parcela: string;
    subParcela: string;
  };
  datosComitentes: {
    nombre: string;
    cuit: string;
    direccion: string;
    contacto: string;
  }[];
  antecendenteCatastral: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  informeDominio: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  relevamiento: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  dibujo: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  c10: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  planoObra: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  notaEscribano: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vMunicipal: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vCPA: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vEdenorEdeaEdesur: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vVialidadProvincial: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vVialidadNacional: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vAda: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vTierras: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vAgronoma: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vGeorreferenciacion: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  visadoPrevio: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  definitivo: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  valorTierra: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  ddjj: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  legajoParcelario: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  comunicacionAlRegistro: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  visadoViaReclamo947: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  presentacionDefinitiva947: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  estadoParcelario: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  consulta: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
};

export type ProyectoObservaciones = {
  antecendenteCatastral: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  informeDominio: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  relevamiento: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  dibujo: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  c10: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  planoObra: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  notaEscribano: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vMunicipal: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vCPA: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vEdenorEdeaEdesur: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vVialidadProvincial: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vVialidadNacional: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vAda: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vTierras: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vAgronoma: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  vGeorreferenciacion: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  visadoPrevio: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  definitivo: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  valorTierra: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  ddjj: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  legajoParcelario: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  comunicacionAlRegistro: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  visadoViaReclamo947: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  presentacionDefinitiva947: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  estadoParcelario: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
  consulta: {
    fechaInicio: string;
    fechaAviso: string;
    observaciones: string;
  };
};
