/**
 * Configuration centrale du site Jean Ba Paysagiste.
 * ⚠️ TOUT le contenu éditable est ici : coordonnées, services, réalisations, avis.
 * Robin n'a qu'à modifier ce fichier pour mettre à jour le site.
 *
 * Les valeurs entre [crochets] ou marquées TODO sont des PLACEHOLDERS
 * à remplacer par les vraies infos avant la mise en ligne.
 */

export const SITE = {
  name: "Jean Ba Paysagiste",
  legalName: "Jean Ba — Jardin & Aménagement Extérieur",
  tagline: "Créateur de jardins d'exception",
  baseline: "Jardin & Aménagement Extérieur",
  services: "Conception · Création · Entretien",
  city: "Nîmes",
  department: "Gard",
  departmentCode: "30",
  region: "Occitanie",
  // ⚠️ PLACEHOLDERS — à remplacer avant mise en ligne
  phone: "07 00 00 00 00",
  phoneHref: "+33700000000",
  email: "contact@jeanba-paysagiste.fr",
  // Adresse (siège) — pour mentions légales & schema. À compléter.
  address: {
    street: "—",
    postalCode: "30000",
    city: "Nîmes",
    country: "France",
  },
  // Coordonnées GPS approx. de Nîmes (pour la carte). À ajuster sur l'adresse réelle.
  geo: { lat: 43.8367, lng: 4.3601 },
  hours: "Du lundi au samedi, 8h – 19h",
  url: "https://jeanba-paysagiste.fr",
  domain: "jeanba-paysagiste.fr",
  socials: {
    instagram: "https://instagram.com/jeanba_paysagiste",
    facebook: "https://facebook.com/jeanbapaysagiste",
    linkedin: "https://linkedin.com/company/jeanba",
  },
  // SIRET / forme juridique — à compléter pour les mentions légales
  legal: {
    status: "Entreprise individuelle", // TODO à confirmer
    siret: "TODO — n° SIRET",
    director: "Jean Ba",
  },
} as const;

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Services", href: "/#services" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  features: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "conception",
    title: "Conception",
    short: "Le plan de votre futur jardin",
    description:
      "Nous dessinons votre projet sur mesure : étude du terrain, plan d'aménagement, choix des végétaux adaptés au climat méditerranéen et mise en perspective 3D.",
    image: "/images/services/conception.jpg",
    features: [
      "Étude et analyse du terrain",
      "Plan d'aménagement personnalisé",
      "Sélection des végétaux méditerranéens",
      "Devis détaillé et transparent",
    ],
  },
  {
    slug: "creation",
    title: "Création",
    short: "Nous donnons vie à votre jardin",
    description:
      "De la plantation aux ouvrages paysagers, nous réalisons l'intégralité de votre aménagement extérieur : massifs, allées, terrasses, gazon, arrosage automatique et bien plus.",
    image: "/images/services/creation.jpg",
    features: [
      "Création de massifs et plantations",
      "Terrasses, allées & pas japonais",
      "Engazonnement et gazon synthétique",
      "Arrosage automatique intégré",
    ],
  },
  {
    slug: "entretien",
    title: "Entretien",
    short: "Un jardin beau toute l'année",
    description:
      "Contrats d'entretien annuels ou interventions ponctuelles : taille, tonte, élagage, désherbage et soin des végétaux pour préserver la beauté de votre extérieur.",
    image: "/images/services/entretien.jpg",
    features: [
      "Taille et élagage raisonnés",
      "Tonte et entretien des gazons",
      "Désherbage et soin des massifs",
      "Contrats annuels sur mesure",
    ],
  },
];

export type Category =
  | "Tout"
  | "Création de jardin"
  | "Terrasse"
  | "Piscine & Bassin"
  | "Entretien";

export const CATEGORIES: Category[] = [
  "Tout",
  "Création de jardin",
  "Terrasse",
  "Piscine & Bassin",
  "Entretien",
];

export type Realisation = {
  src: string;
  alt: string;
  title: string;
  category: Exclude<Category, "Tout">;
  // ratio d'affichage pour la grille masonry
  span?: "tall" | "wide" | "normal";
};

export const REALISATIONS: Realisation[] = [
  {
    src: "/images/realisations/olivier-nuage-apres.jpg",
    alt: "Olivier taillé en nuage dans un jardin du Gard",
    title: "Taille d'olivier en nuage",
    category: "Entretien",
    span: "wide",
  },
  {
    src: "/images/realisations/piscine-apres.jpg",
    alt: "Plage de piscine carrelée aménagée à Nîmes",
    title: "Plage de piscine carrelée",
    category: "Piscine & Bassin",
    span: "tall",
  },
  {
    src: "/images/realisations/jardin-apres.jpg",
    alt: "Pelouse et jardin remis en état dans le Gard",
    title: "Remise en état de jardin",
    category: "Entretien",
    span: "normal",
  },
  {
    src: "/images/realisations/olivier-nuage-avant.jpg",
    alt: "Olivier avant taille, jardinage dans le Gard",
    title: "Élagage & taille d'arbres",
    category: "Entretien",
    span: "tall",
  },
  {
    src: "/images/camion-jean-ba.jpg",
    alt: "Camion Jean Ba Paysagiste en intervention dans le Gard",
    title: "Jean Ba en intervention",
    category: "Création de jardin",
    span: "wide",
  },
  {
    src: "/images/realisations/jardin-avant.jpg",
    alt: "Grand jardin avec olivier centenaire dans le Gard",
    title: "Entretien de grand jardin",
    category: "Entretien",
    span: "normal",
  },
];

export type Testimonial = {
  name: string;
  city: string;
  rating: number;
  text: string;
};

/** ⚠️ TÉMOIGNAGES TYPES — à remplacer par de vrais avis clients. */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Claire M.",
    city: "Nîmes",
    rating: 5,
    text: "Jean a transformé notre jardin en un véritable havre de paix méditerranéen. Travail soigné, conseils avisés et délais respectés. Nous recommandons sans hésiter.",
  },
  {
    name: "Thomas & Sophie L.",
    city: "Uzès",
    rating: 5,
    text: "De la conception à la création, tout a été parfait. L'équipe est à l'écoute et le rendu dépasse nos attentes. Notre terrasse est devenue notre pièce préférée.",
  },
  {
    name: "Marc D.",
    city: "Caissargues",
    rating: 5,
    text: "Entretien impeccable de notre propriété depuis deux ans. Ponctuel, professionnel et passionné. Un vrai savoir-faire local que l'on apprécie.",
  },
];

/** Communes desservies — référencement local (Nîmes et alentours, Gard). */
export const COMMUNES: string[] = [
  "Nîmes",
  "Caissargues",
  "Marguerittes",
  "Bouillargues",
  "Milhaud",
  "Saint-Gilles",
  "Garons",
  "Manduel",
  "Bezouce",
  "Redessan",
  "Uzès",
  "Beaucaire",
  "Bernis",
  "Générac",
  "Rodilhan",
  "Poulx",
];
