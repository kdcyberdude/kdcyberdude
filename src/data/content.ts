/* ============================================================
   Single source of truth — Karandeep Singh / kdcyberdude.com
   Tuned for Anthropic Fellows + applied ML / FDE audiences.
   ============================================================ */

export const profile = {
  name: "Karandeep Singh",
  handle: "kdcyberdude",
  headline: "I turn ambiguous problems into measurable experiments.",
  subline:
    "Applied ML engineer — evals, model training, self-hosted infra. Empirical research through production.",
  location: "Jalandhar, India · open to relocation / remote",
  availability: {
    status: "Open to research labs & ambitious teams",
    roles: [
      "Anthropic Fellows / research eng",
      "Applied ML Researcher",
      "Forward-Deployed / Founding Engineer",
      "Member of Technical Staff",
    ],
    geos: "US, UK, Canada & remote-friendly teams",
  },
  summary:
    "I design evaluations, train models, and run the hardware that makes the loop real. $25K Grand Prize winner (Google DeepMind × Kaggle) for LearningBench — a benchmark of inference-time learning. Built ASR/TTS/LLMs on 100K+ hours of speech (6.96–10.18% WER on IndicSUPERB), a 7-GPU self-hosted fleet, and consumer AI products.",
  links: {
    email: "kdsingh.cyberdude@gmail.com",
    phone: "+91 62871 18222",
    linkedin: "https://www.linkedin.com/in/kdcyberdude",
    github: "https://github.com/kdcyberdude",
    huggingface: "https://huggingface.co/kdcyberdude",
    site: "https://kdcyberdude.com",
    resume: "/Karandeep_Singh_Resume.pdf",
    learningBench:
      "https://learningbench-project-page-918170344855.us-west1.run.app/",
    learningBenchRepo: "https://github.com/kdcyberdude/LearningBench",
    learningBenchWriteup:
      "https://www.kaggle.com/competitions/kaggle-measuring-agi/writeups/learningbench",
    kaggleBenchmark: "https://www.kaggle.com/benchmarks",
    treow: "https://www.treowintelligence.com/",
    asrModel: "https://huggingface.co/kdcyberdude/w2v-multilingual-v1.4-scratch",
    ttsModel: "https://huggingface.co/kdcyberdude/tts-pa-v0.1",
    llmModel: "https://huggingface.co/kdcyberdude/gemma_sft_galbat_v1",
    rigPost:
      "https://www.reddit.com/r/comfyui/comments/1pd072e/i_built_a_7gpu_ai_monster_rig_at_home_35090_44090/",
  },
};

export const stats: { value: string; label: string; accent?: boolean }[] = [
  { value: "$25K", label: "DeepMind × Kaggle Grand Prize", accent: true },
  { value: "135", label: "LearningBench tasks · 14 models", accent: true },
  { value: "100K+", label: "hrs speech · ASR corpus" },
  { value: "7", label: "GPU self-hosted fleet" },
];

/* ---- LearningBench flagship ---- */
export const learningBench = {
  name: "LearningBench",
  award: "$25,000 Grand Prize · Google DeepMind × Kaggle",
  kicker: "Measuring inference-time learning in LLMs",
  year: "Mar – Apr 2026",
  summary:
    "Existing benchmarks measure what models already know. LearningBench measures how they learn — from scratch, inside a single conversation, on systems that have never existed before. No memorisation can help.",
  bullets: [
    "Won the $25,000 Grand Prize as a solo, first-time Kaggle competitor against 1,068 teams — Learning track in DeepMind’s “Measuring Progress Toward AGI: Cognitive Abilities.”",
    "Presents frontier models with entirely new systems they must learn the rules of inside a single conversation — testing in-context learning, not pretrained knowledge recall.",
    "135 programmatic tasks across 6 cognitive sub-abilities; evaluated 14 models from small to frontier.",
    "Featured on Kaggle’s official benchmark page; #2 most-voted community benchmark.",
  ],
  metrics: [
    { k: "tasks", v: "135" },
    { k: "models", v: "14" },
    { k: "sub-abilities", v: "6" },
    { k: "novelty", v: "100%" },
  ],
  findings: [
    {
      title: "Scale ≠ learning",
      blurb:
        "11 of 14 models scored below 0.50 when genuine in-context learning was required. Larger models are not automatically better learners.",
    },
    {
      title: "Reasoning helps induction",
      blurb:
        "Qwen Thinking vs Instruct: +183% on Concept Formation; extended reasoning lifts induction-heavy skills more than scale alone.",
    },
    {
      title: "Evidence appetite predicts skill",
      blurb:
        "Models that seek less evidence score higher (ρ = −0.52). Stalling ≠ learning — hypothesis updating matters.",
    },
  ],
  href: "https://learningbench-project-page-918170344855.us-west1.run.app/",
  writeup:
    "https://www.kaggle.com/competitions/kaggle-measuring-agi/writeups/learningbench",
  repo: "https://github.com/kdcyberdude/LearningBench",
};

