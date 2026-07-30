# TODO Mehdi — informations à confirmer

Ce fichier liste tout ce qui reste en `[À CONFIRMER]` dans `web/src/config/site.ts`
et dans le cahier des charges (§15). Rien de ce qui suit n'a été inventé : les
placeholders restent tels quels dans le code tant que ces points ne sont pas tranchés.

## Coordonnées de contact (`site.ts` → `contact`)
- [ ] `email` — adresse email de contact publique (ex. `contact@lepasse.re`)
- [ ] `phone` — numéro de téléphone à afficher
- [ ] `inbox` — adresse destinataire des soumissions du formulaire de contact

## Informations légales (`site.ts` → `legal`)
- [ ] `companyLegalName` — raison sociale exacte
- [ ] `siret` — numéro SIRET
- [ ] `address` — adresse postale du siège (pour les mentions légales)

## Autres points ouverts (cahier des charges §15)
- [ ] **Accord des clients** pour citation nominative (Boma Beach / L'Uni Vert,
      et éventuels verbatims d'Olivier Louterbach / Fred Testu). Tant que non
      confirmé, `showClientNames` peut être repassé à `false` sans redéploiement
      de code (la variante anonymisée existe et est testée — T-1.3).
- [ ] **Conditions commerciales** : engagement / résiliation à afficher (durée
      d'engagement, préavis, etc.)
- [ ] **Provider email** : Resend confirmé comme provider définitif ?
- [ ] **Outil analytics** : lequel, et confirmation qu'il est sans cookie
      (pour éviter la bannière RGPD — cf. cahier §11)
- [ ] **Domaine de production** (pour les métadonnées SEO, `sitemap.xml`,
      `robots.txt`, et la config Vercel)

## Comment fournir les réponses
Édite directement les valeurs correspondantes dans `web/src/config/site.ts`
(remplace `"[À CONFIRMER]"` par la vraie valeur) et coche les cases ci-dessus.
Aucune autre modification de code n'est nécessaire : tout le site lit ces
valeurs depuis ce fichier unique.
