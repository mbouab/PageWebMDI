# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository state

This repo currently contains only the specification and pre-production assets for a Next.js
site that has **not been scaffolded yet**. There is no `package.json`, no `src/app`, no build
tooling. Do not assume any commands (`npm run dev`, `lint`, `test`, etc.) exist until the
scaffolding step has actually been done — check for `package.json` first.

Files present at the root:
- `CAHIER_DES_CHARGES.md` — the full technical spec (French). **This is the source of truth.**
  Read it in full before doing any work; it defines scope, content, pricing, the contact form,
  the imposed stack, the design system, and testable acceptance criteria (IDs `T-x.y`) that must
  be used as test names.
- `site.ts` — the single source of truth for all variable content (product name, tagline,
  pricing, segments, client references, contact/legal placeholders, SEO). Once the project is
  scaffolded, this belongs at `src/config/site.ts` and must be imported, never re-hardcoded.
- `PALETTE.md` — exact color tokens and typography to reproduce in the Tailwind config.
- `logo-mdi.*`, `logo-mark.*`, `hero-whatsapp.*`, `icons-features.*`, `og-image.*` (svg+png) —
  provided visual assets, destined for `public/assets/`.
- `.claude/`, `.agents/` — Claude Code skills configuration (not project code).

## Non-negotiable workflow: strict TDD

Every feature, in this exact order:
1. **RED** — write the failing test(s) first, derived from the `T-x.y` acceptance criteria in
   `CAHIER_DES_CHARGES.md` §9.
2. **GREEN** — write the minimum code to pass.
3. **REFACTOR** — clean up without breaking tests.

Never write production code without a preceding test. One atomic commit per feature, using
Conventional Commits (`feat:`, `test:`, `fix:`, `refactor:`, `chore:`). Test names/IDs should
reference the `T-x.y` criteria they implement.

Build order is fixed by `CAHIER_DES_CHARGES.md` §14 (setup → `site.ts` + config tests → layout/SEO
→ hero/nav → value props → how-it-works → interactive examples → pricing → clients → FAQ → Zod
contact schema → contact form UI → API/server action + email → legal pages → E2E → polish).
Do not skip ahead in this order.

## Content rule: nothing hardcoded

No content value (product name, prices, offers, contact info, segments) may be hardcoded in
JSX/TSX. Everything must be read from `site.ts` (`src/config/site.ts` once scaffolded). This is
directly tested by `T-1.1`, `T-1.2`, `T-1.3`, and `T-5.x`.

`site.ts` currently has placeholder values marked `[À CONFIRMER]` for contact email/phone/inbox
and legal info (SIRET, address). Never invent real values for these — keep the placeholders and
track them in a `TODO_MEHDI.md` (to be created) instead.

`showClientNames` in `site.ts` toggles between named clients (Boma Beach, L'Uni Vert — Groupe
Abondance, La Réunion) and an anonymized variant. Both code paths must exist and be tested
(`T-1.3`), even though the flag is currently `true`.

## Do not expose internal tech

The public site must never mention internal technology names (e.g. BigQuery, n8n, credential
IDs, server names). Content stays at the benefit/category level (e.g. "cash register connector",
not the actual vendor's backend or the internal pipeline tooling name).

## Imposed stack (CAHIER_DES_CHARGES.md §7)

Next.js (App Router) + TypeScript `strict: true` (`noUncheckedIndexedAccess` on, no implicit
`any`) + Tailwind CSS + React Hook Form + Zod (schema shared client/server) + lucide-react +
Resend for email (behind an injectable `EmailSender` interface, mockable, log-fallback if no API
key — never crash, per `T-9.4`) + Vitest + React Testing Library + Playwright + ESLint/Prettier +
GitHub Actions CI + Vercel deploy target.

Target structure (from §8 of the spec) puts pages under `src/app/`, section components under
`src/components/sections/`, shared UI under `src/components/ui/`, the Zod schema under
`src/lib/contactSchema.ts`, the email abstraction under `src/lib/email/`, and tests under
`tests/unit/` (Vitest+RTL) and `tests/e2e/` (Playwright).

## CI gates (once scaffolded)

Per §12/§13 of the spec, every PR/push to `main` must pass, in order: install → lint (ESLint) +
typecheck (`tsc --noEmit`) → `test:unit` (Vitest, ≥80% coverage on `lib/` and critical
components) → `test:e2e` (Playwright headless) → `build`. Also required per feature: keyboard
accessibility, an axe audit with zero critical violations on touched pages, and responsive
verification at 375px/tablet/desktop.
