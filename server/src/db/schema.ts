
import { serial, text, pgTable, timestamp, boolean } from 'drizzle-orm/pg-core';

export const blogPostsTable = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'), // Nullable by default
  published: boolean('published').notNull().default(false),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// TypeScript types for the table schema
export type BlogPost = typeof blogPostsTable.$inferSelect;
export type NewBlogPost = typeof blogPostsTable.$inferInsert;

// Export all tables for proper query building
export const tables = { blogPosts: blogPostsTable };
