import { prisma } from "@/lib/prisma";

export async function uniqueBlogSlug(base: string, excludePostId?: string) {
  let slug = base;
  let n = 0;
  for (;;) {
    const existing = await prisma.blogPost.findFirst({
      where: {
        slug,
        ...(excludePostId ? { NOT: { id: excludePostId } } : {}),
      },
      select: { id: true },
    });
    if (!existing) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

export async function uniqueProjectSlug(base: string, excludeProjectId?: string) {
  let slug = base;
  let n = 0;
  for (;;) {
    const existing = await prisma.project.findFirst({
      where: {
        slug,
        ...(excludeProjectId ? { NOT: { id: excludeProjectId } } : {}),
      },
      select: { id: true },
    });
    if (!existing) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

export async function uniqueServiceSlug(base: string, excludeServiceId?: string) {
  let slug = base;
  let n = 0;
  for (;;) {
    const existing = await prisma.service.findFirst({
      where: {
        slug,
        ...(excludeServiceId ? { NOT: { id: excludeServiceId } } : {}),
      },
      select: { id: true },
    });
    if (!existing) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

export async function uniqueTechnologySlug(base: string, excludeTechnologyId?: string) {
  let slug = base;
  let n = 0;
  for (;;) {
    const existing = await prisma.technology.findFirst({
      where: {
        slug,
        ...(excludeTechnologyId ? { NOT: { id: excludeTechnologyId } } : {}),
      },
      select: { id: true },
    });
    if (!existing) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}
