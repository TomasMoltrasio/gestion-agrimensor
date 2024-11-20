export const URL_BASE = "http://localhost:8000/api/projects";

export const getProjects = async () => {
  const response = await fetch(URL_BASE);
  if (!response.ok) {
    throw new Error("Error al cargar los proyectos");
  }
  return response.json();
};
