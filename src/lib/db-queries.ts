import "server-only";

import { prisma } from "@/lib/prisma";
import { BlogStatus, CommentStatus, PromoPlacement } from "@/generated/prisma/enums";
import type { ProjectCategory } from "@/generated/prisma/enums";

export type SocialLink = { name: string; url: string };

export async function getSiteSettings() {
  return prisma.siteSettings.findUnique({ where: { id: "default" } });
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const s = await getSiteSettings();
  const raw = s?.socialLinks;
  if (!raw || !Array.isArray(raw)) return [];
  return raw as SocialLink[];
}

export async function getIconCloudSlugs(): Promise<string[]> {
  const s = await getSiteSettings();
  const raw = s?.iconCloudSlugs;
  if (!raw || !Array.isArray(raw)) return [];
  return raw as string[];
}

export async function getPromoAds(placements: PromoPlacement[]) {
  const ads = await prisma.promoAd.findMany({
    where: {
      active: true,
      placements: { hasSome: placements },
    },
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
  });
  return ads.filter((a) => a.placements.some((p) => placements.includes(p)));
}

export async function getPublishedPosts() {
  return prisma.blogPost.findMany({
    where: { status: BlogStatus.PUBLISHED },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({
    where: { slug, status: BlogStatus.PUBLISHED },
    include: { category: true },
  });
}

export async function getRelatedPosts(categoryId: string | null | undefined, excludeSlug: string, take = 3) {
  if (!categoryId) return [];
  return prisma.blogPost.findMany({
    where: {
      status: BlogStatus.PUBLISHED,
      categoryId,
      NOT: { slug: excludeSlug },
    },
    take,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
}

export async function getRelatedPostsForSlug(slug: string, take = 3) {
  const post = await prisma.blogPost.findFirst({
    where: { slug, status: BlogStatus.PUBLISHED },
    select: { categoryId: true },
  });
  if (!post?.categoryId) return [];
  return getRelatedPosts(post.categoryId, slug, take);
}

export async function getApprovedComments(postId: string) {
  return prisma.blogComment.findMany({
    where: { postId, status: CommentStatus.APPROVED },
    orderBy: { createdAt: "asc" },
  });
}

export async function getBlogLikeCount(postId: string) {
  return prisma.blogLike.count({ where: { postId } });
}

export async function getPublishedProjects() {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findFirst({
    where: { slug, published: true },
  });
}

export async function getHomeServices() {
  return prisma.service.findMany({
    where: { showOnHome: true },
    orderBy: { homeSortOrder: "asc" },
  });
}

export async function getAllServices() {
  return prisma.service.findMany({
    orderBy: { name: "asc" },
    include: { sections: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findFirst({
    where: { slug },
    include: { sections: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getTechnologies() {
  return prisma.technology.findMany({
    where: { active: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
}

export async function getTechnologiesByNames(names: string[]) {
  if (!names.length) return [];
  return prisma.technology.findMany({
    where: { active: true, name: { in: names } },
  });
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getAwards() {
  return prisma.award.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getExperiences() {
  return prisma.experience.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getSiteStatistics() {
  return prisma.siteStatistic.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

/** Map DB project to card props */
export function projectToCard(p: {
  name: string;
  slug: string;
  category: ProjectCategory;
  imageUrl: string;
}) {
  return {
    name: p.name,
    slug: p.slug,
    category: p.category,
    image: p.imageUrl,
  };
}

export type ProjectTechJson = { name: string; iconKey?: string };
export type ProjectLinkJson = { name: string; link: string; iconKey?: string };

export function parseProjectJson(p: {
  technologies: unknown;
  otherLinks: unknown;
  gallery: unknown;
}) {
  const technologies = Array.isArray(p.technologies) ? (p.technologies as ProjectTechJson[]) : [];
  const otherLinks = Array.isArray(p.otherLinks) ? (p.otherLinks as ProjectLinkJson[]) : [];
  const galleryUrls = Array.isArray(p.gallery) ? (p.gallery as string[]) : [];
  return { technologies, otherLinks, galleryUrls };
}
