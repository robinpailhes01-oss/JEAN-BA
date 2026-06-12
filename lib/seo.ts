import { SITE, COMMUNES, SERVICES } from "./constants";

/**
 * Schema.org LocalBusiness — crucial pour le référencement local d'un
 * paysagiste. Injecté en JSON-LD dans le <head> via le layout.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    description: `Paysagiste à ${SITE.city} (${SITE.department}). ${SITE.services}. ${SITE.tagline}.`,
    url: SITE.url,
    telephone: SITE.phoneHref,
    email: SITE.email,
    image: `${SITE.url}/images/hero.jpg`,
    logo: `${SITE.url}/images/brand/logo-icon-512.png`,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressRegion: SITE.region,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: COMMUNES.map((name) => ({
      "@type": "City",
      name,
    })),
    openingHours: "Mo-Sa 08:00-19:00",
    sameAs: [SITE.socials.instagram, SITE.socials.facebook, SITE.socials.linkedin],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de paysagisme",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.short,
        },
      })),
    },
  };
}
