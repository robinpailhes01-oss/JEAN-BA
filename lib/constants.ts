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
  tagline: "Créateur de jardins sur-mesure",
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
    instagram: "https://www.instagram.com/jeanbajardin",
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
  features: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "conception",
    title: "Conception",
    short: "Imaginer votre futur extérieur",
    description:
      "Tout commence par une vision. Nous étudions votre terrain, son exposition et vos envies, puis traduisons le tout en un plan d'aménagement clair, jusqu'au choix des végétaux et des matières.",
    features: [
      "Visite et analyse du terrain",
      "Plan d'aménagement personnalisé",
      "Sélection raisonnée des végétaux",
      "Devis détaillé et transparent",
    ],
  },
  {
    slug: "creation",
    title: "Création",
    short: "Donner vie au projet",
    description:
      "De la première plantation aux ouvrages paysagers, nous façonnons l'intégralité de votre extérieur avec un soin d'artisan : massifs, allées, terrasses, gazon et arrosage automatique.",
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
    short: "Préserver sa beauté, saison après saison",
    description:
      "Un beau jardin se cultive dans la durée. Contrats annuels ou interventions ponctuelles : taille, tonte, élagage et soin des végétaux pour garder un extérieur impeccable toute l'année.",
    features: [
      "Taille et élagage raisonnés",
      "Tonte et entretien des gazons",
      "Désherbage et soin des massifs",
      "Contrats annuels sur mesure",
    ],
  },
];

/** Chiffres clés — affichés avec un compteur animé (preuve de sérieux). */
export type Stat = { value: number; suffix?: string; label: string };

export const STATS: Stat[] = [
  { value: 15, suffix: "+", label: "Ans d'expérience" },
  { value: 200, suffix: "+", label: "Jardins réalisés" },
  { value: 16, suffix: "", label: "Communes desservies" },
  { value: 48, suffix: " h", label: "Réponse à votre devis" },
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
    src: "/images/realisations/virginie-massif.jpg",
    alt: "Massif de plantes et galets blancs le long d'une clôture en bois dans le Gard",
    title: "Massif, galets & clôture bois",
    category: "Création de jardin",
    span: "wide",
  },
  {
    src: "/images/realisations/virginie-piscine.jpg",
    alt: "Piscine avec plage en pierre claire et massifs de galets blancs près de Nîmes",
    title: "Piscine & plage minérale",
    category: "Piscine & Bassin",
    span: "tall",
  },
  {
    src: "/images/realisations/virginie-cloture.jpg",
    alt: "Aménagement de jardin avec gazon synthétique, terrasse et clôture bois dans le Gard",
    title: "Gazon, terrasse & clôture",
    category: "Terrasse",
    span: "wide",
  },
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

/**
 * Avis client réel mis en avant (avec photos du chantier).
 */
export const FEATURED_TESTIMONIAL = {
  name: "Virginie",
  date: "Juin 2025",
  rating: 5,
  text: "Un grand merci à Jean Ba et son équipe pour l'aménagement de notre jardin. Nous sommes vraiment ravis du résultat, ils ont fait un super travail. Ils sont très professionnels, sérieux et surtout très à l'écoute et de bons conseils. Merci encore, on va enfin pouvoir profiter de notre extérieur ! Nous les recommandons sans hésitation.",
  images: [
    {
      src: "/images/realisations/virginie-piscine.jpg",
      alt: "Piscine et plage minérale réalisées par Jean Ba pour Virginie",
    },
    {
      src: "/images/realisations/virginie-massif.jpg",
      alt: "Massif de plantes et galets blancs réalisés par Jean Ba pour Virginie",
    },
    {
      src: "/images/realisations/virginie-cloture.jpg",
      alt: "Gazon, terrasse et clôture bois réalisés par Jean Ba pour Virginie",
    },
  ],
} as const;

/** ⚠️ TÉMOIGNAGES TYPES — à remplacer par de vrais avis clients. */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Claire M.",
    city: "Nîmes",
    rating: 5,
    text: "Jean a transformé notre jardin en un véritable havre de paix. Travail soigné, conseils avisés et délais respectés. Nous recommandons sans hésiter.",
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
