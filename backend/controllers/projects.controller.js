import { validationResult } from "express-validator";
import Proyecto from "../models/Project.js";

const formatearFecha = (fechaISO) => {
  // Crear un objeto Date correctamente desde la entrada
  const fecha = fechaISO.toString().includes("T")
    ? new Date(fechaISO) // ISO con hora incluida
    : new Date(`${fechaISO}T00:00:00`); // Solo fecha, asumimos inicio del día

  // Formatear la fecha ajustada a la zona horaria de Buenos Aires
  const opciones = {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const fechafinal = fecha.toLocaleDateString("es-AR", opciones);

  return fechafinal;
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

// Obtener todas las fechas de aviso de todos los proyectos
export const getFechasAviso = async (req, res) => {
  try {
    const proyectos = await Proyecto.find(
      {},
      {
        id: 1,
        "antecendenteCatastral.fechaAviso": 1,
        "informeDominio.fechaAviso": 1,
        "relevamiento.fechaAviso": 1,
        "dibujo.fechaAviso": 1,
        "c10.fechaAviso": 1,
        "planoObra.fechaAviso": 1,
        "notaEscribano.fechaAviso": 1,
        "vMunicipal.fechaAviso": 1,
        "vCPA.fechaAviso": 1,
        "vEdenorEdeaEdesur.fechaAviso": 1,
        "vVialidadProvincial.fechaAviso": 1,
        "vVialidadNacional.fechaAviso": 1,
        "vAda.fechaAviso": 1,
        "vTierras.fechaAviso": 1,
        "vAgronoma.fechaAviso": 1,
        "vGeorreferenciacion.fechaAviso": 1,
        "visadoPrevio.fechaAviso": 1,
        "definitivo.fechaAviso": 1,
        "valorTierra.fechaAviso": 1,
        "ddjj.fechaAviso": 1,
        "legajoParcelario.fechaAviso": 1,
        "comunicacionAlRegistro.fechaAviso": 1,
        "visadoViaReclamo947.fechaAviso": 1,
        "presentacionDefinitiva947.fechaAviso": 1,
        "estadoParcelario.fechaAviso": 1,
        "consulta.fechaAviso": 1,
      }
    );

    if (proyectos.length === 0) {
      return res.status(404).json({ message: "No hay proyectos." });
    }

    const fechaHoy = new Date(); // Fecha actual

    const fechasAviso = proyectos
      .map((proyecto) => {
        const fechas = {};
        Object.keys(proyecto._doc).forEach((key) => {
          if (key !== "id" && proyecto._doc[key]?.fechaAviso) {
            const fechaAviso = new Date(proyecto._doc[key].fechaAviso);
            if (fechaAviso >= fechaHoy) {
              // Filtrar fechas mayores o iguales a hoy
              fechas[key] = formatearFecha(proyecto._doc[key].fechaAviso);
            }
          }
        });
        if (Object.keys(fechas).length > 0) {
          return {
            id: proyecto._doc.id,
            ...fechas,
          };
        }
        return null;
      })
      .filter((proyecto) => proyecto !== null);

    res.json(fechasAviso);
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
