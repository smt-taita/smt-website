import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WelcomeModal from "@/components/WelcomeModal";
import StructuredData from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/next";
import { siteName, siteUrl } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Absolute base for OG/Twitter image URLs — social scrapers reject relative paths.
  metadataBase: new URL(siteUrl),
  title: {
    // Google shows this as the blue link. The city is here so the result
    // reads as local to someone searching "church near me" in Lower Hutt.
    default: `${siteName}, Lower Hutt`,
    template: `%s | ${siteName}`,
  },
  // Written to read well as a Google result snippet: ~155 characters, and it
  // front-loads what someone searching for a local church actually needs —
  // where we are, when we meet, and what a Sunday is like.
  description:
    "A small Anglican church in Taitā, Lower Hutt. We gather every Sunday at 9:30 AM, 53 Reynolds Street — worship, kai, and a kids' programme. All welcome.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteName,
    description:
      "Transformed by Jesus, Transforming our Neighbourhood. Serving the Taitā, Pomare, and Avalon communities.",
    url: siteUrl,
    siteName,
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description:
      "Transformed by Jesus, Transforming our Neighbourhood. Serving the Taitā, Pomare, and Avalon communities.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NZ" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <StructuredData />
        <Header />
        <main className="pt-14">
          {children}
        </main>
        <Footer />
        {/* Rendered last on purpose. A <dialog> sits in the browser's top
            layer once opened, so DOM order doesn't affect how it looks —
            but it does affect what a search engine reads first. When the
            modal led the <body>, Google built its result snippet out of
            the popup's text instead of the page's own. */}
        <WelcomeModal />
        {/* Vercel Web Analytics — cookieless and non-identifying, so no
            consent banner is needed. Counts visits from every source, which
            Search Console cannot see (it only counts Google search clicks). */}
        <Analytics />
      </body>
    </html>
  );
}
