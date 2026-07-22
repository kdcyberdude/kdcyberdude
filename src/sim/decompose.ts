/* ============================================================
   Build-scoping engine — Karandeep's FDE.SIM.
   Deterministic, keyword-matched decomposition of an ambiguous
   0→1 brief into: scope → model → data → infra → product →
   plan → risks → receipts. No backend; feels live via typed reveal.
   (Illustrative of how Karandeep scopes a build — not an LLM.)
   ============================================================ */

export type Receipt = { label: string; projectId: string };

export type Stage = {
  id: string;
  label: string;
  lines: string[];
  receipts?: Receipt[];
};

export type Brief = {
  domain: string;
  read: string; // one-line read-back of what he heard
  stages: Stage[];
};

export const presets: { label: string; prompt: string }[] = [
  { label: "Regional-language voice assistant", prompt: "We need a voice assistant that understands and speaks a low-resource regional language." },
  { label: "Consumer AI photo product", prompt: "We want users to upload selfies and get studio-grade AI photos of themselves." },
  { label: "Recommendation engine at scale", prompt: "Build a personalized recommendation engine over our product + user data." },
  { label: "Self-host to cut inference cost", prompt: "Our OpenAI bill is exploding — can we self-host a model to cut inference cost?" },
  { label: "LLM support copilot", prompt: "We want an AI copilot that answers customer support questions from our docs." },
];

type Domain = {
  key: string;
  match: RegExp;
  read: (input: string) => string;
  stages: Omit<Stage, "id">[];
};

const S = (label: string, lines: string[], receipts?: Receipt[]): Omit<Stage, "id"> => ({
  label,
  lines,
  receipts,
});

