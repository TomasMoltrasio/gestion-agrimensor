import { validationResult } from "express-validator";
import PDFDocument from "pdfkit-table";
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

export const getAlertasToday = async (req, res) => {
  try {
    // Obtener proyectos con solo los campos necesarios
    const proyectos = await Proyecto.find({}, { id: 1, alerta: 1 });

    if (proyectos.length === 0) {
      return res.status(404).json({ message: "No hay proyectos." });
    }

    // Fecha actual sin horas
    const fechaHoy = new Date();
    const hoySinHora = new Date(
      fechaHoy.getFullYear(),
      fechaHoy.getMonth(),
      fechaHoy.getDate()
    );

    // Función para convertir "dd/mm/yyyy" a un objeto Date
    const convertirFecha = (fechaStr) => {
      const [dia, mes, anio] = fechaStr.split("/").map(Number);
      return new Date(anio, mes - 1, dia); // Mes empieza en 0 (enero)
    };

    // Filtrar y mapear alertas activas con fecha igual a hoy
    const alertas = proyectos
      .map((proyecto) => {
        const alerta = proyecto._doc.alerta;
        if (alerta?.activa && alerta.fecha) {
          const fechaAlerta = convertirFecha(alerta.fecha); // Convertir la fecha recibida
          const fechaAlertaSinHora = new Date(
            fechaAlerta.getFullYear(),
            fechaAlerta.getMonth(),
            fechaAlerta.getDate()
          );

          if (fechaAlertaSinHora.getTime() === hoySinHora.getTime()) {
            return {
              id: proyecto._doc.id,
              mensaje: alerta.mensaje,
              fecha: alerta.fecha,
            };
          }
        }
        return null;
      })
      .filter((alerta) => alerta !== null);

    res.json(alertas);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor.", error });
  }
};

export const updateAlerta = async (req, res) => {
  try {
    const proyecto = await Proyecto.findOne({ id: req.params.id });
    if (!proyecto) {
      return res.status(404).json({ message: "Proyecto no encontrado." });
    }

    if (!proyecto.alerta) {
      proyecto.alerta = {};
    }

    // Actualizar propiedades del objeto alerta
    proyecto.alerta = {
      ...proyecto.alerta,
      ...req.body,
      activa: req.body.activa === false ? false : true, // Mantener true a menos que se indique false
    };

    await proyecto.save();
    res.json(proyecto.alerta);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor.", error });
  }
};

// Generar un PDF con los datos de un proyecto

export const generatePDF = async (req, res) => {
  try {
    const proyecto = await Proyecto.findOne({ id: req.params.id });
    if (!proyecto) {
      return res.status(404).json({ message: "Proyecto no encontrado." });
    }

    // Configurar las cabeceras
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${proyecto.nombre}.pdf"`
    );

    // Crear y enviar el PDF
    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    // Estilos generales
    const primaryColor = "black";
    const secondaryColor = "#808080"; // Gris

    // Encabezado
    doc
      .fontSize(22)
      .fillColor(primaryColor)
      .text(`Proyecto: ${proyecto.nombre}`, {
        align: "center",
      });
    doc.moveDown(1);

    // Sección: Datos del proyecto
    doc.fontSize(18).fillColor(primaryColor).text("Datos del Proyecto");
    doc
      .moveDown(0.5)
      .fontSize(14)
      .fillColor("black")
      .text(`Tipo de trabajo: ${proyecto.tipoTrabajo}`)
      .moveDown(0.2)
      .text(`Dirección: ${proyecto.direccion}`);

    doc
      .moveDown(0.5)
      .fontSize(14)
      .fillColor("black")
      .text(`Partido: ${proyecto.datosCatastrales.partido}`)
      .moveDown(0.2)
      .text(`Partida: ${proyecto.datosCatastrales.partida}`);
    doc.moveDown(1);

    // Línea divisoria
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke(primaryColor);

    // Sección: Datos del propietario
    doc.moveDown(1);
    doc.fontSize(18).fillColor(primaryColor).text("Datos del Propietario");
    doc
      .moveDown(0.5)
      .fontSize(14)
      .fillColor("black")
      .text(
        `Nombre: ${
          proyecto.datosComitentes[0]?.nombre || "Información no disponible"
        }`
      )
      .moveDown(0.2)
      .text(
        `Contacto: ${
          proyecto.datosComitentes[0]?.contacto || "Información no disponible"
        }`
      );
    doc.moveDown(1);

    // Línea divisoria
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke(secondaryColor);

    // Pie de página
    doc
      .fontSize(10)
      .fillColor(secondaryColor)
      .text("Generado por el sistema de gestión de proyectos", 50, 750, {
        align: "center",
      });

    // Finalizar el PDF
    doc.end();
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    res.status(500).json({ message: "Error interno del servidor.", error });
  }
};

