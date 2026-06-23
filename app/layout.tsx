import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
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
    <html lang="fr" className={`${playfair.variable} ${montserrat.variable}`}>
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