const domains: Domain[] = [
  /* ---------- VOICE / SPEECH ---------- */
  {
    key: "voice",
    match: /voice|speech|asr|tts|audio|call|transcri|accent|dialect|language model|regional|punjabi|hindi/i,
    read: () => "a speech stack for a low-resource language — recognize it, understand it, speak it back.",
    stages: [
      S("scope", [
        "Three models, not one: ASR (speech→text), an LLM for intent, TTS (text→speech).",
        "The bottleneck isn't the model — it's data. Low-resource means the corpus doesn't exist yet. So the corpus IS the product.",
        "First cut: nail ASR word-error-rate on real accents before touching the assistant layer.",
      ]),
      S("model", [
        "ASR: fine-tune a strong multilingual base (Whisper-class) on our own corpus; distill for on-device if latency matters.",
        "LLM: a small, cheap, fine-tuned model beats a giant general one for a narrow domain — I've trained these.",
        "TTS: a modern neural TTS fine-tuned on a few clean speaker-hours; prosody is where cheap models fall over.",
      ]),
      S("data", [
        "Source at internet scale: broadcast, podcasts, video — wherever native speech lives.",
        "The unlock is access: DRM and API-obfuscation layers gate the good audio. I reverse-engineer those to source legally-grey-free, at scale.",
        "Pipeline: dedup → VAD segment → forced-align → filter by SNR/confidence → human spot-check. Garbage in, garbage model.",
      ], [{ label: "Treow AI — 100K+ hrs ASR corpus", projectId: "treow" }]),
      S("infra", [
        "Train on owned GPUs, not rented — at corpus scale the cloud bill dwarfs the hardware. Self-hosting pays for itself in weeks.",
        "Multi-GPU data-parallel for ASR; the fleet doubles as the inference tier.",
        "Serve ASR + TTS behind a queue so bursty traffic doesn't melt the GPUs.",
      ], [{ label: "The Rig — 7-GPU fleet", projectId: "rig" }]),
      S("product", [
        "Thin API first: /transcribe, /chat, /speak. Prove quality before the UI.",
        "Ship a narrow, real use-case (one domain, one workflow) end-to-end rather than a broad demo.",
        "Instrument WER and user corrections from day one — that feedback becomes next month's training data.",
      ]),
      S("plan", [
        "Wk 1 — data pipeline + first ASR fine-tune, measure WER on a real holdout.",
        "Wk 2 — LLM intent layer + TTS voice, wire the three into one API, ship to 10 real users.",
        "Then: close the data flywheel — corrections → retrain → measurably lower WER each cycle.",
      ]),
      S("risks", [
        "Data quality > data quantity — a 100K-hour pile of noise loses to 10K clean hours. Budget for filtering.",
        "Accent/dialect coverage: measure per-cohort, not just the average.",
        "Latency for real-time voice — plan the on-device/distill path before it's a fire.",
      ]),
    ],
  },

  /* ---------- IMAGE / DIFFUSION ---------- */
  {
    key: "image",
    match: /image|photo|selfie|headshot|portrait|avatar|diffusion|flux|stable|generat|art|studio|face/i,
    read: () => "personalized image generation — a user's photos in, studio-grade shots of them out.",
    stages: [
      S("scope", [
        "The magic is subject fidelity: the output has to actually look like the person, not a lookalike.",
        "That means a per-user model, not one shared model with a prompt. Personalization is the product.",
        "Quality bar is set by the worst output a user sees, not the best — so consistency is the real problem.",
      ]),
      S("model", [
        "Per-customer FLUX fine-tune on 10–20 of their photos — enough to lock identity without overfitting the background.",
        "Orchestrate generation as a ComfyUI graph: face/skin chains, upscalers, prompt libraries per vertical.",
        "For multi-subject (couples), a staged pipeline — inpaint with gender masks → dual-checkpoint consistency → fan-out.",
      ], [{ label: "LuxeAI — per-customer FLUX fine-tunes", projectId: "luxeai" }]),
      S("data", [
        "Crop-aware training-data prep: detect, center and clean the subject before it ever hits training.",
        "Curated prompt packs per vertical (newborn, maternity, couples, portrait) — the 'studio' is really a prompt + workflow library.",
        "Reject bad uploads early (blur, occlusion) — cheaper to catch at upload than after a wasted training run.",
      ]),
      S("infra", [
        "A self-hosted multi-GPU training + inference fleet — every paying user kicks off a real fine-tune job.",
        "Supabase-as-job-queue: onboard → train → generate → deliver, each a durable step you can retry.",
        "Bunny CDN + S3 for delivery; bulk ZIP export for the full shoot.",
      ], [{ label: "The Rig — training + inference fleet", projectId: "rig" }]),
      S("product", [
        "Guided studio onboarding so a non-technical user gets a great model without knowing what a checkpoint is.",
        "Realtime training status, credit ledger, pay-later, affiliate program — the whole commercial surface.",
        "Payments (Stripe / Razorpay), bulk delivery, the works. Shipped, not slideware.",
      ], [{ label: "LuxeAI — full product surface", projectId: "luxeai" }]),
      S("plan", [
        "Wk 1 — per-user fine-tune + ComfyUI generation graph, judged on identity fidelity.",
        "Wk 2 — job queue + onboarding + delivery, take a real payment end-to-end.",
        "Then: tune the consistency pipeline vertical-by-vertical against real user-rejected outputs.",
      ]),
      S("risks", [
        "Identity drift on hard poses/angles — measure fidelity per output, gate the bad ones.",
        "GPU cost per user vs. price point — the fine-tune has to fit the unit economics.",
        "Safety/consent on uploaded faces — policy + tooling, not an afterthought.",
      ]),
    ],
  },

  /* ---------- RECOMMENDATION / DATA ---------- */
  {
    key: "data",
    match: /recommend|rank|personaliz|analytics|etl|pipeline|data|warehouse|bigquery|dashboard|metric|churn|growth/i,
    read: () => "a personalization / data engine — turn your product + user data into decisions and lift.",
    stages: [
      S("scope", [
        "Two problems wearing one coat: (1) trustworthy data plumbing, (2) the model on top.",
        "Most 'recommendation' projects die at (1). Get the pipeline reliable and the model is the easy part.",
        "Define the metric that moves the business first — retention, conversion — then work backward.",
      ]),
      S("model", [
        "Start embarrassingly simple: popularity + recency baseline. It's the bar every fancy model must beat.",
        "Then embeddings + a ranking layer; an LLM-based recommender where semantic understanding actually earns its cost.",
        "Offline metric + online A/B — never ship a recommender on offline numbers alone.",
      ], [{ label: "theAsianparent — LLM recommendation engine", projectId: "babytracker" }]),
      S("data", [
        "Scalable ETL: BigQuery + Airbyte + custom Python extraction, feeding clean, versioned tables.",
        "Data quality and integrity across sources is the whole game — root-cause pipeline failures, don't paper over them.",
        "SOPs + docs so the pipeline survives the person who built it.",
      ], [{ label: "theAsianparent — ETL at company scale", projectId: "babytracker" }]),
      S("infra", [
        "Warehouse-native where possible; keep feature computation close to the data.",
        "Batch for the first cut; add streaming only where freshness provably moves the metric.",
        "Monitoring on data drift and pipeline health — a silent broken pipeline is worse than a loud one.",
      ]),
      S("product", [
        "Expose recommendations behind a stable API + a dashboard (Superset/Sigma) so stakeholders can see the lift.",
        "Ship to one surface, measure real lift, then expand. No big-bang rollout.",
        "Close the loop: log outcomes back into training data.",
      ]),
      S("plan", [
        "Wk 1 — reliable ETL + baseline recommender, instrument the target metric.",
        "Wk 2 — embedding/LLM ranking behind an A/B, ship to a slice of traffic.",
        "Then: iterate on the model only after the pipeline is boringly reliable.",
      ]),
      S("risks", [
        "Garbage/late data silently tanks quality — invest in validation and alerting up front.",
        "Cold-start for new users/items — have an explicit fallback.",
        "Vanity offline metrics — bias toward measured online lift.",
      ]),
    ],
  },

  /* ---------- SELF-HOST / INFERENCE COST ---------- */
  {
    key: "selfhost",
    match: /self.?host|inference cost|gpu|cheaper|reduce cost|on.?prem|latency|openai bill|token cost|serve/i,
    read: () => "moving off a metered API onto owned/controlled infra — cut the per-token bill, keep the quality.",
    stages: [
      S("scope", [
        "First question, not last: does an open model at your quality bar exist? Usually yes for narrow tasks.",
        "The real cost isn't tokens — it's GPUs sitting idle. Utilization is the number to optimize.",
        "Decide the line: self-host the 80% steady workload, burst the rest to cloud.",
      ]),
      S("model", [
        "Pick the smallest open model that clears your eval; fine-tune it on your domain to close the gap to the big API.",
        "Quantize / distill for throughput where quality allows — measure, don't assume.",
        "Keep a rigorous eval set so 'cheaper' never quietly means 'worse'.",
      ]),
      S("data", [
        "Your own traffic is the fine-tuning goldmine — capture prompts + accepted outputs (with consent) to specialize the model.",
        "Build the eval set from real failures, not toy prompts.",
      ]),
      S("infra", [
        "Owned GPUs for baseline load — at scale, hardware you own beats rented within weeks. I run a 7-GPU fleet doing exactly this.",
        "Batching + a queue for throughput; autoscale cloud burst for spikes.",
        "Containerize the serving stack so it's reproducible and portable.",
      ], [{ label: "The Rig — self-hosted train + serve", projectId: "rig" }]),
      S("product", [
        "Shadow-deploy: run self-hosted alongside the incumbent API, compare quality + cost on live traffic.",
        "Cut over per-route as confidence grows — no risky big-bang switch.",
      ]),
      S("plan", [
        "Wk 1 — model selection + eval harness + a self-hosted serving prototype.",
        "Wk 2 — shadow traffic, measure cost-per-request and quality delta, plan the cutover.",
        "Then: fine-tune on captured traffic to widen the cost/quality gap in your favor.",
      ]),
      S("risks", [
        "Ops burden of running GPUs — real, but I've done it; budget for it honestly.",
        "Quality regressions hiding in the average — eval per-segment.",
        "Utilization: idle GPUs erase the savings. Batch aggressively.",
      ]),
    ],
  },

  /* ---------- LLM / AGENT / RAG ---------- */
  {
    key: "llm",
    match: /chat|agent|assistant|rag|copilot|support|docs|knowledge|llm|gpt|prompt|question/i,
    read: () => "an LLM copilot grounded in your knowledge — useful answers, not confident hallucinations.",
    stages: [
      S("scope", [
        "The failure mode is confident wrongness. So the design goal is grounded + honest > clever.",
        "Retrieval quality caps answer quality — if the right chunk isn't retrieved, no model saves you.",
        "Pick one workflow it must nail before widening scope.",
      ]),
      S("model", [
        "Start with a strong general model + good retrieval; fine-tune only once you've hit its ceiling.",
        "Structure outputs (cite sources, admit uncertainty) — the UX of trust is a model+prompt+guardrail job.",
        "A small fine-tuned model can beat a big one for a narrow, repeated task — and it's far cheaper to serve.",
      ]),
      S("data", [
        "Ingest + chunk the knowledge base thoughtfully; chunking strategy quietly decides retrieval quality.",
        "Build an eval set of real questions with known-good answers before shipping.",
        "Log every answer + user reaction — that's your improvement loop.",
      ]),
      S("infra", [
        "Vector store + retrieval service + LLM behind a queue; self-host the model if volume justifies it (I can).",
        "Cache aggressively — repeated questions shouldn't cost a fresh generation.",
      ], [{ label: "The Rig — self-hosted inference", projectId: "rig" }]),
      S("product", [
        "Ship with citations visible and an 'I'm not sure' path — trust compounds, hallucinations destroy it.",
        "Deploy to one team/surface, watch real transcripts, fix the top failure modes weekly.",
      ]),
      S("plan", [
        "Wk 1 — ingestion + retrieval + a grounded answer path, plus an eval set.",
        "Wk 2 — guardrails, citations, ship to a real team, read the transcripts.",
        "Then: fine-tune / tune retrieval against logged real failures.",
      ]),
      S("risks", [
        "Hallucination + stale knowledge — grounding, citations, freshness policy.",
        "Retrieval misses — measure recall@k on the real question set.",
        "Cost per answer at scale — cache + right-size the model.",
      ]),
    ],
  },
];

