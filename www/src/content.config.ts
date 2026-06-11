import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { homePageSchema, homeSectionsSchema } from './types/home-sections';

const language = z.enum(['en', 'ar', 'es']);
const shared = {
  title: z.string(),
  description: z.string().default(''),
  slug: z.string(),
  canonical: z.string().url().optional(),
  featuredImage: z.string().optional(),
  alt: z.string().optional(),
  lang: language,
  translationKey: z.string().optional(),
  draft: z.boolean().default(false),
  home: homePageSchema.optional(),
  sections: homeSectionsSchema.optional()
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
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    avatar: z.string().optional(),
    lang: language,
    translationKey: z.string().optional()
  })
});

export const collections = { pages, blog, authors };
