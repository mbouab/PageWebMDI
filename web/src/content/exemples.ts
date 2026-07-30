export type ExempleQuestion = {
  id: string;
  domaine: string;
  question: string;
  reponse: string;
};

export const ILLUSTRATIVE_DISCLAIMER = "Exemple illustratif — données fictives.";

export const exemples: ExempleQuestion[] = [
  {
    id: "ca-hier",
    domaine: "Caisse / Objectifs",
    question: "Quel est le CA d'hier par rapport à l'objectif ?",
    reponse:
      "✅ CA d'hier : 12,4 k€ — objectif 11,5 k€ (+7,8 %). Meilleure journée de la semaine. Ticket moyen 38 €.",
  },
  {
    id: "point-mort",
    domaine: "Objectifs",
    question: "Où en est-on du point mort ce mois-ci ?",
    reponse:
      "🎯 Point mort : atteint le 18 du mois. Actuellement +3,4 k€ au-dessus, soit 9 jours d'avance sur l'objectif.",
  },
  {
    id: "food-cost",
    domaine: "Achats",
    question: "Quel est le food cost de la semaine ?",
    reponse:
      "⚠️ Food cost semaine : 28,4 % (cible 26 %). Écart principalement sur les produits frais — vérifier les commandes de poisson.",
  },
  {
    id: "heures-masse-salariale",
    domaine: "RH",
    question:
      "Combien d'heures travaillées cette semaine vs masse salariale cible ?",
    reponse:
      "✅ 342 h travaillées cette semaine pour une masse salariale cible de 33 %. Réalisé : 32,6 %. Bon équilibre.",
  },
  {
    id: "avis-google",
    domaine: "Réseaux sociaux",
    question: "Résume-moi les derniers avis Google.",
    reponse:
      "⭐ Note moyenne : 4,6/5 sur 3 nouveaux avis cette semaine. Points forts cités : accueil, cadre. Un avis 3★ mentionne un temps d'attente au bar.",
  },
  {
    id: "prevision-ca",
    domaine: "Prévision",
    question: "Prévision de CA pour les 10 prochains jours ?",
    reponse:
      "📈 Prévision 10 jours : week-end du 15 chargé (+18 % vs semaine type), renfort conseillé vendredi et samedi soir.",
  },
  {
    id: "plats-vendus",
    domaine: "Caisse",
    question: "Quels sont mes plats les plus vendus ce mois-ci ?",
    reponse:
      "🍽️ Top 3 du mois : Poke bowl saumon (312 ventes), Burger signature (287), Tartare de thon (241).",
  },
  {
    id: "factures-fournisseurs",
    domaine: "Achats",
    question: "Quelles factures fournisseurs arrivent à échéance ?",
    reponse:
      "📄 3 factures à échéance sous 7 jours : Poissonnerie Duval (1 240 €, J+3), Boissons Réunion (860 €, J+5), Frais Sud (2 100 €, J+6).",
  },
  {
    id: "rapport-du-jour",
    domaine: "Synthèse",
    question: "Fais-moi le rapport du jour.",
    reponse:
      "🟢 Rapport du jour : CA 13,1 k€ (obj. 12 k€, +9,2 %), food cost 26,1 %, masse salariale 32,8 %, 2 nouveaux avis (4,8/5 moyenne).",
  },
  {
    id: "plafond-achats",
    domaine: "Charges",
    question: "Sommes-nous au-dessus du plafond d'achats mensuel ?",
    reponse:
      "🔴 Achats du mois : 41 200 € pour un plafond de 38 000 € — dépassement de 8,4 %. Poste principal : boissons (+3 100 € vs budget).",
  },
];