/* ---- Selected work ---- */
export type Project = {
  id: string;
  name: string;
  kicker: string;
  href?: string;
  year: string;
  role: string;
  summary: string;
  metrics: { k: string; v: string }[];
  stack: string[];
  bullets: string[];
};

export const projects: Project[] = [
  {
    id: "luxeai",
    name: "LuxeAI Studio",
    kicker: "Consumer AI photography · end-to-end",
    href: "https://console.luxeai.studio",
    year: "2024 → now",
    role: "Co-Founder & CTO · Treow Intelligence",
    summary:
      "Users upload real photos, get a personalized diffusion model, and receive studio-grade shoots. Model, pipeline, and product — owned end-to-end on self-hosted GPUs.",
    metrics: [
      { k: "fine-tunes", v: "per-customer FLUX" },
      { k: "pipeline", v: "1290+ ComfyUI nodes" },
      { k: "surface", v: "full product" },
    ],
    stack: ["FLUX", "ComfyUI", "Supabase", "EC2 / S3", "Stripe / Razorpay"],
    bullets: [
      "Shipped end-to-end: studio console (crop-aware training, realtime generation streams), billing (credit ledger, Stripe/Razorpay, pay-later), and growth (affiliates, bulk delivery, third-party API).",
      "Productionized a multi-stage ComfyUI pipeline — 1290+ nodes covering segmentation-driven inpainting, ControlNet conditioning, and multi-model scaling — as a parameterized backend service.",
      "Supabase + EC2 route requests to a self-hosted home GPU server for training and inference.",
    ],
  },
  {
    id: "treow",
    name: "Treow AI",
    kicker: "Regional speech & language models",
    href: "https://www.treowintelligence.com/",
    year: "2024 → now",
    role: "Co-Founder · Treow Intelligence",
    summary:
      "Proprietary Punjabi ASR / TTS and small LLMs on a self-built internet-scale corpus. Full loop: source → process → train → evaluate.",
    metrics: [
      { k: "ASR", v: "100K+ hrs" },
      { k: "WER", v: "6.96–10.18%" },
      { k: "TTS", v: "1K+ hrs" },
    ],
    stack: ["ASR / TTS", "small LLMs", "data pipelines", "self-hosted GPUs"],
    bullets: [
      "Built proprietary ASR (100K+ hours; 6.96–10.18% WER on AI4Bharat’s IndicSUPERB) and TTS (1K+ hours); trained Punjabi small LLMs on a self-built synthetic dataset.",
      "Engineered an internet-scale ETL pipeline for speech + text; sourced Punjabi, Hindi, and English audio at scale.",
      "Models on Hugging Face: multilingual ASR, Punjabi TTS, and Punjabi Gemma SFT — all trained on the self-hosted 7-GPU rig.",
    ],
  },
  {
    id: "rig",
    name: "The Rig",
    kicker: "7-GPU training & inference fleet",
    href: "https://www.reddit.com/r/comfyui/comments/1pd072e/i_built_a_7gpu_ai_monster_rig_at_home_35090_44090/",
    year: "2024 → now",
    role: "Designed, built & operated",
    summary:
      "Self-built multi-GPU fleet behind Treow and LuxeAI — control the stack, kill the per-token bill, iterate at hardware speed.",
    metrics: [
      { k: "GPUs", v: "3× 5090 + 4× 4090" },
      { k: "workloads", v: "train + serve" },
      { k: "ops", v: "self-hosted" },
    ],
    stack: ["multi-GPU", "Docker", "AWS EC2 / S3", "Cloudflare", "ComfyUI / vLLM"],
    bullets: [
      "Assembled and run a 7-GPU training rig (3× RTX 5090 + 4× RTX 4090) — among the most powerful personal AI setups in North India.",
      "Runs LuxeAI customer training/inference and Treow ASR/TTS/LLM jobs on owned hardware.",
      "Self-hosting as a moat: full control, lower marginal cost, faster experiment loops.",
    ],
  },
  {
    id: "babytracker",
    name: "Baby Tracker",
    kicker: "Parenting super-app · 100K+ DAU",
    href: "https://play.google.com/store/apps/details?id=com.tickledmedia.ParentTown&hl=en_IN",
    year: "2021 → 2024",
    role: "Full-Stack → ML & Data · The Parentinc",
    summary:
      "Architected a feature used by 100K+ daily active users inside theAsianparent. Later owned analytics migration and an LLM recommendation engine.",
    metrics: [
      { k: "scale", v: "100K+ DAU" },
      { k: "app size", v: "−30%" },
      { k: "data", v: "Airbyte → Sigma" },
    ],
    stack: ["Flutter", "Airbyte", "Sigma", "LLM recsys", "CI/CD"],
    bullets: [
      "Architected Baby Tracker (100K+ DAU); integrated Flutter into legacy Android/iOS codebases, cutting app size ~30%.",
      "Led vendor evaluation and migrated Grow Analytics to Sigma; unified analytics via Airbyte while resolving cross-source consistency issues.",
      "Built an LLM-based recommendation engine injecting in-shop product recommendations into thousands of existing articles; CI/CD with Mojito TMS auto-translation.",
    ],
  },
];

