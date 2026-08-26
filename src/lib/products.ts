export type ProductCategory =
  | "tentes"
  | "sono"
  | "mobilier"
  | "eclairage"
  | "energie";

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: ProductCategory;
  tagline: string;
  pricePerDay: number;
  weekendPrice?: number;
  capacity?: string;
  size?: string;
  image: string;
  featured: boolean;
  installIncluded: boolean;
  installNote: string;
  description: string;
  includes: string[];
  specs: { label: string; value: string }[];
  options: { name: string; price: string }[];
};

export const categories: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "tentes", label: "Tentes & chapiteaux" },
  { id: "sono", label: "Sono & scène" },
  { id: "mobilier", label: "Mobilier" },
  { id: "eclairage", label: "Éclairage" },
  { id: "energie", label: "Énergie" },
];

export const products: Product[] = [
  {
    slug: "tente-pliante-3x3",
    name: "Tente pliante 3 × 3 m",
    shortName: "3 × 3 m",
    category: "tentes",
    tagline: "Cocktail, kiosque, entrée de site",
    pricePerDay: 95,
    weekendPrice: 160,
    capacity: "12 à 16 personnes",
    size: "3 × 3 m",
    image: "/images/wedding-garden.jpg",
    featured: true,
    installIncluded: false,
    installNote: "Livraison et installation en option : 75 $",
    description:
      "Tente pliante professionnelle, structure aluminium et toile 600D. Idéale pour un bar extérieur, un kiosque de festival ou un abri d’accueil. Montage rapide, ancrage compris.",
    includes: ["Structure aluminium", "Toile blanche", "Sacs de transport", "Poids d’ancrage"],
    specs: [
      { label: "Dimensions", value: "3 × 3 m · 2,6 m au faîte" },
      { label: "Toile", value: "Polyester 600D, ignifuge" },
      { label: "Parois", value: "En option" },
      { label: "Délai", value: "Réservation 48 h à l’avance" },
    ],
    options: [
      { name: "Parois latérales (4)", price: "35 $/jour" },
      { name: "Guirlandes LED", price: "25 $/jour" },
    ],
  },
  {
    slug: "tente-pliante-3x6",
    name: "Tente pliante 3 × 6 m",
    shortName: "3 × 6 m",
    category: "tentes",
    tagline: "Buffet, inscription, coin lounge",
    pricePerDay: 165,
    weekendPrice: 275,
    capacity: "24 à 32 personnes",
    size: "3 × 6 m",
    image: "/images/outdoor-dining.jpg",
    featured: true,
    installIncluded: false,
    installNote: "Livraison et installation en option : 95 $",
    description:
      "Double module 3 × 6 m pour un buffet, un vestiaire ou un espace photo. Toile tendue, look propre, prête pour un mariage de jardin ou un corporatif en terrasse.",
    includes: ["Deux modules couplés", "Toile blanche", "Ancrage", "Sacs de transport"],
    specs: [
      { label: "Dimensions", value: "3 × 6 m" },
      { label: "Hauteur", value: "2,6 m au faîte" },
      { label: "Plancher", value: "Non inclus" },
      { label: "Vent", value: "Ancrage obligatoire dès 30 km/h" },
    ],
    options: [
      { name: "Parois complètes", price: "55 $/jour" },
      { name: "Plancher bois 3 × 6", price: "120 $/jour" },
    ],
  },
  {
    slug: "chapiteau-5x10",
    name: "Chapiteau 5 × 10 m",
    shortName: "5 × 10 m",
    category: "tentes",
    tagline: "Réception 40 à 60 convives",
    pricePerDay: 475,
    weekendPrice: 790,
    capacity: "40 à 60 personnes",
    size: "5 × 10 m",
    image: "/images/tables.jpg",
    featured: true,
    installIncluded: true,
    installNote: "Installation et démontage inclus",
    description:
      "Chapiteau structure aluminium, toile tendue, pour un cocktail dînatoire ou un dîner assis. Notre équipe installe, ancre et reprend le lendemain. Clé en main, sans improvisation.",
    includes: [
      "Structure et toile",
      "Installation et démontage",
      "Ancrage ou lestage",
      "Éclairage de base",
    ],
    specs: [
      { label: "Dimensions", value: "5 × 10 m · 50 m²" },
      { label: "Assis", value: "40 à 50 places" },
      { label: "Debout", value: "jusqu’à 70" },
      { label: "Délai", value: "7 jours recommandés" },
    ],
    options: [
      { name: "Parois cristal", price: "140 $/jour" },
      { name: "Plancher 5 × 10", price: "285 $/jour" },
      { name: "Chauffage", price: "95 $/jour" },
    ],
  },
  {
    slug: "chapiteau-10x20",
    name: "Chapiteau 10 × 20 m",
    shortName: "10 × 20 m",
    category: "tentes",
    tagline: "Mariage, gala, festival",
    pricePerDay: 1290,
    weekendPrice: 2190,
    capacity: "150 à 220 personnes",
    size: "10 × 20 m",
    image: "/images/tent-exterieur.jpg",
    featured: true,
    installIncluded: true,
    installNote: "Installation, ancrage et démontage inclus",
    description:
      "Le format signature pour un mariage de 150 personnes ou une scène de festival. Structure professionnelle, toile blanche, éclairage architectural. On arrive en convoi, on installe, vous célebrez.",
    includes: [
      "Chapiteau 10 × 20 m",
      "Installation complète",
      "Ancrage / lestage",
      "Éclairage architectural",
      "Reprise et nettoyage",
    ],
    specs: [
      { label: "Surface", value: "200 m²" },
      { label: "Assis banquet", value: "150 à 180" },
      { label: "Debout", value: "jusqu’à 250" },
      { label: "Délai", value: "14 jours recommandés" },
    ],
    options: [
      { name: "Parois cristal", price: "320 $/jour" },
      { name: "Plancher complet", price: "890 $/jour" },
      { name: "Scène 4 × 6 m", price: "385 $/jour" },
    ],
  },
  {
    slug: "tente-stretch",
    name: "Tente stretch 8 × 12 m",
    shortName: "Stretch",
    category: "tentes",
    tagline: "Look festival, photo-ready",
    pricePerDay: 720,
    weekendPrice: 1190,
    capacity: "60 à 90 personnes",
    size: "8 × 12 m",
    image: "/images/cocktail.jpg",
    featured: true,
    installIncluded: true,
    installNote: "Installation incluse",
    description:
      "Toile stretch sculpturale pour un cocktail, un after ou un village festival. Silhouette organique, éclairage qui accroche le tissu, impact visuel immédiat.",
    includes: ["Toile stretch", "Mâts et haubans", "Installation", "Éclairage d’ambiance"],
    specs: [
      { label: "Emprise", value: "environ 8 × 12 m" },
      { label: "Look", value: "Organique, photo-ready" },
      { label: "Sol", value: "Gazon, gravier, asphalte" },
      { label: "Délai", value: "10 jours" },
    ],
    options: [
      { name: "Guirlandes festives", price: "85 $/jour" },
      { name: "Lounge 8 places", price: "240 $/jour" },
    ],
  },
  {
    slug: "pagode-5x5",
    name: "Pagode 5 × 5 m",
    shortName: "Pagode",
    category: "tentes",
    tagline: "Cérémonie, bar, photo booth",
    pricePerDay: 385,
    weekendPrice: 640,
    capacity: "20 à 30 personnes",
    size: "5 × 5 m",
    image: "/images/tent-mariage.jpg",
    featured: false,
    installIncluded: true,
    installNote: "Installation incluse",
    description:
      "Pagode haute, lignes nettes. Parfaite comme chapelle de cérémonie, bar VIP ou point de rencontre. On la place, on l’éclaire, elle devient le décor.",
    includes: ["Pagode 5 × 5", "Toile et jupes", "Installation", "Éclairage intérieur"],
    specs: [
      { label: "Base", value: "5 × 5 m" },
      { label: "Hauteur faîte", value: "5 m" },
      { label: "Usage", value: "Cérémonie, bar, accueil" },
      { label: "Délai", value: "7 jours" },
    ],
    options: [
      { name: "Parois cristal", price: "90 $/jour" },
      { name: "Tapis de cérémonie", price: "45 $/jour" },
    ],
  },
  {
    slug: "sono-200",
    name: "Système sono 200 personnes",
    shortName: "Sono 200",
    category: "sono",
    tagline: "Mariage, cocktail, conférence",
    pricePerDay: 275,
    weekendPrice: 430,
    capacity: "jusqu’à 200 personnes",
    image: "/images/speakers.jpg",
    featured: true,
    installIncluded: true,
    installNote: "Câblage et réglage inclus",
    description:
      "Deux tops, un sub, console numérique, micros sans fil. Assez de punch pour un premier dancefloor, assez propre pour un discours. On règle, vous jouez.",
    includes: ["2 tops + 1 sub", "Console", "2 micros sans fil", "Pieds et câbles", "Réglage"],
    specs: [
      { label: "Couverture", value: "jusqu’à 200 personnes" },
      { label: "Entrées", value: "Bluetooth, jack, XLR" },
      { label: "Technicien", value: "En option" },
      { label: "Délai", value: "48 h" },
    ],
    options: [
      { name: "Technicien sur place", price: "55 $/h" },
      { name: "Micro cravate extra", price: "35 $/jour" },
    ],
  },
  {
    slug: "sono-500",
    name: "Système sono 500 personnes",
    shortName: "Sono 500",
    category: "sono",
    tagline: "Festival, plein air, corporatif",
    pricePerDay: 495,
    weekendPrice: 790,
    capacity: "jusqu’à 500 personnes",
    image: "/images/concert.jpg",
    featured: true,
    installIncluded: true,
    installNote: "Installation et line check inclus",
    description:
      "Line-up festival : tops, subs, retours, console. Conçu pour un champ, un stationnement, un parc municipal. On arrive, on aligne, ça porte.",
    includes: ["Line array compact + subs", "Console 16 voies", "Micros", "Line check"],
    specs: [
      { label: "Couverture", value: "jusqu’à 500 personnes" },
      { label: "Alimentation", value: "30 A recommandé" },
      { label: "Technicien", value: "Fortement recommandé" },
      { label: "Délai", value: "7 jours" },
    ],
    options: [
      { name: "Technicien (bloc 4 h)", price: "220 $" },
      { name: "Retours de scène", price: "85 $/jour" },
    ],
  },
  {
    slug: "tables-chaises",
    name: "Pack tables + chaises (10 places)",
    shortName: "Tables",
    category: "mobilier",
    tagline: "Dîner assis, clé en main",
    pricePerDay: 85,
    image: "/images/outdoor-dining.jpg",
    featured: false,
    installIncluded: false,
    installNote: "Mise en place en option : 40 $",
    description:
      "Une table ronde 60 po, nappe sable, dix chaises banquet. Multipliez le pack selon vos invités. Simple, propre, prêt à dresser.",
    includes: ["1 table ronde 60 po", "Nappe", "10 chaises banquet"],
    specs: [
      { label: "Places", value: "10 par pack" },
      { label: "Nappe", value: "Sable / ivoire" },
      { label: "Livraison", value: "Selon secteur" },
      { label: "Délai", value: "72 h" },
    ],
    options: [
      { name: "Housses de chaises", price: "2,50 $/chaise" },
      { name: "Centre de table", price: "18 $/table" },
    ],
  },
  {
    slug: "eclairage-ambiance",
    name: "Pack éclairage ambiance",
    shortName: "Lumière",
    category: "eclairage",
    tagline: "Guirlandes, uplights, punch",
    pricePerDay: 195,
    image: "/images/festival.jpg",
    featured: true,
    installIncluded: true,
    installNote: "Installation et programmation incluses",
    description:
      "Uplights forest et chocolat, guirlandes, wash de scène. On sculpte le chapiteau, le jardin, la façade. L’événement change de registre dès que ça s’allume.",
    includes: ["8 uplights", "Guirlandes 20 m", "Contrôleur", "Installation"],
    specs: [
      { label: "Look", value: "Chaud, architectural" },
      { label: "Alimentation", value: "15 A" },
      { label: "Extérieur", value: "Oui, IP65" },
      { label: "Délai", value: "72 h" },
    ],
    options: [
      { name: "Lyres extra (paire)", price: "75 $/jour" },
      { name: "Projecteur logo", price: "55 $/jour" },
    ],
  },
  {
    slug: "generatrice-6500",
    name: "Génératrice 6500 W",
    shortName: "Gén. 6500 W",
    category: "energie",
    tagline: "Site hors réseau, festival, champ",
    pricePerDay: 165,
    image: "/images/truck.jpg",
    featured: false,
    installIncluded: false,
    installNote: "Livraison et mise en route : 65 $",
    description:
      "Quand le champ n’a pas de prise. 6500 W insonorisée, assez pour sono, éclairage et bar. On livre, on démarre, on reprend.",
    includes: ["Génératrice 6500 W", "Câbles de distribution", "Pleine d’essence au départ"],
    specs: [
      { label: "Puissance", value: "6500 W" },
      { label: "Bruit", value: "Insonorisée" },
      { label: "Autonomie", value: "8 à 10 h" },
      { label: "Délai", value: "48 h" },
    ],
    options: [
      { name: "Essence extra (jerrican)", price: "45 $" },
      { name: "Distribution 4 circuits", price: "35 $/jour" },
    ],
  },
  {
    slug: "plancher-danse",
    name: "Plancher de danse 4 × 4 m",
    shortName: "Dancefloor",
    category: "mobilier",
    tagline: "Le premier slow, le dernier hit",
    pricePerDay: 185,
    image: "/images/scene.jpg",
    featured: false,
    installIncluded: true,
    installNote: "Installation incluse",
    description:
      "Plancher bois 4 × 4 m, surface stable, look soirée. On le pose dans le chapiteau ou en terrasse. Assez grand pour que ça parte.",
    includes: ["Modules 4 × 4 m", "Installation", "Finition bois"],
    specs: [
      { label: "Surface", value: "16 m²" },
      { label: "Finition", value: "Bois chêne" },
      { label: "Extérieur", value: "Oui, sous tente" },
      { label: "Délai", value: "5 jours" },
    ],
    options: [
      { name: "Extension 4 × 8 m", price: "320 $/jour" },
      { name: "Éclairage dancefloor", price: "75 $/jour" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function featuredProducts() {
  return products.filter((product) => product.featured);
}

export const categoryLabel: Record<ProductCategory, string> = {
  tentes: "Tentes & chapiteaux",
  sono: "Sono & scène",
  mobilier: "Mobilier",
  eclairage: "Éclairage",
  energie: "Énergie",
};
