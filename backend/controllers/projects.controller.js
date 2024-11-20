import { validationResult } from "express-validator";
import Proyecto from "../models/Project.js";

const formatearFecha = (fechaISO) => {
  const fecha = new Date(fechaISO);

  // Ajustar a la zona horaria local
  const fechaLocal = new Date(
    fecha.getTime() - fecha.getTimezoneOffset() * 60000
  );

  return fechaLocal.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Obtener todos los proyectos
export const getProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find(
      {},
      {
        id: 1,
        createdAt: 1,
        prioridad: 1,
        nombre: 1,
        "datosCatastrales.partido": 1,
        "datosCatastrales.partida": 1,
        "datosComitentes.nombre": 1,
        estado: 1,
        direccion: 1,
        "datosComitentes.contacto": 1,
        presupuesto: 1,
        archivosIcloud: 1,
      }
    );

    if (proyectos.length === 0) {
      return res.status(404).json({ message: "No hay proyectos." });
    }

    // Mapear para ajustar el formato y asegurar que solo el primer comitente se considera
    const proyectosWithExcludes = proyectos.map((proyecto) => ({
      id: proyecto.id,
      fecha: formatearFecha(proyecto.createdAt),
      prioridad: proyecto.prioridad,
      nombre: proyecto.nombre,
      partido: proyecto.datosCatastrales.partido,
      partida: proyecto.datosCatastrales.partida,
      propietario: proyecto.datosComitentes[0]?.nombre, // Asegurarte de manejar undefined
      estado: proyecto.estado,
      direccion: proyecto.direccion,
      contacto: proyecto.datosComitentes[0]?.contacto, // Asegurarte de manejar undefined
      presupuesto: proyecto.presupuesto,
      archivosIcloud: proyecto.archivosIcloud,
    }));

    res.json(proyectosWithExcludes);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor.", error });
  }
};

// Obtener un proyecto por ID
export const getProyecto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const proyecto = await Proyecto.findOne({ id: req.params.id });
    if (!proyecto) {
      return res.status(404).json({ message: "Proyecto no encontrado." });
    }
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor.", error });
  }
};

// Crear un nuevo proyecto
export const createProyecto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const nuevoProyecto = new Proyecto(req.body);
    await nuevoProyecto.save();
    res.status(201).json(nuevoProyecto);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el proyecto.", error });
  }
};

// Actualizar un proyecto existente por ID
export const updateProyecto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const proyectoActualizado = await Proyecto.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true } // Retorna el documento actualizado
    );

    if (!proyectoActualizado) {
      return res.status(404).json({ message: "Proyecto no encontrado." });
    }

    res.json(proyectoActualizado);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el proyecto.", error });
  }
};
