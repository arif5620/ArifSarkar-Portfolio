import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { articles } from "@/data/articles";

export type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readMinutes: number;
};

// Old digital-marketing posts still live in Sanity; keep them off the realtor site.
const query = `*[_type=="post" && defined(slug.current) && !(categories[0]->title in ["WordPress","Meta Ads","AI","SEO"])]
  | order(publishedAt desc){ title, "slug": slug.current, publishedAt, excerpt, mainImage, "category": categories[0]->title }`;

type SanityPost = {
  title: string;
  slug: string;
  publishedAt?: string;
  excerpt?: string;
  mainImage?: SanityImageSource;
  category?: string;
};

export async function getPosts(): Promise<PostCard[]> {
  let cms: SanityPost[] = [];
  try {
    cms = await client.fetch<SanityPost[]>(query);
  } catch (error) {
    console.error("Failed to load Sanity posts:", error);
  }

  const local: PostCard[] = articles.map(({ slug, title, excerpt, category, date, image, readMinutes }) => ({
    slug, title, excerpt, category, date, image, readMinutes,
  }));
  const remote: PostCard[] = cms.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    category: p.category ?? "Insights",
    date: p.publishedAt ?? "",
    image: p.mainImage ? urlFor(p.mainImage).width(1200).url() : articles[0].image,
    readMinutes: 5,
  }));

  return [...local, ...remote].sort((a, b) => b.date.localeCompare(a.date));
}
