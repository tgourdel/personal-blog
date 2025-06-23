
import { type GetBlogPostBySlugInput, type BlogPost } from '../schema';

export declare function getBlogPostBySlug(input: GetBlogPostBySlugInput): Promise<BlogPost | null>;
