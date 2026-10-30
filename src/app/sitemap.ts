import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/blog"].map((p) => ({ url: `https://arifsarkar.com${p}` }));
}
