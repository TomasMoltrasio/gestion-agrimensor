import express from "express";
import { body, param } from "express-validator";
import {
  getProyectos,
  getProyecto,
  createProyecto,
  updateProyecto,
  getFechasAviso,
  generatePDF,
  duplicateProyecto,
  generatePagosPDF,
  getAlertasToday,
  updateAlerta,
} from "../controllers/projects.controller.js";

const router = express.Router();

// Rutas y validaciones

// GET: Obtener todos los proyectos
router.get("/", getProyectos);

// GET: Obtener todas las fechas de aviso de todos los proyectos
router.get("/fechas", getFechasAviso);

// GET: Generar un PDF con los datos de un proyecto
router.get(
  "/:id/pdf",
  [
    param("id")
      .isInt({ min: 1 })
      .withMessage("El ID debe ser un número entero positivo."),
  ],
  generatePDF
);

// GET: Generar un PDF con los pagos de un proyecto
router.get(
  "/:id/pagos/pdf",
  [
    param("id")
      .isInt({ min: 1 })
      .withMessage("El ID debe ser un número entero positivo."),
  ],
  generatePagosPDF
);

// GET: Obtener todas las alertas del día
router.get("/alertas", getAlertasToday);

// GET: Obtener un proyecto por ID
router.get(
  "/:id",
  [
    param("id")
      .isInt({ min: 1 })
      .withMessage("El ID debe ser un número entero positivo."),
  ],
  getProyecto
);

// POST: Crear un nuevo proyecto
router.post(
  "/",
  [
    body("nombre")
      .isString()
      .withMessage("El nombre es obligatorio y debe ser una cadena de texto."),
    body("direccion")
      .optional()
      .isString()
      .withMessage("La dirección debe ser una cadena de texto."),
    body("tipoTrabajo")
      .optional()
      .isString()
      .withMessage("El tipo de trabajo debe ser una cadena de texto."),
    body("profesional")
      .optional()
      .isIn(["Tomás Portales", "Mariana López"])
      .withMessage(
        'El profesional debe ser "Tomás Portales" o "Mariana López".'
      ),
    body("prioridad")
      .optional()
      .isInt({ min: 1, max: 4 })
      .withMessage("La prioridad debe ser un valor entre 1 y 4."),
    body("presupuesto.total")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("El presupuesto total debe ser un número positivo."),
    body("presupuesto.moneda")
      .optional()
      .isIn(["USD", "ARS"])
      .withMessage('La moneda debe ser "USD" o "ARS".'),
  ],
  createProyecto
);

// POST: Duplicar un proyecto existente por ID
router.post(
  "/:id/duplicate",
  [
    param("id")
      .isInt({ min: 1 })
      .withMessage("El ID debe ser un número entero positivo."),
  ],
  duplicateProyecto
);

// PUT: Actualizar un proyecto existente por ID
router.put(
  "/:id",
  [
    param("id")
      .isInt({ min: 1 })
      .withMessage("El ID debe ser un número entero positivo."),
    body("nombre")
      .optional()
      .isString()
      .withMessage("El nombre debe ser una cadena de texto."),
    body("direccion")
      .optional()
      .isString()
      .withMessage("La dirección debe ser una cadena de texto."),
    body("tipoTrabajo")
      .optional()
      .isString()
      .withMessage("El tipo de trabajo debe ser una cadena de texto."),
    body("prioridad")
      .optional()
      .isInt({ min: 1, max: 3 })
      .withMessage("La prioridad debe ser un valor entre 1 y 3."),
  ],
  updateProyecto
);

// PUT: Actualizar una alerta por ID
router.put(
  "/alertas/:id",
  [
    param("id")
      .isInt({ min: 1 })
      .withMessage("El ID debe ser un número entero positivo."),
    body("activa")
      .isBoolean()
      .withMessage("El campo activa debe ser un booleano."),
  ],
  updateAlerta
);

export default router;
