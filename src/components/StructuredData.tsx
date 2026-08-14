import { contact, legalName, siteName, siteUrl, socialUrls } from "@/lib/site";

/**
 * schema.org JSON-LD describing the church as a physical place.
 *
 * This is what feeds Google's local results and knowledge panel — the address,
 * coordinates, phone number, and Sunday service time all come from here. It
 * renders sitewide with a stable `@id`, so both pages describe the same entity
 * rather than declaring two separate churches.
 *
 * `alternateName` carries the "St Matthew's" spelling used on the Google Maps
 * listing, which helps Google connect this site to that listing.
 */
export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Church",
    "@id": `${siteUrl}/#church`,
    name: siteName,
    alternateName: legalName,
    description:
      "Transformed by Jesus, Transforming our Neighbourhood. A small Anglican church serving the Taitā, Pomare, and Avalon communities in Lower Hutt.",
    url: siteUrl,
    logo: `${siteUrl}/smt-logo.jpg`,
    image: `${siteUrl}/smt-logo.jpg`,
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.street,
      addressLocality: contact.suburb,
      addressRegion: contact.region,
      postalCode: contact.postalCode,
      addressCountry: contact.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.latitude,
      longitude: contact.longitude,
    },
    // The Sunday gathering: 9:30 AM, running about an hour and a half.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:30",
        closes: "11:00",
      },
    ],
    sameAs: socialUrls,
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is not user-supplied, so this is safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
