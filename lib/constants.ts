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

/**
 * ⚠️ PHOTOS TEMPORAIRES libres de droits (Unsplash) — à remplacer par les
 * vraies réalisations de Jean Ba. Il suffit de garder les mêmes noms de
 * fichiers dans /public/images/realisations pour un remplacement 1-pour-1.
 */
export const REALISATIONS: Realisation[] = [
  {
    src: "/images/realisations/01-piscine.jpg",
    alt: "Aménagement paysager autour d'une piscine à Nîmes",
    title: "Jardin & piscine méditerranéens",
    category: "Piscine & Bassin",
    span: "wide",
  },
  {
    src: "/images/realisations/03-allee-glycine.jpg",
    alt: "Allée fleurie sous une glycine dans un jardin du Gard",
    title: "Allée sous glycine",
    category: "Création de jardin",
    span: "tall",
  },
  {
    src: "/images/realisations/02-terrasse.jpg",
    alt: "Terrasse extérieure aménagée avec espace détente",
    title: "Terrasse & espace détente",
    category: "Terrasse",
    span: "normal",
  },
  {
    src: "/images/realisations/04-jardin-paysager.jpg",
    alt: "Jardin paysager arboré et fleuri",
    title: "Jardin paysager arboré",
    category: "Création de jardin",
    span: "tall",
  },
  {
    src: "/images/realisations/05-parc-demeure.jpg",
    alt: "Parc et jardin d'une demeure de caractère",
    title: "Parc d'une demeure",
    category: "Création de jardin",
    span: "wide",
  },
  {
    src: "/images/realisations/06-massifs.jpg",
    alt: "Massifs fleuris entretenus dans un jardin méditerranéen",
    title: "Massifs fleuris",
    category: "Entretien",
    span: "normal",
  },
  {
    src: "/images/realisations/07-allee-arboree.jpg",
    alt: "Allée arborée menant à une maison",
    title: "Allée arborée",
    category: "Création de jardin",
    span: "wide",
  },
  {
    src: "/images/realisations/08-potager.jpg",
    alt: "Jardin potager structuré et dessiné",
    title: "Potager dessiné",
    category: "Création de jardin",
    span: "normal",
  },
  {
    src: "/images/realisations/09-espace-vert.jpg",
    alt: "Espace vert entretenu avec arbustes et pelouse",
    title: "Espace vert paysager",
    category: "Entretien",
    span: "tall",
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
