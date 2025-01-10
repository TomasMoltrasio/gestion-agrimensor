export const URL_BASE =
  process.env.NEXT_PUBLIC_URL_BASE || "http://localhost:8000/api/projects";

export const getProjects = async () => {
  const response = await fetch(URL_BASE);
  if (!response.ok) {
    throw new Error("Error al cargar los proyectos");
  }
  return response.json();
};

export const getFechas = async () => {
  const response = await fetch(`${URL_BASE}/fechas`);
  if (!response.ok) {
    throw new Error("Error al cargar las fechas");
  }
  return response.json();
};

export const getAlertas = async () => {
  const response = await fetch(`${URL_BASE}/alertas`);
  if (!response.ok) {
    throw new Error("Error al cargar las alertas");
  }
  return response.json();
};

export const updateActiveAlerta = async (id: number) => {
  let body = JSON.stringify({ activa: false });

  const response = await fetch(`${URL_BASE}/alertas/${id}`, {
    body: body,
    headers: {
      "Content-Type": "application/json", // Indica que el body es JSON
    },
    method: "PUT",
  });
  if (!response.ok) {
    throw new Error("Error al actualizar la alerta");
  }
  return response.json();
};

export const updateAlerta = async (
  id: string,
  mensaje: string,
  fecha: string
) => {
  const response = await fetch(`${URL_BASE}/alertas/${id}`, {
    body: JSON.stringify({ mensaje, fecha }),
    headers: {
      "Content-Type": "application/json", // Indica que el body es JSON
    },
    method: "PUT",
  });
  if (!response.ok) {
    throw new Error("Error al actualizar la alerta");
  }
  return response.json();
};

export const downloadPDF = (id: string) => {
  fetch(`${URL_BASE}/${id}/pdf`).then((response) => {
    response.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "proyecto.pdf";
      a.click();
    });
  });
};

export const downloadPDFPagos = (id: string) => {
  fetch(`${URL_BASE}/${id}/pagos/pdf`).then((response) => {
    response.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "proyecto.pdf";
      a.click();
    });
  });
};

export const duplicateProject = async (id: string) => {
  const response = await fetch(`${URL_BASE}/${id}/duplicate`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Error al duplicar el proyecto");
  }
  return response.json();
};