export const traits: { title: string; proof: string }[] = [
  {
    title: "Empirical first",
    proof:
      "LearningBench wasn’t a vibes eval — 135 programmatic tasks, programmatic ground truth, trajectory metrics. I measure learning, not just accuracy.",
  },
  {
    title: "First principles → thin experiment",
    proof:
      "Find the one hard claim, define the observable, run the smallest test that could kill the idea. Then scale what survives.",
  },
  {
    title: "Full-stack ML depth",
    proof:
      "Same person designs the eval, trains the model, stands up the GPU job queue, and ships the product surface.",
  },
  {
    title: "High agency",
    proof:
      "Built a 7-GPU fleet at home and sourced internet-scale regional speech when the corpus didn’t exist. When the tool is missing, I build it.",
  },
];

export type Job = {
  org: string;
  role: string;
  period: string;
  /** Human tenure, e.g. "3 yrs" or "1 yr 2 mo" */
  duration: string;
  summary: string;
  bullets: string[];
  href?: string;
};

/** Arc summary shown above the timeline */
export const trajectoryIntro =
  "Full-stack product engineer → ML & data → research / training on owned infra. ~3 years shipping at theAsianparent (apps at 100K+ DAU, then company data + ML), then building Treow end-to-end — models, fleet, and product — plus LearningBench.";

export const timeline: Job[] = [
  {
    org: "Treow Intelligence",
    role: "Co-Founder & CTO",
    period: "Oct 2024 — Present",
    duration: "~1 yr 10 mo",
    href: "https://www.treowintelligence.com/",
    summary:
      "AI-native studio on self-hosted GPUs: consumer diffusion product (LuxeAI) + regional speech/LLM work (Treow AI). LearningBench Grand Prize in parallel.",
    bullets: [
      "Own the loop: dataset → train / fine-tune → eval → serve — on a 7-GPU fleet (3× 5090 + 4× 4090).",
      "LuxeAI: crop-aware training, realtime generation, ComfyUI orchestration (1290+ nodes), full paid product surface.",
      "Treow AI: ASR on 100K+ hrs (6.96–10.18% WER on IndicSUPERB), TTS, Punjabi small LLMs; internet-scale data pipelines.",
      "LearningBench (Mar–Apr 2026): $25K DeepMind × Kaggle Grand Prize — inference-time learning benchmark.",
    ],
  },
  {
    org: "The Parentinc · theAsianparent",
    role: "Machine Learning & Data Engineer",
    period: "Feb 2023 — Mar 2024",
    duration: "1 yr 2 mo",
    href: "https://theparentinc.com/",
    summary:
      "Moved from full-stack into the data / ML track at Southeast Asia’s parenting super-app — analytics platform migration and LLM personalization.",
    bullets: [
      "Led vendor evaluation and migrated Grow Analytics to Sigma; unified analytics, production, and shopping-platform data via Airbyte.",
      "Built an LLM-based recommendation engine injecting in-shop product recommendations into thousands of existing articles.",
    ],
  },
  {
    org: "The Parentinc · theAsianparent",
    role: "Full-Stack Developer",
    period: "Apr 2021 — Jun 2023",
    duration: "2 yrs 3 mo",
    href: "https://theparentinc.com/",
    summary:
      "Product engineering on mobile at scale. Overlapped the last months with the ML & Data role as I transitioned into recommendations and pipelines.",
    bullets: [
      "Architected Baby Tracker — used by 100K+ daily active users inside theAsianparent.",
      "Led Flutter integration into existing Android / iOS apps; cut app size ~30%.",
      "Built CI/CD covering validation, build distribution, and auto-translation (Mojito TMS).",
    ],
  },
  {
    org: "Independent",
    role: "Founder / Freelance developer",
    period: "2019 — 2021",
    duration: "~2 yrs",
    summary:
      "Early 0→1 before full-time: artist collaboration platform and a cross-platform Flutter e-commerce app.",
    bullets: [
      "Shipped an artist collaboration platform and a freelance Flutter e-commerce app (iOS + Android, one codebase).",
    ],
  },
];

