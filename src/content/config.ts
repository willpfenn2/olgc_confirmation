import { defineCollection, z } from 'astro:content';

const lessons = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    title: z.string(),
    subtitle: z.string().optional(),
    scripture: z.string().optional(),
  }),
});

export const collections = { lessons };
