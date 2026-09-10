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
  phone: "06 15 53 84 83",
  phoneHref: "+33615538483",
  email: "contact@jeanba-jardin.fr",
  // Destinataires des demandes de devis (boîte pro + boîte perso du gérant).
  leadRecipients: ["contact@jeanba-jardin.fr", "jeanbajardinier@laposte.net"],
  // Adresse (siège) — pour mentions légales & schema.
  address: {
    street: "Passage des Vendangeurs",
    postalCode: "30660",
    city: "Gallargues-le-Montueux",
    country: "France",
  },
  // Coordonnées GPS approx. de Nîmes (pour la carte). À ajuster sur l'adresse réelle.
  geo: { lat: 43.8367, lng: 4.3601 },
  hours: "Du lundi au samedi, 8h – 19h",
  url: "https://jeanba-jardin.fr",
  domain: "jeanba-jardin.fr",
  socials: {
    instagram: "https://www.instagram.com/jeanbajardin",
  },
  // SIRET / forme juridique — pour les mentions légales
  legal: {
    status: "SAS",
    siret: "931 563 035 00019",
    director: "Paul Jean-Baptiste",
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
      "Possibilité de créer des projections 3D de votre projet",
      "Sélection raisonnée des végétaux",
      "Devis détaillé, transparent et personnalisé",
    ],
  },
  {
    slug: "creation",
    title: "Création",
    short: "Donnez vie à votre projet d'aménagement avec le plus grand soin.",
    description:
      "De la première plantation aux ouvrages paysagers, nous façonnons l'intégralité de votre extérieur : massifs, allées, terrasses, gazon et arrosage automatique.",
    features: [
      "Création de massifs paysagers",
      "Terrasses sur plots et allées",
      "Pose de gazon naturel et synthétique",
      "Installation d'un arrosage automatique intégré et en goutte-à-goutte",
    ],
  },
  {
    slug: "entretien",
    title: "Entretien",
    short: "Maintenir sa beauté",
    description:
      "Un beau jardin se cultive dans la durée. Contrats d'entretien ou interventions ponctuelles : taille, tonte et soin des végétaux pour garder un extérieur impeccable toute l'année.",
    features: [
      "Taille raisonnée",
      "Tonte et entretien des gazons",
      "Désherbage manuel ou thermique et soin des massifs paysagers",
      "Contrats d'entretien sur mesure",
    ],
  },
];

/** Chiffres clés — affichés avec un compteur animé (preuve de sérieux). */
export type Stat = { value: number; suffix?: string; label: string };

export const STATS: Stat[] = [
  { value: 15, suffix: "+", label: "Ans d'expérience" },
  { value: 200, suffix: "+", label: "Jardins réalisés" },
  { value: 18, suffix: "", label: "Communes desservies" },
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
    title: "Pose de margelles et création de terrasse sur plots en travertin",
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
    src: "/images/realisations/marina-cour-apres.jpg",
    alt: "Cour couverte pavée de 65 m² aménagée par Jean Ba dans le Gard",
    title: "Pavage de cour couverte",
    category: "Terrasse",
    span: "tall",
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

/** Avis clients réels (Google). */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marina",
    city: "Mars 2025",
    rating: 5,
    text: "Jean Ba s'occupe de l'entretien de mon grand jardin, c'est parfait. Dernièrement, j'ai fait appel à sa société pour l'aménagement extérieur : pavage d'une cour couverte de 65 m². Le résultat est parfait, son équipe est professionnelle et adorable sur le plan humain. Je suis enchantée de leur travail. Bravo, je recommande à fond.",
  },
  {
    name: "Béatrice",
    city: "Avril 2025",
    rating: 5,
    text: "Grand remerciement à l'entreprise d'aménagement extérieur Jean Ba pour son professionnalisme et son sérieux. Outre la compétence des jardiniers qui travaillent rapidement, ils donnent volontiers des conseils et sont à votre écoute. Je recommande vivement ces pros !",
  },
];

/** Communes desservies — référencement local (autour de Lunel, entre Gard et Hérault). */
export const COMMUNES: string[] = [
  "Aimargues",
  "Aubais",
  "Gallargues-le-Montueux",
  "Lunel-Viel",
  "Calvisson",
  "Villetelle",
  "Aigues-Vives",
  "Mus",
  "Sommières",
  "La Grande-Motte",
  "Mauguio",
  "Castries",
  "Vendargues",
  "Uchaud",
  "Vauvert",
  "Marsillargues",
  "Saint-Laurent-d'Aigouze",
  "Saint-Just",
];
