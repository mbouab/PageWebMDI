# Cahier des charges technique — Site vitrine MDI

> Document destiné à **Claude Code**. Objectif : construire un site web vitrine
> commercial pour la plateforme data de MDI (Management Data Innovation), en
> **Test-Driven Development strict**. Chaque fonctionnalité est décrite avec ses
> critères d'acceptation formulés comme des tests à écrire **avant** le code.

---

## 0. Comment utiliser ce document (instructions Claude Code)

**Règle d'or : TDD Red → Green → Refactor.** Pour chaque fonctionnalité :

1. Écrire le(s) test(s) qui échoue(nt) (RED) à partir des critères d'acceptation ci-dessous.
2. Écrire le minimum de code pour faire passer les tests (GREEN).
3. Refactorer sans casser les tests (REFACTOR).
4. Ne jamais écrire de code de production sans test préalable.
5. Commit atomique par fonctionnalité, message au format Conventional Commits
   (`feat:`, `test:`, `fix:`, `refactor:`, `chore:`).

Aucune fonctionnalité n'est considérée « terminée » tant que la section
**Definition of Done** (§13) n'est pas satisfaite.

---

## 1. Vue d'ensemble

| Élément | Valeur |
|---|---|
| Nom de projet (repo) | `mdi-site` |
| Nom produit affiché | **Le Passe** *(baseline : « le pilotage de votre restaurant » — variable `PRODUCT_NAME` dans `site.ts`, modifiable en un point unique)* |
| Éditeur | MDI — Management Data Innovation |
| Type | Site vitrine commercial one-page + pages secondaires |
| Langue | Français (fr-FR). Architecture i18n-ready mais 1 seule langue au lancement. |
| Fuseau de référence contenus | Europe/Paris pour MDI ; clients Réunion UTC+4 (mentionné dans le contenu) |
| Objectif business | Générer des demandes de contact qualifiées de restaurateurs (indépendants haut de gamme, groupes multi-sites, réseaux/franchises) |

Le nom produit, les prix et les coordonnées doivent tous vivre dans **un seul
fichier de configuration** (`src/config/site.ts`) pour être modifiables sans
toucher au code des pages. C'est une exigence testable (§9.1).

---

## 2. Proposition de valeur (contenu à intégrer)

**Accroche principale (hero) :**
> « Vos données restaurant, chaque matin sur WhatsApp. Sans BI, sans contrôleur de gestion. »

**Sous-titre :**
> Le Passe connecte votre caisse, votre RH, vos achats et vos avis clients,
> puis vous répond en langage naturel. Un rapport automatique à 5h du matin,
> et des réponses instantanées à toutes vos questions de pilotage.

**Les 3 piliers de valeur (à afficher en cartes) :**

1. **Un rapport quotidien automatique** — CA vs objectif, food cost, masse
   salariale, écart au point mort : livré chaque matin sur WhatsApp, prêt à lire.
2. **Posez vos questions en langage naturel** — « Quel est le food cost de la
   semaine ? », « Où en est-on du point mort ce mois-ci ? ». Réponse en secondes,
   chiffres traçables à la source.
3. **Remplace un stack complet** — à la place d'un contrôleur de gestion à temps
   partiel + plusieurs outils de BI, une seule solution intégrée et pilotée.

**Bénéfices chiffrés (arguments, à présenter en bandeau) :**
- Rapport prêt **avant l'ouverture** (livraison 5h00, heure locale).
- **Zéro tableau de bord à consulter** : l'information vient à vous.
- Chaque chiffre est **traçable à sa source** (aucune estimation « à la louche »).
- Décisions de staffing **pilotées par la demande** (prévision de CA à 10 jours).

**Message anti-objection (section « Pourquoi pas un simple dashboard ? ») :**
> Les tableaux de bord attendent qu'on les ouvre. Le Passe vous parle.
> Le bon chiffre, au bon moment, sur l'outil que votre équipe utilise déjà.

---

## 3. Public cible & segments (structure la page Tarifs)

