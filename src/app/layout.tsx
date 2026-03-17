import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "St Matt's Anglican Church Taitā",
  description:
    "One small church with one big heart. Join us Sundays at 9:30 AM, 53 Reynolds Street, Taitā.",
  openGraph: {
    title: "St Matt's Anglican Church Taitā",
    description:
      "One small church with one big heart. Serving the Taitā, Pomare, and Avalon communities.",
    type: "website",
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
        <Header />
        <main className="pt-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