const getTotalPagos = (pagos, presupuesto) => {
  if (!pagos || !presupuesto) return "0";

  let total = pagos.reduce((acc, pago) => {
    const monto =
      presupuesto?.moneda === "USD"
        ? parseInt(pago.dolares)
        : parseInt(pago.pesos);
    return monto ? acc + monto : acc;
  }, 0);

  return new Intl.NumberFormat("es-AR").format(total);
};

const getRestante = (pagos, presupuesto) => {
  if (!pagos || !presupuesto) return "0";

  let totalPagos = pagos.reduce((acc, pago) => {
    let monto =
      presupuesto.moneda === "USD"
        ? parseInt(pago.dolares)
        : parseInt(pago.pesos);
    return monto ? acc + monto : acc;
  }, 0);

  let totalPresupuesto = presupuesto.total;

  return new Intl.NumberFormat("es-AR").format(totalPresupuesto - totalPagos);
};

// Generar un PDF con los datos de los pagos de un proyecto
export const generatePagosPDF = async (req, res) => {
  try {
    const proyecto = await Proyecto.findOne({ id: req.params.id });
    if (!proyecto) {
      return res.status(404).json({ message: "Proyecto no encontrado." });
    }

    // Configurar las cabeceras
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${proyecto.nombre}-pagos.pdf"`
    );

    // Crear y enviar el PDF
    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    // Estilos generales
    const primaryColor = "black";
    const secondaryColor = "#808080"; // Gris

    // Encabezado
    doc
      .fontSize(22)
      .fillColor(primaryColor)
      .text(`Pagos del Proyecto: ${proyecto.nombre}`, {
        align: "center",
      });
    doc.moveDown(1);

    // Sección: Datos de los pagos
    doc.fontSize(18).fillColor(primaryColor).text("Datos de los Pagos");
    doc.moveDown(0.5);

    const tableData = {
      headers: ["Fecha", "Pesos", "Cambio", "Dólares"],
      rows: proyecto.pagos.map((pago) => [
        formatearFecha(pago.fecha),
        pago.pesos || "-",
        pago.tipoCambio || "-",
        pago.dolares || "-",
      ]),
    };

    await doc.table(tableData, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
      prepareRow: (row, i) => doc.font("Helvetica").fontSize(10),
    });

    doc.moveDown(1);

    // Total de pagos
    doc
      .fontSize(12)
      .fillColor(primaryColor)
      .text(
        `Total de pagos: $${getTotalPagos(
          proyecto?.pagos,
          proyecto?.presupuesto
        )}`
      );
    doc.moveDown(0.5);

    // Restante
    doc
      .fontSize(12)
      .fillColor(primaryColor)
      .text(
        `Restante: $${getRestante(proyecto?.pagos, proyecto?.presupuesto)}`
      );
    doc.moveDown(1);

    // Total presupuesto
    doc
      .fontSize(12)
      .fillColor(primaryColor)
      .text(
        `Total presupuesto: $${new Intl.NumberFormat("es-AR").format(
          proyecto?.presupuesto?.total
        )}`
      );
    doc.moveDown(1);

    // Línea divisoria

    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke(primaryColor);

    // Finalizar el PDF
    doc.end();
  } catch (error) {
    console.error("Error al generar el PDF de pagos:", error);
    res.status(500).json({ message: "Error interno del servidor.", error });
  }
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
        detalle: 1,
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
      detalle: proyecto.detalle,
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

// Duplicar un proyecto por ID
export const duplicateProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findOne({ id: req.params.id });
    if (!proyecto) {
      return res.status(404).json({ message: "Proyecto no encontrado." });
    }

    delete proyecto._doc._id; // Eliminar el ID para que se genere uno nuevo
    delete proyecto._doc.id; // Eliminar el ID para que se genere uno nuevo

    // Crear un nuevo proyecto a partir del documento original
    const nuevoProyecto = new Proyecto(
      JSON.parse(JSON.stringify(proyecto._doc))
    );

    // Guardar el nuevo proyecto
    await nuevoProyecto.save();
    res.status(201).json(nuevoProyecto);
  } catch (error) {
    console.error("Error al duplicar el proyecto:", error);
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