1. **Restaurant indépendant haut de gamme** (mono-site)
2. **Groupe multi-sites** (2 à ~10 établissements — cas Groupe Abondance)
3. **Réseau / franchise** (déploiement standardisé multi-établissements)

---

## 4. Arborescence & pages

Site **majoritairement one-page** avec ancres, + pages dédiées pour contact et légal.

```
/                     Landing (hero, valeur, comment ça marche, exemples,
                      clients, tarifs, FAQ, CTA contact)
/contact              Formulaire de contact + coordonnées
/mentions-legales     Mentions légales
/confidentialite      Politique de confidentialité (RGPD)
/merci                Page de confirmation post-envoi formulaire
```

Sections ancrées de la landing (ordre imposé) :
`#hero` → `#valeur` → `#comment-ca-marche` → `#exemples` → `#clients` →
`#tarifs` → `#faq` → `#contact-cta`

---

## 5. Contenu détaillé par section

### 5.1 Hero (`#hero`)
- Accroche + sous-titre (§2).
- CTA primaire : **« Demander une démo »** → scroll vers `#contact-cta` (ou `/contact`).
- CTA secondaire : **« Voir un exemple »** → scroll vers `#exemples`.
- Visuel : mockup WhatsApp (`assets/hero-whatsapp.svg`).

### 5.2 Valeur (`#valeur`)
- 3 cartes des piliers (§2).
- Bandeau des bénéfices chiffrés (§2).

### 5.3 Comment ça marche (`#comment-ca-marche`)
Timeline en 4 étapes :
1. **On connecte vos outils** — caisse (ex. Clyo), RH (ex. Skello), achats, avis (Google), météo, etc.
2. **On centralise & fiabilise** — entrepôt de données, règles métier de votre secteur.
3. **Des agents IA analysent** — CA, RH, achats, réputation, prévisions.
4. **Vous recevez & questionnez sur WhatsApp** — rapport auto + Q&A en langage naturel.

> Note : ne pas exposer de noms de technologies internes sensibles (BigQuery, n8n,
> IDs de credentials, etc.). Rester au niveau bénéfice/catégorie d'outil.

