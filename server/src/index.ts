
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

import { 
  createBlogPostInputSchema, 
  updateBlogPostInputSchema,
  getBlogPostBySlugInputSchema,
  getPublishedBlogPostsInputSchema
} from './schema';
import { createBlogPost } from './handlers/create_blog_post';
import { getBlogPosts } from './handlers/get_blog_posts';
import { getPublishedBlogPosts } from './handlers/get_published_blog_posts';
import { getBlogPostBySlug } from './handlers/get_blog_post_by_slug';
import { updateBlogPost } from './handlers/update_blog_post';
import { deleteBlogPost } from './handlers/delete_blog_post';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  
  // Create a new blog post
  createBlogPost: publicProcedure
    .input(createBlogPostInputSchema)
    .mutation(({ input }) => createBlogPost(input)),
  
  // Get all blog posts (admin view)
  getBlogPosts: publicProcedure
    .query(() => getBlogPosts()),
  
  // Get published blog posts only (public view)
  getPublishedBlogPosts: publicProcedure
    .input(getPublishedBlogPostsInputSchema.optional())
    .query(({ input }) => getPublishedBlogPosts(input)),
  
  // Get a single blog post by slug
  getBlogPostBySlug: publicProcedure
    .input(getBlogPostBySlugInputSchema)
    .query(({ input }) => getBlogPostBySlug(input)),
  
  // Update a blog post
  updateBlogPost: publicProcedure
    .input(updateBlogPostInputSchema)
    .mutation(({ input }) => updateBlogPost(input)),
  
  // Delete a blog post
  deleteBlogPost: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteBlogPost(input.id)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