export const education = {
  school: "Lyallpur Khalsa College of Engineering",
  degree: "B.Tech — Computer Science",
  period: "2016 — 2020",
  gpa: "GPA 8.61 / 10",
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Research / Eval",
    items: [
      "benchmark design",
      "inference-time learning",
      "model evaluation",
      "experiment design",
      "dataset engineering",
    ],
  },
  {
    group: "AI / ML",
    items: ["LLM fine-tuning", "ASR", "TTS", "diffusion / FLUX", "ComfyUI", "PyTorch"],
  },
  {
    group: "Infra / MLOps",
    items: [
      "multi-GPU training & inference",
      "self-hosted fleets",
      "AWS",
      "Docker",
      "Supabase",
      "vLLM",
    ],
  },
  {
    group: "Product / Eng",
    items: ["Python", "TypeScript", "Flutter", "full-stack", "Stripe / Razorpay"],
  },
];

export type ProbeStatus = "public" | "private" | "fork" | "probe";

export type Probe = {
  id: string;
  name: string;
  kicker: string;
  status: ProbeStatus;
  blurb: string;
  stack: string[];
  href?: string;
  host?: "github" | "bitbucket" | "local";
};

export const probesIntro =
  "Public GitHub is a slice. Private product and training repos live on the rig — curated samples below.";

export const probes: Probe[] = [
  {
    id: "learningbench",
    name: "LearningBench",
    kicker: "Inference-time learning eval",
    status: "public",
    host: "github",
    href: "https://github.com/kdcyberdude/LearningBench",
    blurb:
      "135 tasks · 6 cognitive sub-abilities. DeepMind × Kaggle Grand Prize. Also on Kaggle’s official benchmarks.",
    stack: ["eval", "in-context learning", "Kaggle"],
  },
  {
    id: "harvestgym",
    name: "HARvestGym",
    kicker: "API agents · no browser",
    status: "public",
    host: "github",
    href: "https://github.com/kdcyberdude/HARvestGym",
    blurb:
      "RL env: reverse-engineer a web app’s APIs and complete tasks over raw HTTP — URL + goal, no browser.",
    stack: ["RL", "HTTP agents", "API reverse-engineering"],
  },
  {
    id: "punjabi-asr",
    name: "Punjabi ASR",
    kicker: "Speech · public scratch",
    status: "public",
    host: "github",
    href: "https://github.com/kdcyberdude/Punjabi_ASR",
    blurb:
      "Public notebooks into the larger Treow ASR corpus (100K+ hrs; 6.96–10.18% WER on IndicSUPERB).",
    stack: ["ASR", "Punjabi", "IndicSUPERB"],
  },
  {
    id: "tess",
    name: "TESS",
    kicker: "Personal agent stack",
    status: "probe",
    host: "github",
    href: "https://github.com/kdcyberdude/tess-plugins",
    blurb: "Agent environment — skills, manifests, hooks — for Cursor / Claude / Codex sessions.",
    stack: ["agents", "hooks", "skills"],
  },
];
