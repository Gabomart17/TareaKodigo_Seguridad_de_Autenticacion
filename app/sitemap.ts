import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Solo páginas públicas y útiles para buscadores. Las privadas NO van aquí.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteConfig.url, changeFrequency: "monthly", priority: 1 }];
}
