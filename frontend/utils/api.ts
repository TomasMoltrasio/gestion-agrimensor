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
