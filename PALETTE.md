# Palette & typographie — Site MDI

## Couleurs (tokens Tailwind `theme.extend.colors`)

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `ink` | `#0F2A24` | 15,42,36 | Texte principal, fonds sombres |
| `emerald` | `#1E9E6A` | 30,158,106 | Marque primaire, CTA |
| `emerald-dark` | `#157552` | 21,117,82 | Hover, accents foncés |
| `sand` | `#F4EFE6` | 244,239,230 | Fonds de cartes |
| `cream` | `#FBF8F2` | 251,248,242 | Fond de page |
| `amber` | `#E8A13A` | 232,161,58 | Accent secondaire, alertes ⚠️ |
| `slate` | `#5B6B66` | 91,107,102 | Texte secondaire |

### Couleurs WhatsApp (mockup / bulles produit)
| Usage | Hex |
|---|---|
| Fond de chat | `#ECE5DD` |
| Bulle sortante (utilisateur) | `#DCF8C6` |
| Bulle entrante | `#FFFFFF` |

## Dégradé de marque
`linear-gradient(135deg, #1E9E6A 0%, #157552 100%)`

## Typographie
- **Titres** : Space Grotesk (ou Sora / Inter Tight) — weights 600/700.
- **Corps** : Inter — weights 400/500/600.
- Charger via `next/font` (self-host). Fallback : `system-ui, Segoe UI, Arial, sans-serif`.

## Recommandations
- Contraste : `ink` sur `cream`/`sand` = AA+. Texte blanc uniquement sur `emerald`/`emerald-dark`/`ink`.
- `amber` réservé aux accents et alertes, jamais en grande surface de texte.
- Coins : `rounded-2xl` par défaut ; boutons `rounded-full`.
