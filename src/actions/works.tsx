import { galleries } from "@/database/galleries";
import projects from "@/database/projects";

export const getWork = async (slug: string) => {
  const work = projects.find(project => project.slug === slug);
  return work;
};

export const getGallery = async (projectId: string) => {
  const gallery = galleries.filter(gallery => gallery.projectId === projectId);
  return gallery;
}

export const getAllWorks = async () => {
  return projects;
}