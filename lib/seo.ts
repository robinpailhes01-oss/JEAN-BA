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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "59",
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: COMMUNES.map((name) => ({
      "@type": "City",
      name,
    })),
    openingHours: "Mo-Sa 08:00-19:00",
    sameAs: [SITE.socials.instagram],
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

export function faqJsonLd() {
  const faqs = [
    {
      q: "Intervenez-vous uniquement à Nîmes ?",
      a: `Non, Jean Ba Paysagiste intervient dans tout le Gard et l'Hérault : Nîmes, Lunel, Sommières, Uzès, Beaucaire, Sète, Vauvert et les communes alentour.`,
    },
    {
      q: "Le devis est-il vraiment gratuit ?",
      a: "Oui, le devis est entièrement gratuit et sans engagement. Jean Ba se déplace sur site pour évaluer votre projet et vous remet un devis détaillé sous 48 h.",
    },
    {
      q: "Quels types de travaux réalisez-vous ?",
      a: "Jean Ba Paysagiste prend en charge la conception de jardins, la création de massifs et plantations, les terrasses, les allées, l'engazonnement, l'arrosage automatique, la taille d'arbres et l'entretien régulier.",
    },
    {
      q: "Proposez-vous des contrats d'entretien annuels ?",
      a: "Oui, nous proposons des contrats d'entretien sur mesure adaptés à votre jardin et à votre budget, avec des interventions planifiées tout au long de l'année.",
    },
    {
      q: "Combien de temps faut-il pour obtenir un devis ?",
      a: "Après la visite gratuite sur site, vous recevez votre devis détaillé sous 48 heures.",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
