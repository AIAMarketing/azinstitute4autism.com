import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { homePageSchema, homeSectionsSchema } from './types/home-sections';
import { teamPageSchema } from './types/team-page';

const language = z.enum(['en', 'ar', 'es']);
const translationKey = z.string().min(1).refine((value) => value === value.trim(), {
  message: 'translationKey must not have surrounding whitespace'
}).optional();
const shared = {
  title: z.string(),
  displayH1: z.string().refine((value) => value.trim().length > 0, {
    message: 'displayH1 must not be empty or whitespace-only'
  }).optional(),
  description: z.string().default(''),
  slug: z.string(),
  canonical: z.url().optional(),
  featuredImage: z.string().optional(),
  alt: z.string().optional(),
  lang: language,
  translationKey,
  draft: z.boolean().default(false),
  noindex: z.boolean().default(false),
  home: homePageSchema.optional(),
  sections: homeSectionsSchema.optional(),
  team: teamPageSchema.optional()
};

const pages = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/pages',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, '')
  }),
  schema: z.object(shared)
});

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, '')
  }),
  schema: z.object({
    ...shared,
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([])
  })
});

const authors = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/authors',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, '')
  }),
  schema: z.object({
    name: z.string().refine((value) => value.trim().length > 0, 'Author name must not be blank'),
    displayName: z.string().refine((value) => value.trim().length > 0, 'Author displayName must not be blank').optional(),
    slug: z.string().regex(/^[\p{L}\p{N}]+(?:[-_][\p{L}\p{N}]+)*$/u, 'Author slug must be a safe single path segment'),
    description: z.string().optional(),
    avatar: z.string().optional(),
    lang: language,
    translationKey
  })
});

export const collections = { pages, blog, authors };
