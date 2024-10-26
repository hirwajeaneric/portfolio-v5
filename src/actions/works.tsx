import projects from "@/database/projects";

export const getWork = async (slug: string) => {
  const work = projects.find(project => project.slug === slug);
  return work;
};