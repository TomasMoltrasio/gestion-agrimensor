import { validationResult } from "express-validator";
import Proyecto from "../models/Project.js";

// Obtener todos los proyectos
export const getProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find();
    if (proyectos.length === 0) {
      return res.status(404).json({ message: "No hay proyectos." });
    }
    res.json(proyectos);
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
