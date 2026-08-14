import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Served at /robots.txt. Everything on this site is public information we
 * want found, so there is nothing to disallow.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
