
import { z } from 'zod';

// Blog post schema
export const blogPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().nullable(),
  published: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type BlogPost = z.infer<typeof blogPostSchema>;

// Input schema for creating blog posts
export const createBlogPostInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().nullable().optional(),
  published: z.boolean().default(false)
});

export type CreateBlogPostInput = z.infer<typeof createBlogPostInputSchema>;

// Input schema for updating blog posts
export const updateBlogPostInputSchema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().nullable().optional(),
  published: z.boolean().optional()
});

export type UpdateBlogPostInput = z.infer<typeof updateBlogPostInputSchema>;

// Schema for getting a single blog post by slug
export const getBlogPostBySlugInputSchema = z.object({
  slug: z.string()
});

export type GetBlogPostBySlugInput = z.infer<typeof getBlogPostBySlugInputSchema>;

// Schema for getting published blog posts only
export const getPublishedBlogPostsInputSchema = z.object({
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional()
});

export type GetPublishedBlogPostsInput = z.infer<typeof getPublishedBlogPostsInputSchema>;
