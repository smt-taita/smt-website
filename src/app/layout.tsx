import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WelcomeModal from "@/components/WelcomeModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Absolute base for OG/Twitter image URLs — social scrapers reject relative paths.
  metadataBase: new URL("https://stmattstaita.org.nz"),
  title: "St Matt's Anglican Church Taitā",
  description:
    "Transformed by Jesus, Transforming our Neighbourhood. Join us Sundays at 9:30 AM, 53 Reynolds Street, Taitā.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "St Matt's Anglican Church Taitā",
    description:
      "Transformed by Jesus, Transforming our Neighbourhood. Serving the Taitā, Pomare, and Avalon communities.",
    url: "/",
    siteName: "St Matt's Anglican Church Taitā",
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "St Matt's Anglican Church Taitā",
    description:
      "Transformed by Jesus, Transforming our Neighbourhood. Serving the Taitā, Pomare, and Avalon communities.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
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