/* ---------- GENERIC 0→1 FALLBACK ---------- */
const generic: Domain = {
  key: "generic",
  match: /.*/,
  read: (input) => `an ambiguous 0→1 build${input.trim() ? " — I'll scope it the way I scope anything from scratch" : ""}.`,
  stages: [
    S("scope", [
      "First move on anything ambiguous: find the one hard part. Everything else is plumbing around it.",
      "Define what 'working' means in a measurable number before writing code.",
      "Cut scope to the thinnest end-to-end slice that a real user can actually touch.",
    ]),
    S("model", [
      "If it's an ML problem: smallest model that clears the bar, fine-tuned on our own data, evaluated ruthlessly.",
      "If it's not: the boring, proven building block beats the clever one at 0→1.",
    ]),
    S("data", [
      "Whatever the system needs, the data pipeline is usually the real project — build it reliable and versioned.",
      "If the data doesn't exist, sourcing it IS the work. I've built internet-scale pipelines to do exactly that.",
    ], [{ label: "Treow AI — internet-scale data pipeline", projectId: "treow" }]),
    S("infra", [
      "Own the critical path: self-host where control + cost matter, rent where speed matters.",
      "Make it reproducible (containers) and observable (metrics) from day one.",
    ], [{ label: "The Rig — owned infra", projectId: "rig" }]),
    S("product", [
      "Ship the thin slice to real users fast; instrument it; let reality set the next priority.",
      "One workflow done end-to-end beats ten half-built features.",
    ]),
    S("plan", [
      "Wk 1 — the hard part, proven in isolation against a real metric.",
      "Wk 2 — wire it end-to-end and put it in front of a real user.",
      "Then: iterate on measured feedback, not opinions.",
    ]),
    S("risks", [
      "Building the wrong thing well — validate the problem before polishing the solution.",
      "Hidden data/quality issues — surface them early with real inputs.",
      "Scope creep — protect the thin slice.",
    ]),
  ],
};

