import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WelcomeModal from "@/components/WelcomeModal";
import StructuredData from "@/components/StructuredData";
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
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    "Transformed by Jesus, Transforming our Neighbourhood. Join us Sundays at 9:30 AM, 53 Reynolds Street, Taitā.",
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
        <WelcomeModal />
        <Header />
        <main className="pt-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
