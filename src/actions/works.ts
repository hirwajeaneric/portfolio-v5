import "server-only";

import { getProjectBySlug, getPublishedProjects, parseProjectJson } from "@/lib/db-queries";

export type WorkDetail = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description?: string | null;
  deliverable?: string | null;
  challenge?: string | null;
  goal?: string | null;
  result?: string | null;
  client: string;
  timeline: string;
  link: string;
  image: string;
  type: string;
  technologies: { name: string; iconKey?: string }[];
  otherLinks: { name: string; link: string; iconKey?: string }[];
};

export async function getAllWorks() {
  const list = await getPublishedProjects();
  return list.map((p) => ({ slug: p.slug, id: p.id, name: p.name }));
}

export async function getWork(slug: string): Promise<WorkDetail | null> {
  const p = await getProjectBySlug(slug);
  if (!p) return null;
  const { technologies, otherLinks } = parseProjectJson(p);
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category,
    description: p.description,
    deliverable: p.deliverable,
    challenge: p.challenge,
    goal: p.goal,
    result: p.result,
    client: p.client,
    timeline: p.timeline,
    link: p.link,
    image: p.imageUrl,
    type: p.typeLabel,
    technologies,
    otherLinks,
  };
}

export async function getGallery(projectId: string) {
  const p = await import("@/lib/prisma").then((m) =>
    m.prisma.project.findFirst({
      where: { id: projectId },
      select: { gallery: true },
    })
  );
  if (!p || !Array.isArray(p.gallery)) return [];
  const urls = p.gallery as string[];
  return urls.map((thumbnail, i) => ({
    id: i,
    thumbnail,
    name: `Slide ${i + 1}`,
  }));
}
