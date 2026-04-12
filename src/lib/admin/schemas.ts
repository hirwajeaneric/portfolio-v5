import { z } from "zod";
import {
  AwardKind,
  BlogStatus,
  CommentStatus,
  ContactStatus,
  ProjectCategory,
  PromoPlacement,
} from "@/generated/prisma/enums";

export const projectTechSchema = z.object({
  name: z.string().min(1),
  iconKey: z.string().optional(),
});

export const projectLinkSchema = z.object({
  name: z.string().min(1),
  link: z.string().min(1),
  iconKey: z.string().optional(),
});

export const blogPostCreateSchema = z.object({
  title: z.string().min(1).max(240),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  introduction: z.string().min(1).max(20000),
  content: z.string().min(1).max(500000),
  coverImageUrl: z.string().min(1).max(2000),
  readTime: z.string().max(40).optional(),
  status: z.enum([BlogStatus.PUBLISHED, BlogStatus.DRAFT]),
  categoryId: z.string().uuid().nullable().optional(),
});

export const blogPostUpdateSchema = blogPostCreateSchema.partial();

export const blogCategoryCreateSchema = z.object({
  name: z.string().min(1).max(120),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
});

export const blogCategoryUpdateSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
});

const projectCategoryEnum = z.enum([
  ProjectCategory.Design,
  ProjectCategory.Web,
  ProjectCategory.Mobile,
  ProjectCategory.Writings,
  ProjectCategory.Startups,
  ProjectCategory.Software,
  ProjectCategory.Other,
]);

export const projectCreateSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  category: projectCategoryEnum,
  description: z.string().max(50000).nullable().optional(),
  deliverable: z.string().max(50000).nullable().optional(),
  challenge: z.string().max(50000).nullable().optional(),
  goal: z.string().max(50000).nullable().optional(),
  result: z.string().max(50000).nullable().optional(),
  client: z.string().min(1).max(200),
  timeline: z.string().min(1).max(200),
  link: z.string().min(1).max(2000),
  imageUrl: z.string().min(1).max(2000),
  typeLabel: z.string().min(1).max(120),
  technologies: z.array(projectTechSchema).default([]),
  otherLinks: z.array(projectLinkSchema).default([]),
  gallery: z.array(z.string().min(1)).default([]),
  published: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export const projectUpdateSchema = projectCreateSchema.partial();

export const commentPatchSchema = z.object({
  status: z.enum([
    CommentStatus.PENDING,
    CommentStatus.APPROVED,
    CommentStatus.REJECTED,
    CommentStatus.SPAM,
  ]),
});

export const contactPatchSchema = z
  .object({
    status: z
      .enum([
        ContactStatus.NEW,
        ContactStatus.READ,
        ContactStatus.REPLIED,
        ContactStatus.ARCHIVED,
      ])
      .optional(),
    adminNotes: z.string().max(20000).nullable().optional(),
  })
  .refine((d) => d.status !== undefined || d.adminNotes !== undefined, {
    message: "Provide status and/or adminNotes",
  });

const promoPlacementEnum = z.enum([
  PromoPlacement.HOME,
  PromoPlacement.ABOUT,
  PromoPlacement.CONTACT,
  PromoPlacement.BLOG_POST,
]);

export const promoCreateSchema = z.object({
  placements: z.array(promoPlacementEnum).min(1),
  kicker: z.string().min(1).max(200),
  headlineLead: z.string().min(1).max(200),
  headlineEmphasis: z.string().min(1).max(200),
  body: z.string().min(1).max(20000),
  ctaLabel: z.string().min(1).max(120),
  ctaUrl: z.string().min(1).max(2000),
  active: z.boolean().optional(),
  priority: z.number().int().optional(),
});

export const promoUpdateSchema = promoCreateSchema.partial();

export const serviceSectionSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(50000),
  sortOrder: z.number().int().optional(),
});

export const serviceCreateSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  shortDescription: z.string().min(1).max(20000),
  heroImageUrl: z.string().min(1).max(2000),
  showOnHome: z.boolean().optional(),
  homeSortOrder: z.number().int().optional(),
  technologies: z.array(z.string().min(1)).default([]),
  sections: z.array(serviceSectionSchema).default([]),
});

export const serviceUpdateSchema = serviceCreateSchema.partial();

export const testimonialCreateSchema = z.object({
  headline: z.string().max(240).nullable().optional(),
  quote: z.string().min(1).max(20000),
  authorName: z.string().min(1).max(120),
  authorRole: z.string().max(200).nullable().optional(),
  companyLogoUrl: z.string().max(2000).nullable().optional(),
  avatarUrl: z.string().max(2000).nullable().optional(),
  featured: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export const testimonialUpdateSchema = testimonialCreateSchema.partial();

export const awardCreateSchema = z.object({
  kind: z.enum([AwardKind.AWARD, AwardKind.CERTIFICATE]),
  title: z.string().min(1).max(300),
  issuer: z.string().max(300).nullable().optional(),
  description: z.string().max(20000).nullable().optional(),
  issuedAt: z.string().max(40).nullable().optional(),
  attachmentUrl: z.string().max(2000).nullable().optional(),
  attachmentPublicId: z.string().max(200).nullable().optional(),
  thumbnailUrl: z.string().max(2000).nullable().optional(),
  sortOrder: z.number().int().optional(),
});

export const awardUpdateSchema = awardCreateSchema.partial();

export const experienceCreateSchema = z.object({
  company: z.string().min(1).max(200),
  title: z.string().min(1).max(200),
  location: z.string().max(200).nullable().optional(),
  startDate: z.string().min(1).max(80),
  endDate: z.string().max(80).nullable().optional(),
  current: z.boolean().optional(),
  bullets: z.array(z.string().min(1)).default([]),
  sortOrder: z.number().int().optional(),
});

export const experienceUpdateSchema = experienceCreateSchema.partial();

export const technologyCreateSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  name: z.string().min(1).max(120),
  category: z.string().min(1).max(120),
  iconKey: z.string().min(1).max(120),
  sortOrder: z.number().int().optional(),
  active: z.boolean().optional(),
});

export const technologyUpdateSchema = technologyCreateSchema.partial();

export const siteStatisticCreateSchema = z.object({
  label: z.string().min(1).max(120),
  value: z.string().min(1).max(120),
  sortOrder: z.number().int().optional(),
});

export const siteStatisticUpdateSchema = siteStatisticCreateSchema.partial();

export const siteSettingsPatchSchema = z.object({
  siteName: z.string().max(200).nullable().optional(),
  socialLinks: z
    .array(
      z.object({
        name: z.string().min(1).max(80),
        url: z.string().min(1).max(2000),
      })
    )
    .optional(),
  iconCloudSlugs: z.array(z.string().min(1).max(80)).optional(),
});

export const userPatchSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  role: z.enum(["ADMIN", "EDITOR"]).optional(),
  active: z.boolean().optional(),
  requirePasswordReset: z.boolean().optional(),
});

export const userPasswordPatchSchema = z.object({
  password: z.string().min(8).max(200),
});
