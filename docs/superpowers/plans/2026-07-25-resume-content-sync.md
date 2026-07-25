# Resume Content Sync Implementation Plan

> **For agentic workers:** Execute task-by-task. Steps use checkbox syntax.

**Goal:** Sync site content to the Jul 2026 resume, optimized for Anthropic Fellows selection.

**Architecture:** Single source of truth in `src/data/content.ts`; thin UI tweaks in LearningBench + Probes only.

**Tech Stack:** React + TypeScript existing site.

## Global Constraints

- Preserve existing visual language and section order in App.tsx.
- No cybersecurity certs or college hackathon honors on the site.
- Remove upstream digs entirely.
- Prefer resume-backed claims only.

---

### Task 1: Update `content.ts` profile, LearningBench, projects, timeline, education

**Files:** `src/data/content.ts`

- [ ] Fix location, summary, links (Kaggle writeup, Treow site, HF model URLs, Reddit rig).
- [ ] Enrich LearningBench bullets/links from resume.
- [ ] Enrich projects (WER, ComfyUI depth, accurate Parentinc bullets).
- [ ] Fix timeline; shorten freelance; remove non-resume SOPs claim.
- [ ] Fix education degree; empty `digs` or delete export.

### Task 2: UI cleanup

**Files:** `src/components/Probes.tsx`, `src/components/LearningBench.tsx`

- [ ] Remove digs UI from Probes.
- [ ] Add Kaggle writeup CTA on LearningBench if data field present.

### Task 3: Verify

- [ ] `npm run build` (or typecheck) passes.
- [ ] Grep confirms no Chandigarh / digs / Mathematics & Computer Science / Artistic Hobby clutter in hero-primary paths.