### 5.4 Exemples de questions (`#exemples`)
Composant interactif « faux chat » : liste de questions cliquables qui affichent
une réponse illustrative pré-écrite (statique, **pas** d'appel API réel au lancement).

Questions à inclure (au minimum ces 10) :
| # | Question | Domaine |
|---|---|---|
| 1 | « Quel est le CA d'hier par rapport à l'objectif ? » | Caisse / Objectifs |
| 2 | « Où en est-on du point mort ce mois-ci ? » | Objectifs |
| 3 | « Quel est le food cost de la semaine ? » | Achats |
| 4 | « Combien d'heures travaillées cette semaine vs masse salariale cible ? » | RH |
| 5 | « Résume-moi les derniers avis Google. » | Réseaux sociaux |
| 6 | « Prévision de CA pour les 10 prochains jours ? » | Prévision |
| 7 | « Quels sont mes plats les plus vendus ce mois-ci ? » | Caisse |
| 8 | « Quelles factures fournisseurs arrivent à échéance ? » | Achats |
| 9 | « Fais-moi le rapport du jour. » | Synthèse |
| 10 | « Sommes-nous au-dessus du plafond d'achats mensuel ? » | Charges |

Réponses illustratives : ton concis, style WhatsApp, chiffres **fictifs mais
crédibles**, avec indicateurs visuels (✅ / ⚠️ / 🔴). Exemple pour la Q1 :
> ✅ CA d'hier : **12,4 k€** — objectif 11,5 k€ (**+7,8 %**). Meilleure journée
> de la semaine. Ticket moyen 38 €.

*(Toutes les réponses illustratives sont fournies en dur dans les données du
composant ; elles ne représentent pas de données client réelles et doivent porter
la mention « exemple illustratif ».)*

### 5.5 Clients / références (`#clients`)
Mettre en avant **Groupe Abondance** (holding, île de La Réunion) et ses deux
établissements :
- **Boma Beach** — Boucan Canot, La Réunion.
- **l'Univert Plage** — La Réunion.

Format : logos/cartes + une phrase de contexte + (optionnel) 1 verbatim/citation.
> ⚠️ **À valider avec Mehdi** : accord des clients pour être cités nommément,
> et éventuelle citation de Olivier Louterbach / Fred Testu (utilisateurs).
> Prévoir une variante « anonymisée » du composant (`showClientNames: boolean`
> dans `site.ts`) au cas où l'accord ne serait pas encore obtenu.

### 5.6 Tarifs (`#tarifs`)
3 offres alignées sur les segments (§3). **Tous les montants viennent de `site.ts`**
(objet `pricing`), jamais en dur dans le JSX (testé T-1.2 et T-5.x).

**Ancrage obligatoire au-dessus des cartes** (message qui rend le prix acceptable) :
> À la place d'un contrôleur de gestion à temps partiel (≈ 2 000–3 000 €/mois chargé)
> et de plusieurs outils de BI, une seule solution — à partir de quelques centaines
> d'euros par mois.

**Toggle Mensuel / Annuel** en haut de la section (annuel = 2 mois offerts).

Chaque carte affiche : le tarif catalogue mis en avant (aucune réduction affichée),
et une ligne d'ancrage « ≈ 6× moins cher qu'un contrôleur de gestion à temps partiel ».
L'offre **Groupe** est mise en avant (badge « La plus choisie », bordure `emerald`).

| Offre | Cible | Tarif HT | Mise en service |
|---|---|---|---|
| **Solo** | 1 restaurant | 490 €/mois | 990 € (offerte au lancement) |
| **Groupe** ⭐ | 2 à 5 restaurants | 390 €/restaurant/mois | 1 490 € (offerte au lancement) |
| **Réseau** | 6+ / franchise | Sur devis (dégressif volume) | Sur devis |

**Offres de lancement à afficher** (objet `pricing.offers` dans `site.ts`) :
1. **Mise en service offerte** pour toute signature avant le 31 décembre 2026 (valeur 990–1 490 €).
2. **Pilote 30 jours** satisfait ou remboursé.
3. **Paiement annuel** : 2 mois offerts (≈ −17 %).
4. **Parrainage** : 1 mois offert au nouveau client parrainé, dès sa signature.

Mentions : « Tarifs HT. TVA applicable selon localisation (ex. 8,5 % à La Réunion). »
CTA de chaque offre → `#contact-cta` avec pré-remplissage du `segment` dans le formulaire.

### 5.7 FAQ (`#faq`)
Accordéon. Questions minimales :
1. Faut-il installer un logiciel ? *(Non, tout passe par WhatsApp.)*
2. Mes données sont-elles en sécurité ? *(Oui — données hébergées en UE, accès restreint, conformité RGPD.)*
3. Combien de temps pour être opérationnel ? *(Onboarding typique en quelques jours après connexion des outils.)*
4. Quels outils de caisse/RH supportez-vous ? *(Clyo, Skello, et intégrations sur mesure — nous consulter.)*
5. Les chiffres sont-ils fiables ? *(Chaque chiffre est calculé de façon déterministe et traçable à sa source.)*
6. Puis-je poser n'importe quelle question ? *(Oui, en langage naturel, sur le CA, les achats, la RH, la réputation, les prévisions.)*

### 5.8 CTA Contact (`#contact-cta`)
Bandeau final + bouton vers `/contact` (ou formulaire inline). Voir §6.

---

## 6. Formulaire de contact (fonctionnalité clé — spécifs détaillées)

### 6.1 Champs
| Champ | Type | Obligatoire | Validation |
|---|---|---|---|
| `nom` | text | ✅ | 2–80 caractères |
| `email` | email | ✅ | format email valide |
| `telephone` | tel | ❌ | si rempli : format FR/international plausible |
| `etablissement` | text | ✅ | 2–120 caractères |
| `segment` | select | ✅ | une valeur parmi `solo` / `groupe` / `reseau` |
| `nbEtablissements` | number | ❌ | entier ≥ 1 |
| `message` | textarea | ✅ | 10–2000 caractères |
| `consentement` | checkbox | ✅ | doit être coché (RGPD) |
| `honeypot` (`website`) | text caché | — | doit rester vide (anti-spam) |

### 6.2 Comportement
- Validation **côté client** (React Hook Form + Zod) ET **côté serveur** (re-validation du même schéma Zod partagé).
- Soumission via **Server Action** (ou route `POST /api/contact`) — pas de `<form>` HTML natif non contrôlé.
- Anti-spam : honeypot + limitation de débit basique (rate limit par IP, ex. 5 req / 10 min).
- Succès → redirection `/merci` + envoi email (voir §6.3).
- Erreur serveur → message d'erreur non bloquant, données du formulaire préservées.
- États UI explicites : `idle` / `submitting` / `success` / `error` (testables).
- Accessibilité : labels liés (`htmlFor`), messages d'erreur reliés via `aria-describedby`, focus géré.

### 6.3 Envoi email
- Provider : **Resend** (recommandé, testable via mock) — variable d'env `RESEND_API_KEY`.
- Destinataire : `CONTACT_INBOX` (env). Expéditeur vérifié (env `CONTACT_FROM`).
- Le module d'envoi est **injecté** (interface `EmailSender`) pour être **mockable** en test.
- En l'absence de clé (dev/CI), fallback : log console + persistance no-op (ne doit jamais crasher).

---

## 7. Stack technique imposée

| Couche | Choix | Version cible |
|---|---|---|
| Framework | **Next.js (App Router)** | 14+ |
| Langage | **TypeScript** (strict: true) | 5+ |
| Style | **Tailwind CSS** | 3+ |
| Formulaires | React Hook Form + **Zod** (schéma partagé client/serveur) | — |
| Icônes | lucide-react | — |
| Email | Resend (via interface injectable) | — |
| Tests unitaires/composants | **Vitest** + **React Testing Library** + `@testing-library/user-event` | — |
| Tests E2E | **Playwright** | — |
| Lint / format | ESLint + Prettier | — |
| CI | GitHub Actions | — |
| Déploiement | Vercel (recommandé) | — |
| Gestionnaire de paquets | pnpm (ou npm — au choix, verrouillé) | — |

> Contrainte : `tsconfig` en mode `strict`. Aucun `any` implicite. `noUncheckedIndexedAccess` activé.

---

## 8. Structure du projet (cible)

```
mdi-site/
├── src/
│   ├── app/
│   │   ├── page.tsx                # Landing one-page (compose les sections)
│   │   ├── layout.tsx              # Layout racine + SEO par défaut
│   │   ├── contact/page.tsx
│   │   ├── merci/page.tsx
│   │   ├── mentions-legales/page.tsx
│   │   ├── confidentialite/page.tsx
│   │   └── api/contact/route.ts    # (ou server action dans actions/contact.ts)
│   ├── components/
│   │   ├── sections/               # Hero, Valeur, CommentCaMarche, Exemples,
│   │   │                           #   Clients, Tarifs, Faq, ContactCta
│   │   ├── ui/                     # Button, Card, Accordion, Input, Field...
│   │   ├── ChatExamples.tsx        # composant interactif §5.4
│   │   └── ContactForm.tsx
│   ├── config/
│   │   └── site.ts                 # SOURCE UNIQUE : nom produit, prix, contacts,
│   │                               #   segments, flags (showClientNames)
│   ├── lib/
│   │   ├── contactSchema.ts        # schéma Zod partagé
│   │   ├── email/                  # interface EmailSender + impl Resend + fake
│   │   └── rateLimit.ts
│   └── content/                    # textes (valeur, FAQ, exemples de questions)
├── tests/
│   ├── unit/                       # Vitest + RTL
│   └── e2e/                        # Playwright
├── public/
│   └── assets/                     # SVG/PNG fournis (logo, hero, icônes, og)
├── .github/workflows/ci.yml
├── vitest.config.ts
├── playwright.config.ts
└── ...
```

---

## 9. Spécifications testables (TDD — critères d'acceptation)

> Format Given/When/Then. **Écrire ces tests d'abord.** Les IDs (`T-x.y`) servent
> de référence dans les noms de tests et les commits.

### 9.1 Configuration centralisée
- **T-1.1** — *Étant donné* `site.ts`, *quand* on change `PRODUCT_NAME`, *alors*
  le nom affiché dans le Hero et le `<title>` reflètent la nouvelle valeur
  (test : rendre le composant avec une config mockée).
- **T-1.2** — *Étant donné* les prix dans `site.ts`, *quand* la section Tarifs est
  rendue, *alors* chaque offre affiche exactement le prix issu de la config
  (aucun montant en dur dans le JSX — vérifié par test qui injecte des valeurs).
- **T-1.3** — *Quand* `showClientNames = false`, *alors* la section Clients
  n'affiche pas « Boma Beach » ni « L'Uni Vert » mais une variante anonymisée.

### 9.2 Hero & navigation
- **T-2.1** — Le Hero rend l'accroche, le sous-titre et 2 CTA.
- **T-2.2** — Clic sur « Demander une démo » → navigue/scrolle vers la cible contact.
- **T-2.3** — Clic sur « Voir un exemple » → cible `#exemples`.
- **T-2.4** — La barre de nav contient un lien par section et un CTA contact.

### 9.3 Section Valeur
- **T-3.1** — Exactement 3 cartes de piliers rendues, chacune avec titre + description.
- **T-3.2** — Le bandeau bénéfices rend les 4 arguments chiffrés.

### 9.4 Composant Exemples (chat interactif)
- **T-4.1** — Rend au moins 10 questions cliquables.
- **T-4.2** — *Quand* on clique une question, *alors* la réponse illustrative
  correspondante s'affiche et l'attribut `aria-live` annonce le changement.
- **T-4.3** — Chaque réponse affiche la mention « exemple illustratif ».
- **T-4.4** — Une seule réponse active à la fois (les autres se replient) — OU
  affichage cumulatif type conversation (choix documenté et testé de façon cohérente).

### 9.5 Tarifs
- **T-5.1** — 3 offres rendues (Solo, Groupe, Réseau).
- **T-5.2** — L'offre Réseau affiche « Sur devis » (pas de montant).
- **T-5.3** — Clic sur le CTA d'une offre → contact avec `segment` pré-sélectionné correspondant.
- **T-5.4** — La mention TVA/HT est présente.

### 9.6 FAQ
- **T-6.1** — Chaque item est replié par défaut.
- **T-6.2** — Clic sur une question déplie sa réponse (`aria-expanded` passe à `true`).
- **T-6.3** — Navigation clavier : Entrée/Espace ouvrent l'item ; focus visible.

### 9.7 Formulaire de contact — validation (schéma Zod, tests unitaires purs)
- **T-7.1** — Email invalide → erreur de validation.
- **T-7.2** — `message` < 10 caractères → erreur.
- **T-7.3** — `consentement` non coché → erreur.
- **T-7.4** — `segment` hors enum → erreur.
- **T-7.5** — Payload complet valide → `success` du parse Zod.
- **T-7.6** — `honeypot` (website) rempli → traité comme spam (rejet silencieux côté serveur, réponse 200 sans envoi email).

### 9.8 Formulaire de contact — comportement (RTL)
- **T-8.1** — Soumission avec champs invalides → affiche les erreurs, **n'appelle pas** l'`EmailSender` (mock), reste sur la page.
- **T-8.2** — Soumission valide → appelle `EmailSender.send` **une fois** avec les bons champs, puis passe à l'état `success`.
- **T-8.3** — Pendant l'envoi, le bouton est désactivé et affiche l'état `submitting`.
- **T-8.4** — Erreur de l'`EmailSender` → état `error`, données conservées, `EmailSender` appelable de nouveau.
- **T-8.5** — Labels et erreurs correctement reliés (assertions d'accessibilité RTL/`toHaveAccessibleName`).

### 9.9 API/Server Action contact (tests d'intégration côté serveur)
- **T-9.1** — POST payload valide → 200/redirect `/merci`, `EmailSender` (fake) a reçu 1 message.
- **T-9.2** — POST payload invalide → 400, aucun email envoyé.
- **T-9.3** — Rate limit dépassé → 429.
- **T-9.4** — Sans `RESEND_API_KEY` → pas de crash, fallback log, réponse OK.

### 9.10 SEO / accessibilité / méta
- **T-10.1** — La page racine expose `<title>` et `<meta name="description">` non vides.
- **T-10.2** — Balises Open Graph (`og:title`, `og:description`, `og:image` = `assets/og-image.png`) présentes.
- **T-10.3** — Un seul `<h1>` par page.
- **T-10.4** — Toutes les images ont un `alt` non vide (ou `alt=""` justifié si décoratives).
- **T-10.5** — Audit axe (via `@axe-core/playwright`) : 0 violation critique sur `/` et `/contact`.

### 9.11 E2E (Playwright — parcours complet)
- **T-11.1** — L'utilisateur arrive sur `/`, voit le hero, clique « Demander une démo », remplit le formulaire, soumet → atterrit sur `/merci`.
- **T-11.2** — Clic sur une question d'exemple affiche une réponse.
- **T-11.3** — Depuis une offre Tarifs, le CTA amène au formulaire avec le bon segment pré-rempli.
- **T-11.4** — Navigation clavier de bout en bout du formulaire possible.

---

## 10. Design system

> Un fichier `assets/PALETTE.md` accompagne les visuels avec les codes exacts.
> Reprendre ces tokens dans la config Tailwind (`theme.extend.colors`).

**Palette (à confirmer, cohérente avec les visuels fournis) :**
| Token | Hex | Usage |
|---|---|---|
| `ink` | `#0F2A24` | Texte principal, fonds sombres (vert forêt profond) |
| `emerald` | `#1E9E6A` | Couleur de marque primaire, CTA |
| `emerald-dark` | `#157552` | Hover / accents |
| `sand` | `#F4EFE6` | Fond clair chaleureux |
| `cream` | `#FBF8F2` | Fond de page |
| `amber` | `#E8A13A` | Accent secondaire (alertes ⚠️, highlights) |
| `slate` | `#5B6B66` | Texte secondaire |

- Typo titres : une grotesque géométrique (ex. *Sora*, *Space Grotesk* ou *Inter Tight*).
- Typo corps : *Inter* (ou system-ui). Charger via `next/font` (self-host, pas de FOUT).
- Coins arrondis généreux (`rounded-2xl`), ombres douces, beaucoup d'air.
- Composant « bulle WhatsApp » réutilisable pour l'esthétique produit (vert clair, coin pointu).
- Responsive **mobile-first** obligatoire (les restaurateurs consultent au téléphone).

---

## 11. Performance, SEO, accessibilité, conformité

- **Perf** : Lighthouse ≥ 90 sur Performance, Accessibilité, Best Practices, SEO (mobile). Images en `next/image`, SVG inline pour icônes, lazy-loading sous la ligne de flottaison.
- **SEO** : métadonnées via l'API `metadata` de Next, `sitemap.xml` + `robots.txt`, données structurées JSON-LD `Organization` + `Product`.
- **A11y** : conforme WCAG 2.1 AA (contrastes, focus, navigation clavier, `aria-live` sur le chat, `prefers-reduced-motion` respecté pour les animations).
- **RGPD** : bannière cookies **uniquement si** analytics tiers ; privilégier un analytics sans cookie (ex. Plausible/Umami) pour éviter la bannière. Page `/confidentialite`. Consentement explicite sur le formulaire (déjà couvert T-7.3). Mentions légales complètes.

---

## 12. CI/CD

`.github/workflows/ci.yml` doit, sur chaque PR et push `main` :
1. `install` (cache dépendances)
2. `lint` (ESLint) + `typecheck` (`tsc --noEmit`)
3. `test:unit` (Vitest) avec **couverture ≥ 80 %** sur `lib/` et composants critiques (formulaire, tarifs, exemples)
4. `test:e2e` (Playwright, navigateur headless)
5. `build` (Next build doit réussir)

Le merge est bloqué si une étape échoue.

---

## 13. Definition of Done (par fonctionnalité ET pour le projet)

Une fonctionnalité est **terminée** quand :
- [ ] Les tests des critères d'acceptation associés sont écrits **avant** le code et passent.
- [ ] `lint`, `typecheck`, `test:unit`, `test:e2e`, `build` passent en local et en CI.
- [ ] Aucune régression (toute la suite verte).
- [ ] Accessible au clavier + audit axe sans violation critique sur les pages touchées.
- [ ] Responsive vérifié (mobile 375px, tablette, desktop).
- [ ] Aucune valeur de contenu sensible en dur (nom produit, prix, contacts viennent de `site.ts`).
- [ ] Commit(s) au format Conventional Commits.

Le **projet** est livrable quand : toutes les sections §9 sont couvertes,
Lighthouse ≥ 90 sur les 4 axes (mobile), et le déploiement Vercel de preview est fonctionnel.

---

## 14. Ordre de construction recommandé (itérations TDD)

1. **Setup** : Next+TS+Tailwind+Vitest+Playwright+ESLint+CI qui tourne à vide (un test smoke vert).
2. **`site.ts` + tests T-1.x** (fondation config).
3. **Layout + SEO + T-10.x** (title/meta/OG/h1).
4. **Hero + nav** (T-2.x).
5. **Valeur** (T-3.x).
6. **Comment ça marche**.
7. **Exemples interactifs** (T-4.x).
8. **Tarifs** (T-5.x).
9. **Clients** (T-1.3 inclus).
10. **FAQ** (T-6.x).
11. **Schéma Zod contact** (T-7.x) — logique pure d'abord.
12. **ContactForm UI** (T-8.x).
13. **API/Server Action + email injectable + rate limit** (T-9.x).
14. **Pages `/merci`, `/mentions-legales`, `/confidentialite`**.
15. **E2E** (T-11.x) + passe a11y globale (T-10.5).
16. **Polish design, perf Lighthouse, déploiement.**

---

## 15. Points à confirmer par Mehdi (à ne pas inventer)

- [x] **Nom produit** : « Le Passe » (baseline « le pilotage de votre restaurant »). Confirmé — modifiable via `PRODUCT_NAME`.
- [x] **Prix** définis (Solo 490 €, Groupe 390 €/restaurant, sans réduction fondateur ; Réseau sur devis) — voir §5.6 et `site.ts`.
- [ ] **Accord des clients** pour citation nominative (Boma Beach / L'Uni Vert, verbatims).
- [ ] **Coordonnées** : email de contact, téléphone, adresse société, SIRET (mentions légales).
- [ ] **Conditions commerciales** : engagement / résiliation à afficher.
- [ ] **Provider email** (Resend confirmé ?) et **outil analytics** (sans cookie ?).
- [ ] **Domaine** de production.

---

## Annexe A — Textes prêts à l'emploi

Voir `content/` à créer. Les blocs de texte des §2, §5.3, §5.4 (questions + réponses
illustratives), §5.7 (FAQ) sont directement réutilisables. Toutes les réponses
d'exemple portent la mention **« exemple illustratif — données fictives »**.

## Annexe B — Assets fournis

Dans `public/assets/` (fournis avec ce cahier des charges) :
- `logo-mdi.svg` / `.png` — logo horizontal
- `logo-mark.svg` / `.png` — symbole seul (favicon source)
- `hero-whatsapp.svg` / `.png` — mockup conversation produit (visuel hero)
- `icons-features.svg` — jeu d'icônes des piliers
- `og-image.svg` / `.png` — carte de partage social (1200×630)
- `PALETTE.md` — codes couleurs & typographies
