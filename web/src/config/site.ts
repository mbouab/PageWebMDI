/**
 * SOURCE UNIQUE de tout le contenu variable du site.
 * Aucune de ces valeurs ne doit être écrite en dur dans le JSX.
 * (Contrainte testée : T-1.1, T-1.2, T-1.3, T-5.x du cahier des charges.)
 */

export const PRODUCT_NAME = "Le Passe";
export const PRODUCT_TAGLINE = "le pilotage de votre restaurant";
export const COMPANY_NAME = "MDI — Management Data Innovation";

/** Bascule la section Clients en version anonymisée tant que l'accord de
 *  citation nominative (Boma Beach / l'Univert Plage) n'est pas obtenu. */
export const showClientNames = true; // ⚠️ À CONFIRMER avec les clients

export const site = {
  productName: PRODUCT_NAME,
  tagline: PRODUCT_TAGLINE,
  company: COMPANY_NAME,

  hero: {
    headline: "Vos données restaurant, chaque matin sur WhatsApp.",
    subhead:
      "Sans BI, sans contrôleur de gestion. Un rapport automatique à 5 h du matin, et des réponses instantanées à toutes vos questions de pilotage.",
    ctaPrimary: "Demander une démo",
    ctaSecondary: "Voir un exemple",
  },

  /** Message d'ancrage affiché au-dessus des cartes de prix. */
  pricingAnchor:
    "À la place d'un contrôleur de gestion à temps partiel (≈ 2 000–3 000 €/mois chargé) et de plusieurs outils de BI, une seule solution — à partir de quelques centaines d'euros par mois.",

  pricing: {
    currency: "EUR",
    vatNote:
      "Tarifs HT. TVA applicable selon localisation (ex. 8,5 % à La Réunion).",

    /** Annuel = 2 mois offerts (≈ −17 %). Piloté par le toggle Mensuel/Annuel. */
    annual: { monthsFree: 2, savingsPct: 17 },

    plans: [
      {
        id: "solo",
        segment: "solo" as const,
        name: "Solo",
        target: "1 restaurant",
        catalogMonthly: 490, // € HT / mois
        setupFee: 990, // € HT (offerte au lancement)
        setupWaivedAtLaunch: true,
        unit: "par mois",
        anchorLine: "≈ 6× moins cher qu'un contrôleur de gestion à temps partiel",
        highlighted: false,
        features: [
          "Rapport quotidien automatique sur WhatsApp",
          "Questions en langage naturel (CA, achats, RH, avis)",
          "Connecteurs caisse + RH + achats + avis Google",
          "Suivi objectifs & écart au point mort",
        ],
      },
      {
        id: "groupe",
        segment: "groupe" as const,
        name: "Groupe",
        target: "2 à 5 restaurants",
        catalogMonthly: 390, // € HT / mois / restaurant
        setupFee: 1490,
        setupWaivedAtLaunch: true,
        unit: "par restaurant / mois",
        anchorLine: "Tarif dégressif : plus vous avez de sites, moins c'est cher",
        highlighted: true, // badge « La plus choisie », bordure emerald
        badge: "La plus choisie",
        features: [
          "Tout Solo, pour chaque établissement",
          "Consolidation & comparatifs inter-sites",
          "Prévisions de CA et de staffing à 10 jours",
          "Vue holding pour la direction",
        ],
      },
      {
        id: "reseau",
        segment: "reseau" as const,
        name: "Réseau",
        target: "6+ restaurants / franchise",
        catalogMonthly: null, // → « Sur devis »
        setupFee: null,
        setupWaivedAtLaunch: false,
        unit: "sur devis",
        anchorLine: "Tarification dégressive au volume",
        highlighted: false,
        features: [
          "Tout Groupe, à l'échelle du réseau",
          "Déploiement standardisé multi-établissements",
          "Onboarding dédié & SLA",
          "Accompagnement franchiseur",
        ],
      },
    ],

    /** Offres de lancement listées sous les cartes (bloc « arguments »). */
    offers: [
      {
        id: "setup",
        title: "Mise en service offerte",
        body: "Frais d'installation offerts pour toute signature avant le 31 décembre 2026 (valeur 990 à 1 490 €).",
      },
      {
        id: "pilot",
        title: "Pilote 30 jours",
        body: "Satisfait ou remboursé pendant les 30 premiers jours.",
      },
      {
        id: "annual",
        title: "2 mois offerts",
        body: "En paiement annuel (≈ −17 %).",
      },
      {
        id: "referral",
        title: "Parrainage",
        body: "1 mois offert au nouveau client parrainé, dès sa signature.",
      },
    ],
  },

  /** Segments du formulaire de contact (doivent matcher plans[].segment). */
  segments: [
    { value: "solo", label: "Restaurant indépendant (1 site)" },
    { value: "groupe", label: "Groupe (2 à 5 sites)" },
    { value: "reseau", label: "Réseau / franchise (6+ sites)" },
  ] as const,

  clients: {
    heading: "Ils pilotent déjà avec Le Passe",
    groupName: "Groupe Abondance",
    location: "Île de La Réunion",
    // Affichés seulement si showClientNames = true
    named: [
      {
        name: "Boma Beach",
        place: "Boucan Canot, La Réunion",
        logo: "/assets/logo-boma-beach.png",
      },
      {
        name: "l'Univert Plage",
        place: "La Réunion",
        logo: "/assets/logo-univert.jpg",
      },
    ],
    // Variante anonymisée (fallback)
    anonymous: [
      { name: "Groupe de restauration", place: "2 établissements, La Réunion" },
    ],
    // ⚠️ Verbatims à obtenir/valider avant affichage.
    testimonial: null as null | { quote: string; author: string; role: string },
  },

  /** ⚠️ À CONFIRMER par Mehdi avant mise en production. */
  contact: {
    email: "[À CONFIRMER]", // ex. contact@lepasse.re
    phone: "[À CONFIRMER]",
    inbox: "[À CONFIRMER]", // destinataire des demandes du formulaire
  },

  legal: {
    companyLegalName: "[À CONFIRMER]",
    siret: "[À CONFIRMER]",
    address: "[À CONFIRMER]",
    publisher: "MDI — Management Data Innovation",
  },

  seo: {
    title: `${PRODUCT_NAME} — ${PRODUCT_TAGLINE}`,
    description:
      "Le Passe centralise votre caisse, votre RH, vos achats et vos avis, puis vous répond en langage naturel sur WhatsApp. Un rapport automatique chaque matin.",
    ogImage: "/assets/og-image.png",
  },
} as const;

export type Segment = (typeof site.segments)[number]["value"];
export type Plan = (typeof site.pricing.plans)[number];
