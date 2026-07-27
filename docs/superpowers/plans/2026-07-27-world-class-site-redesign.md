# World-class Site Redesign Implementation Plan

> **For agentic workers:** Execute task-by-task. Steps use checkbox syntax.

**Goal:** Refactor kdcyberdude.com into a storytelling CV for AI lab / deep-tech roles — better share preview, prominent platforms, no Anthropic/empirical residue.

**Architecture:** Content-first refactor on the existing Vite + React + Tailwind visual system. Single source of truth remains `src/data/content.ts`; App/Nav/Hero/Contact/Probes/index.html updated for IA and meta.

**Tech Stack:** React, TypeScript, Vite, Tailwind, Framer Motion, static `public/` assets.

## Global Constraints

- No Anthropic-specific or “empirical” wording on the site
- Theme toggle far right after Résumé (desktop); trailing edge on mobile
- Remove Tools section entirely
- Remove TESS; replace with Open models (HF)
- Resume file: `public/Karandeep_Singh_Resume.pdf` (clean name)
- Platform links prominent in hero (and contact)
- Preserve BriefSimulator + Terminal

---

### Task 1: Content + copy source of truth

**Files:** `src/data/content.ts`

- [ ] Rewrite `profile` (headline/subline/availability/summary/roles) — outcome-led + pillars; open roles language
- [ ] Add `platforms` array for hero link row (GitHub, HF, LinkedIn, email)
- [ ] Replace “Empirical first” trait; deepen bullets/stories where thin
- [ ] Update `probesIntro` + probes: drop TESS; add open models; optional Mojito writing if fits
- [ ] Expand HARvestGym blurb with provenance/research angle from application
- [ ] Soften trajectory intro with home-lab color without making it the brand

### Task 2: Hero + Nav + App shell

**Files:** `src/components/Hero.tsx`, `src/components/Nav.tsx`, `src/App.tsx`

- [ ] Hero: platforms row, pillars strip, updated CTAs
- [ ] Nav: move theme toggle after Résumé; mobile theme after menu controls / trailing
- [ ] App: remove Tools section; rename probes section title/subtitle; renumber section tags if needed

### Task 3: Contact + HowIWork residue

**Files:** `src/components/Contact.tsx`

- [ ] Remove Anthropic Fellows + empirical language
- [ ] Align CTA copy with open lab / FDE positioning

### Task 4: Share preview (meta + OG image)

**Files:** `index.html`, `public/og.png`

- [ ] Update title, description, og/twitter tags including `og:image`
- [ ] Generate 1200×630 OG image with name + sharp one-liner + prize hook

### Task 5: Resume asset

**Files:** `public/Karandeep_Singh_Resume.pdf`

- [x] Copied from latest resume download with clean filename
- [ ] Confirm `profile.links.resume` still points at `/Karandeep_Singh_Resume.pdf`

### Task 6: Verify

- [ ] `npm run build` passes
- [ ] Grep for Anthropic / empirical / TESS / Tools I reach / “Public repos are a slice”
- [ ] Spot-check nav theme position and hero platforms visually if server up
