import "server-only";

import { getPostBySlug, getPublishedPosts, getRelatedPostsForSlug } from "@/lib/db-queries";

export async function getAllArticles() {
  return getPublishedPosts();
}

export async function getArticle(slug: string) {
  return getPostBySlug(slug);
}

export async function getArticleByCategory(slug: string) {
  return getRelatedPostsForSlug(slug, 3);
}
