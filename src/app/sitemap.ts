import type { MetadataRoute } from "next";
import profile from "@/data/profile";
import { getPosts } from "@/data/posts";

// Rebuilt hourly so new Sanity posts are listed without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const latest = posts[0]?.date ? new Date(posts[0].date) : undefined;

  return [
    { url: profile.website, changeFrequency: "weekly", priority: 1 },
    { url: `${profile.website}/blog`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({
      url: `${profile.website}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
