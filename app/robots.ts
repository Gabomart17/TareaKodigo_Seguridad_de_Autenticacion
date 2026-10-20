import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/dashboard", "/auth/", "/reset-password"] }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
