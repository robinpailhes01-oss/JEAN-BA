import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SITE } from "@/lib/constants";
import { localBusinessJsonLd } from "@/lib/seo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCta from "@/components/layout/MobileCta";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ScrollReset from "@/components/providers/ScrollReset";
import ScrollProgress from "@/components/ui/ScrollProgress";

// Fraunces — serif "old-style" optique et organique : la signature artisanale.
// Police variable : on charge la plage de graisses + axes opsz/SOFT.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

// Hanken Grotesk — grotesque chaleureux et lisible pour l'UI et le corps.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Paysagiste à ${SITE.city} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: `Paysagiste à ${SITE.city} (${SITE.department}). Conception, création et entretien de jardins et aménagements extérieurs. ${SITE.tagline}. Devis gratuit.`,
  keywords: [
    `paysagiste ${SITE.city}`,
    `aménagement jardin ${SITE.city}`,
    `création jardin ${SITE.department}`,
    "entretien jardin Nîmes",
    "paysagiste Gard",
    "aménagement extérieur Nîmes",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: `Paysagiste à ${SITE.city} (${SITE.department}). Conception, création et entretien de vos espaces extérieurs.`,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1920,
        height: 1280,
        alt: `Réalisation paysagère ${SITE.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: `Paysagiste à ${SITE.city} (${SITE.department}).`,
    images: ["/images/hero.jpg"],
  },
  alternates: {
    canonical: SITE.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#2D5016",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${hanken.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        <ScrollProgress />
        <SmoothScroll>
          <ScrollReset />
          <Header />
          <main className="pb-16 lg:pb-0">{children}</main>
          <Footer />
        </SmoothScroll>
        <MobileCta />
      </body>
    </html>
  );
}
