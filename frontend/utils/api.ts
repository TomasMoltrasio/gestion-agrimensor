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