const RECEIPTS_STAGE = (receipts: Receipt[]): Omit<Stage, "id"> => ({
  label: "receipts",
  lines: [
    "This isn't theory — I've shipped the pieces this brief needs. The proof:",
  ],
  receipts,
});

export function decompose(input: string): Brief {
  const text = input || "";
  const domain = domains.find((d) => d.match.test(text)) ?? generic;

  // collect receipts referenced across stages, de-duped
  const seen = new Set<string>();
  const receipts: Receipt[] = [];
  for (const st of domain.stages) {
    for (const r of st.receipts ?? []) {
      if (!seen.has(r.projectId + r.label)) {
        seen.add(r.projectId + r.label);
        receipts.push(r);
      }
    }
  }
  if (receipts.length === 0) {
    receipts.push(
      { label: "LuxeAI Studio — shipped product", projectId: "luxeai" },
      { label: "Treow AI — trained models", projectId: "treow" },
      { label: "The Rig — self-hosted fleet", projectId: "rig" },
    );
  }

  const stages: Stage[] = domain.stages.map((s, i) => ({ ...s, id: `${domain.key}-${i}` }));
  stages.push({ ...RECEIPTS_STAGE(receipts), id: `${domain.key}-receipts` });

  return {
    domain: domain.key,
    read: domain.read(text),
    stages,
  };
}
