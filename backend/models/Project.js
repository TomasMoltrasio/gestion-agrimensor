import mongoose, { Schema } from "mongoose";

const EtapaSchema = new Schema(
  {
    fechaInicio: { type: String },
    fechaAviso: { type: String },
    observaciones: { type: String },
  },
  { _id: false }
);

const AlertaSchema = new Schema(
  {
    mensaje: { type: String },
    fecha: { type: String },
    activa: { type: Boolean, default: true },
  },
  { _id: false }
);

const ProyectoSchema = new Schema(
  {
    id: { type: Number, unique: true }, // Incremental ID
    nombre: { type: String },
    direccion: { type: String },
    tipoTrabajo: { type: String },
    profesional: { type: String, enum: ["Tomás Portales", "Mariana López"] },
    prioridad: { type: Number, enum: [1, 2, 3, 4] },
    archivosIcloud: { type: String },
    estado: {
      type: String,
      enum: ["en curso", "completado"],
      default: "en curso",
    },
    presupuesto: {
      total: { type: Number },
      moneda: { type: String, enum: ["USD", "ARS"] },
    },
    datosCatastrales: {
      partido: { type: Number },
      partida: { type: String },
      circunscripcion: { type: String },
      seccion: { type: String },
      chacra: { type: String },
      quinta: { type: String },
      fraccion: { type: String },
      manzana: { type: String },
      parcela: { type: String },
      subParcela: { type: String },
    },

    datosComitentes: [
      {
        nombre: { type: String },
        cuit: { type: String },
        direccion: { type: String },
        contacto: { type: String },
      },
      { _id: false },
    ],
    pagos: [
      {
        fecha: { type: String },
        pesos: { type: Number },
        dolares: { type: Number },
        tipoCambio: { type: Number },
        observaciones: { type: String },
      },
      { _id: false },
    ],
    antecendenteCatastral: EtapaSchema,
    informeDominio: EtapaSchema,
    relevamiento: EtapaSchema,
    dibujo: EtapaSchema,
    c10: EtapaSchema,
    planoObra: EtapaSchema,
    notaEscribano: EtapaSchema,
    vMunicipal: EtapaSchema,
    vCPA: EtapaSchema,
    vEdenorEdeaEdesur: EtapaSchema,
    vVialidadProvincial: EtapaSchema,
    vVialidadNacional: EtapaSchema,
    vAda: EtapaSchema,
    vTierras: EtapaSchema,
    vAgronoma: EtapaSchema,
    vGeorreferenciacion: EtapaSchema,
    visadoPrevio: EtapaSchema,
    definitivo: EtapaSchema,
    valorTierra: EtapaSchema,
    ddjj: EtapaSchema,
    legajoParcelario: EtapaSchema,
    comunicacionAlRegistro: EtapaSchema,
    visadoViaReclamo947: EtapaSchema,
    presentacionDefinitiva947: EtapaSchema,
    estadoParcelario: EtapaSchema,
    consulta: EtapaSchema,
    detalle: { type: String },
    alerta: AlertaSchema,
  },
  { timestamps: true }
);

// Configurar ID incremental
ProyectoSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const lastProyecto = await mongoose
    .model("Proyecto")
    .findOne({}, { id: 1 })
    .sort({ id: -1 });

  this.id = lastProyecto?.id ? lastProyecto.id + 1 : 1;
  next();
});

// Middleware para establecer la moneda por defecto a "USD"
ProyectoSchema.pre("save", function (next) {
  if (this.presupuesto && this.presupuesto.total && !this.presupuesto.moneda) {
    this.presupuesto.moneda = "USD";
  }
  next();
});

// Middleware para establecer la moneda por defecto a "USD" en pagos
ProyectoSchema.pre("save", function (next) {
  this.pagos = this.pagos.map((pago) => {
    if (pago.monto && !pago.moneda) {
      pago.moneda = "USD";
    }
    return pago;
  });
  next();
});

export default mongoose.model("Proyecto", ProyectoSchema);
