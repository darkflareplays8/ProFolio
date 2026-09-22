import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { listPublishedPosts } from "@/lib/posts";

const BASE_URL = "https://proflare.dev";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/projects`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const posts = await listPublishedPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
