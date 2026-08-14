import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Served at /sitemap.xml. The site is two static pages, so this is written by
 * hand rather than generated — add a route here whenever a page is added.
 *
 * `lastModified` is stamped at build time. The content is static, so a deploy
 * is the only thing that can change it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/hall-hire`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
