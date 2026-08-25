import { siteName, siteUrl } from "@/lib/site";

/**
 * schema.org `WebSite` JSON-LD — the site name shown above the blue link in a
 * Google result (where ours currently falls back to the bare domain,
 * "stmattstaita.org.nz").
 *
 * `og:site_name` alone is not enough: Google documents `WebSite` structured
 * data as the primary signal, and it only reads it from the homepage — hence
 * this renders in `page.tsx` rather than in the layout alongside the sitewide
 * `Church` entity.
 *
 * The short form is deliberate. Google wants a brief site name, and the full
 * church name is already the title on the line below, so using it in both
 * places just repeats itself.
 */
export default function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "St Matt's Taitā",
    alternateName: [siteName, "St Matthew's Anglican Church Taitā"],
    url: siteUrl,
    // Ties the site to the Church entity declared sitewide in StructuredData.
    publisher: { "@id": `${siteUrl}/#church` },
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is not user-supplied, so this is safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
