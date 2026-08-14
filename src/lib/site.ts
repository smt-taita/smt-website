/**
 * Canonical site constants.
 *
 * Everything that needs to know "where does this site live" reads from here —
 * metadataBase, canonical URLs, robots.txt, sitemap.xml, and the JSON-LD
 * structured data all derive from `siteUrl`.
 */

export const siteUrl = "https://stmattstaita.org.nz";

export const siteName = "St Matt's Anglican Church Taitā";

/**
 * The name on the Google Maps / Business Profile listing. Included as
 * `alternateName` in structured data so Google can connect the website
 * to the existing listing, which uses the full "St Matthew's" spelling.
 */
export const legalName = "St Matthew's Anglican Church";

export const contact = {
  /** E.164 format — required for structured data. */
  phone: "+64224097237",
  email: "admin@stmattstaita.org.nz",
  street: "53 Reynolds Street",
  suburb: "Taitā",
  city: "Lower Hutt",
  region: "Wellington",
  postalCode: "5011",
  countryCode: "NZ",
  /** Coordinates of the church building, taken from the Google Maps listing. */
  latitude: -41.1784671,
  longitude: 174.9565276,
} as const;

export const socialUrls = [
  "https://www.facebook.com/profile.php?id=100088895017140",
  "https://www.google.com/maps/place/St.+Matthew's+Anglican+Church/@-41.1790479,174.956379,19z",
];
