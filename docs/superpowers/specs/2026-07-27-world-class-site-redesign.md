# World-class personal site redesign

**Date:** 2026-07-27  
**Goal:** Turn kdcyberdude.com into a storytelling CV for top AI lab / deep-tech applications — skimmable in 30s, deep if someone stays. No company-specific targeting.

## Audience

Research labs and strong startups hiring for: researcher, applied ML, engineering, forward-deployed / founding eng. Not Anthropic-specific.

## Positioning

**Primary:** Full-loop builder with research taste — eval → train → infra → product.  
**Hero line:** Outcome-led (“I turn ambiguous problems into measurable experiments — then ship them.”).  
**Secondary strip:** LinkedIn pillars in prose — Model training & evaluation · Self-hosted GPU infra · 0→1 product.  
**Treow:** Keep as current role in trajectory / work; do **not** lead the hero identity.  
**LinkedIn/GitHub bio:** Unchanged by this project (user keeps Co-Founder @ Treow until a new role).

## Information architecture

1. **Hero** — name, outcome headline, pillars, **prominent platform links** (GitHub, Hugging Face, LinkedIn, email), CTAs, stats  
2. **LearningBench** — flagship research proof (expand storytelling from application/resume)  
3. **Lab** — BriefSimulator (keep)  
4. **Built & shipped** — LuxeAI → Treow → Rig → Parentinc (deeper expandable detail)  
5. **How I work** — traits; remove “Empirical first” framing; keep evidence-backed traits  
6. **Trajectory** — timeline with richer story arc (home lab / self-taught as color, not headline)  
7. **~~Tools I reach for~~** — **REMOVE**  
8. **Code & models** — rename; drop “Public repos are a slice…”; remove TESS; add Open models (HF)  
9. **Contact** — open language for labs / applied ML / FDE; no Anthropic / empirical

## Explicit removals / renames

| Remove / change | Replacement |
|---|---|
| Anthropic Fellows / company-specific role lists | “Research labs & deep-tech teams” + roles: Researcher, Applied ML, Engineering, FDE |
| “Empirical” / “empirical work” wording | Measurement, experiments, shipping, research taste |
| Tools I reach for section | Gone (skills still appear inside project cards) |
| “Public repos are a slice…” | Neutral title e.g. “Selected code & models” + short factual intro |
| TESS probe | Open models on Hugging Face (ASR / TTS / LLM artifacts) |
| Resume filename with Anthropic | `Karandeep_Singh_Resume.pdf` |

## Share / OG preview

- **og:title / twitter:title:** `Karandeep Singh — Model Training, Evaluation & Self-Hosted Infra`  
- **og:description:** Prize + loop + openness (no Anthropic)  
- **og:image / twitter:image:** Dedicated `public/og.png` (1200×630) so Slack/LinkedIn/X render a strong card  
- **theme-color / favicon:** keep; ensure meta matches light/dark reasonably

## Theme toggle

**Position A:** Far right of nav — after Résumé CTA (desktop); mirror on mobile so it sits at the trailing edge of the control cluster.

## Content depth (CV > resume)

Pull richer detail from Fellows application + resume + linked sources into expandable or secondary paragraphs:

- LearningBench: solo first-time competitor, #2 community benchmark, findings stay  
- HARvestGym: provenance / agent attack-surface framing (research interest color, not lab-specific)  
- Treow: data pipeline, IndicSUPERB WER, HF model links  
- LuxeAI: product surface + ComfyUI pipeline depth  
- Rig: 7-GPU story + Reddit link in expand  
- Parentinc: Baby Tracker DAU, Flutter, analytics/LLM recsys  
- Origin color: built lab at home (7 GPUs) — in trajectory intro / how-I-work, not hero brand

Ask user later only if a claim needs confirmation (e.g. revenue, users on LuxeAI).

## Non-goals

- Full visual rebrand / new design system  
- Removing BriefSimulator / Terminal  
- Changing LinkedIn or GitHub profiles remotely  
- Publishing Anthropic application text verbatim

## Success

Someone pasting the URL gets a sharp preview. A lab or startup reviewer skims hero → LearningBench → work proof in under a minute; an interested reader can spend 10+ minutes in expands. No Anthropic or “empirical” residue. Platform links are obvious without scrolling to the footer.
