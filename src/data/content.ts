/* ============================================================
   Single source of truth for all site copy + metrics.
   Karandeep — edit this file to update the site's content.
   ============================================================ */

export const profile = {
  name: "Karandeep Singh",
  handle: "kdcyberdude",
  triad: ["I train the models,", "build the product,", "and run the infra."],
  subline: "Founder-engineer · 0→1 · self-hosted GPU infra",
  location: "Chandigarh, India · open to relocation",
  availability: {
    status: "Open to work",
    roles: ["Founding Engineer", "Forward-Deployed Engineer", "Member of Technical Staff"],
    geos: "US & Europe",
  },
  summary:
    "Founder-engineer across the full AI stack. I trained LLM / ASR / TTS models on internet-scale data (100K+ hours of speech), architected a self-hosted multi-GPU fleet, and shipped consumer products to 100K+ daily active users. At home in ambiguous, zero-to-one problems — from research through production.",
  links: {
    email: "kdsingh.cyberdude@gmail.com",
    phone: "+91 62871 18222",
    linkedin: "https://linkedin.com/in/kdcyberdude",
    github: "https://github.com/kdcyberdude",
    huggingface: "https://huggingface.co/kdcyberdude",
    site: "https://kdcyberdude.com",
    resume: "/Karandeep_Singh_Resume.pdf",
    /** Optional public Bitbucket profile — set when you want it linked */
    bitbucket: "" as string,
  },
};

/* Headline metrics — the numbers that matter */
export const stats: { value: string; label: string; accent?: boolean }[] = [
  { value: "100K+", label: "hrs of speech, ASR corpus", accent: true },
  { value: "100K+", label: "daily active users shipped" },
  { value: "7", label: "GPU self-hosted fleet", accent: true },
  { value: "0→1", label: "products, research to prod" },
];

/* ---- §01 Build-scoping simulator presets live in sim/decompose.ts ---- */

/* ---- §02 Evidence / selected work ---- */
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
    kicker: "Consumer AI photography",
    href: "https://console.luxeai.studio",
    year: "2024 → now",
    role: "Co-Founder & CTO · Treow Intelligence",
    summary:
      "Users upload real photos, get a fully personalized diffusion model trained on their subject, and receive studio-grade shoots across newborn, maternity, couples, kids and portrait verticals. Built end-to-end — model, pipeline, product.",
    metrics: [
      { k: "per-customer", v: "FLUX fine-tunes" },
      { k: "pipeline", v: "3-stage couple-gen" },
      { k: "surface", v: "full product" },
    ],
    stack: ["FLUX fine-tuning", "ComfyUI", "Supabase job-queue", "EC2 / S3", "Stripe / Razorpay", "Bunny CDN"],
    bullets: [
      "Architected a self-hosted multi-GPU training + inference fleet with per-customer FLUX fine-tunes and ComfyUI worker orchestration, using Supabase as the job queue.",
      "Engineered a 3-stage couple-generation pipeline: Comfy inpaint with gender masks → dual-checkpoint subject consistency → multi-GPU fan-out.",
      "Shipped the entire product surface — guided studio onboarding, crop-aware training pipeline, realtime status, credit ledger, pay-later, affiliate program and bulk ZIP delivery.",
    ],
  },
  {
    id: "treow",
    name: "Treow AI",
    kicker: "Regional-language speech & language models",
    href: "https://huggingface.co/kdcyberdude",
    year: "2024 → now",
    role: "Co-Founder · Treow Intelligence",
    summary:
      "Proprietary Punjabi speech and language models trained on a self-built, internet-scale corpus. Owned the full research-to-production loop: sourcing, processing, training and evaluation.",
    metrics: [
      { k: "ASR", v: "100K+ hrs" },
      { k: "TTS", v: "1K+ hrs" },
      { k: "LLMs", v: "Punjabi, small" },
    ],
    stack: ["ASR / TTS training", "small LLMs", "internet-scale data pipeline", "self-hosted GPUs"],
    bullets: [
      "Built proprietary ASR (100K+ hrs) and TTS (1K+ hrs) models and trained Punjabi small LLMs on a self-built, large-scale corpus.",
      "Engineered an internet-scale data pipeline for sourcing and processing speech + text; reverse-engineered DRM and API-obfuscation layers to unlock Punjabi / Hindi / English audio at scale.",
      "Ran the whole stack on a self-built 7-GPU rig — among the most powerful personal AI setups in North India.",
    ],
  },
  {
    id: "babytracker",
    name: "Baby Tracker",
    kicker: "Parenting super-app · theAsianparent",
    year: "2021 → 2023",
    role: "Full-Stack Developer · The Parentinc",
    summary:
      "Architected and built a feature used by 100K+ daily active users inside theAsianparent — one of Southeast Asia's largest parenting platforms. Owned app architecture and state / data flow.",
    metrics: [
      { k: "scale", v: "100K+ DAU" },
      { k: "app size", v: "−30%" },
      { k: "platforms", v: "iOS + Android" },
    ],
    stack: ["Flutter", "Android / iOS", "state architecture", "CI/CD", "Mojito TMS"],
    bullets: [
      "Architected and built Baby Tracker (100K+ daily active users), owning app architecture and state / data flow.",
      "Led Flutter integration into existing Android / iOS apps; cut app size 30% via targeted optimization.",
      "Built an auto-translation library wired into CI/CD (Mojito TMS) for localization at ship-time.",
    ],
  },
  {
    id: "rig",
    name: "The Rig",
    kicker: "7-GPU self-hosted training & inference fleet",
    year: "2024 → now",
    role: "Designed, built & operated",
    summary:
      "A self-built 7-GPU fleet running every training and inference workload behind Treow and LuxeAI — among the most powerful personal AI setups in North India. Self-hosting is a moat: full control of the stack, no per-token bill, faster iteration.",
    metrics: [
      { k: "GPUs", v: "3× RTX 5090" },
      { k: "+", v: "4× RTX 4090" },
      { k: "workloads", v: "train + serve" },
    ],
    stack: ["multi-GPU training", "self-hosted inference", "Docker", "AWS (EC2 / S3)", "Cloudflare"],
    bullets: [
      "3× RTX 5090 + 4× RTX 4090, orchestrated for both fine-tuning and production inference.",
      "Runs the LuxeAI per-customer training fleet and the Treow ASR/TTS/LLM training jobs.",
      "Why self-host: control the whole stack, kill the per-token bill, iterate at the speed of hardware you own.",
    ],
  },
];

/* ---- §04 How I work — traits shown through evidence ---- */
export const traits: { title: string; proof: string }[] = [
  {
    title: "High agency",
    proof:
      "Built a 7-GPU training rig at home and reverse-engineered DRM to unlock the data no one was giving me. When the tool didn't exist, I built the tool.",
  },
  {
    title: "Full-stack ML depth",
    proof:
      "Same person trains the FLUX fine-tune, writes the ComfyUI pipeline, stands up the Supabase job queue, and wires Stripe into the checkout. No hand-off, no seams.",
  },
  {
    title: "Ships to real users",
    proof:
      "100K+ daily active users on Baby Tracker; a full paid product surface on LuxeAI. I optimize for shipped and used, not demoed.",
  },
  {
    title: "Founder instinct",
    proof:
      "Co-founded and ran a 0→1 research-and-product studio — set the technical direction, made the trade-offs, owned the outcome end-to-end.",
  },
  {
    title: "High integrity",
    proof:
      "Every number on this page is sourced from real work. The simulators are labeled as illustrative. I'd rather under-claim and over-deliver.",
  },
  {
    title: "Relentless energy",
    proof:
      "Research through production, model through infra through product — I compound output because I don't wait for permission or hand-offs.",
  },
];

export const growing =
  "What I'm still growing into: I've built at startup scale and personal-rig scale — I'm hungry for the discipline of a strong senior team, larger distributed systems, and the bar that comes with world-class peers.";

/* ---- §05 Experience timeline ---- */
export type Job = {
  org: string;
  role: string;
  period: string;
  note: string;
};

export const timeline: Job[] = [
  {
    org: "Treow Intelligence",
    role: "Co-Founder & CTO",
    period: "Oct 2024 — Present",
    note: "AI research-and-product studio: LuxeAI Studio (consumer AI photography) + Treow AI (regional-language speech & language models), all on self-hosted infra.",
  },
  {
    org: "The Parentinc · theAsianparent",
    role: "Machine Learning & Data Engineer",
    period: "Feb 2023 — Mar 2024",
    note: "Scalable ETL (BigQuery, Airbyte, Sigma, Apache Superset) + custom Python extraction; LLM-based recommendation engine; root-cause fixes and SOPs that cut onboarding time.",
  },
  {
    org: "The Parentinc · theAsianparent",
    role: "Full-Stack Developer",
    period: "Apr 2021 — Jun 2023",
    note: "Built Baby Tracker (100K+ DAU); Flutter integration into native apps; −30% app size; auto-translation library wired into CI/CD.",
  },
  {
    org: "Freelance & Artistic Hobby",
    role: "Founder / Cross-platform Developer",
    period: "2019 — 2021",
    note: "Founded Artistic Hobby (artist collaboration platform). Shipped a cross-platform e-commerce app end-to-end on a single Flutter codebase.",
  },
];

export const education = {
  school: "Lyallpur Khalsa College of Engineering",
  degree: "B.Tech — Mathematics & Computer Science",
  period: "2016 — 2020",
  gpa: "GPA 8.61 / 10",
};

export const honors = [
  "Runner-up · 24-hr Hackathon, ADVITIYA Techfest, IIT Ropar",
  "2nd Place · The Geek Showdown Hackathon, CGC Landran",
  "Winner · Code Debugging & Software Showcase, PLASMA Techfest",
];

/* ---- §06 Skills matrix ---- */
export const skills: { group: string; items: string[] }[] = [
  {
    group: "AI / ML",
    items: ["LLM training & fine-tuning", "ASR", "TTS", "diffusion models", "ComfyUI", "dataset engineering"],
  },
  {
    group: "Data / Pipelines",
    items: ["internet-scale acquisition", "ETL", "BigQuery", "Airbyte", "Apache Superset", "Sigma", "web scraping", "SQL"],
  },
  {
    group: "Infra / MLOps",
    items: ["multi-GPU training & inference", "self-hosted GPU fleets", "AWS (EC2 / S3)", "Supabase", "Bunny CDN", "Cloudflare", "Docker"],
  },
  {
    group: "Languages / Product",
    items: ["Python", "Dart", "C / C++", "Java", "JavaScript", "SQL", "Flutter (iOS / Android)", "Stripe / Razorpay"],
  },
];

/* ---- §07 Probes / open work — partial builds, agents, forks ----
   Framing: high-agency scratchpad, not a polished product gallery.
   Edit freely — add Bitbucket URLs when you're ready to share them. */
export type ProbeStatus = "public" | "private" | "fork" | "probe";

export type Probe = {
  id: string;
  name: string;
  kicker: string;
  status: ProbeStatus;
  blurb: string;
  stack: string[];
  href?: string;
  /** Where it lives when not on the public GitHub profile */
  host?: "github" | "bitbucket" | "local";
};

export const probesIntro =
  "I write a lot of code. Most of it never touches the public GitHub contribution graph — private product, Bitbucket, self-hosted training repos, local agent stacks. What's below is a sample of the reach: agents, evals, speech scratch, and upstream digs I open when the work needs them. Partial is fine. The graph is not the work.";

export const probesNote =
  "If you're hiring off greens: look at the shipped systems above, then ask me to walk a private repo. Happy to.";

export const probes: Probe[] = [
  {
    id: "tess",
    name: "TESS",
    kicker: "Personal agent stack",
    status: "probe",
    host: "github",
    href: "https://github.com/kdcyberdude/tess-plugins",
    blurb:
      "A Cursor-inspired agent environment — skills, manifests, hooks — aimed at a Salvation-series style \"test super-intelligent system.\" Plugin surface for goal state + SPOC evolutionary memory; wired for Cursor / Claude / Codex session hooks.",
    stack: ["agent plugins", "hooks", "Cursor", "Claude / Codex", "skills"],
  },
  {
    id: "browser-recall",
    name: "Browser Recall",
    kicker: "Browser agent / memory",
    status: "private",
    host: "bitbucket",
    // TODO: paste Bitbucket (or public) URL when shareable
    href: undefined,
    blurb:
      "A browser-side recall / agent experiment — remembering what was seen and acting on it across sessions. Lives on Bitbucket while I still own the iteration loop; happy to walk through it on a call.",
    stack: ["browser agent", "session memory", "Bitbucket"],
  },
  {
    id: "harvestgym",
    name: "HARvestGym",
    kicker: "API agents · no browser",
    status: "public",
    host: "github",
    href: "https://github.com/kdcyberdude/HARvestGym",
    blurb:
      "RL env that trains a small model to reverse-engineer a web app's APIs and complete real tasks over raw HTTP — no browser, no docs, just a URL and a goal. Browser-free automation as a training problem.",
    stack: ["RL", "API reverse-engineering", "HTTP agents", "WebArena"],
  },
  {
    id: "learningbench",
    name: "LearningBench",
    kicker: "Inference-time learning eval",
    status: "public",
    host: "github",
    href: "https://github.com/kdcyberdude/LearningBench",
    blurb:
      "Benchmark for how LLMs learn inside a conversation — associative learning, concept formation, language induction — on systems that have never existed before. Also on Kaggle.",
    stack: ["eval", "in-context learning", "Kaggle", "135 tasks"],
  },
  {
    id: "punjabi-asr",
    name: "Punjabi ASR",
    kicker: "Speech · public scratch",
    status: "public",
    host: "github",
    href: "https://github.com/kdcyberdude/Punjabi_ASR",
    blurb:
      "Public notebooks and scratch for Punjabi speech recognition — a window into the larger Treow ASR corpus work (100K+ hrs) that mostly lives off GitHub.",
    stack: ["ASR", "Punjabi", "notebooks"],
  },
  {
    id: "json-mojito",
    name: "json_file_generator",
    kicker: "Flutter · localization CI",
    status: "public",
    host: "github",
    href: "https://github.com/kdcyberdude/json_file_generator",
    blurb:
      "Dart package that turns strings into Mojito TMS JSON in the CD pipeline — the localization automation I shipped while building Baby Tracker at theAsianparent.",
    stack: ["Flutter", "Dart", "Mojito TMS", "CI/CD"],
  },
];

/** Upstream digs — forks / patches when the tool didn't do what I needed. */
export const digs: { name: string; note: string; href: string }[] = [
  {
    name: "ComfyUI",
    note: "Fork — diffusion graph tooling for LuxeAI pipelines",
    href: "https://github.com/kdcyberdude/ComfyUI",
  },
  {
    name: "vLLM",
    note: "Fork — high-throughput serving when self-hosting inference",
    href: "https://github.com/kdcyberdude/vllm",
  },
  {
    name: "Unsloth",
    note: "Fork — faster / leaner fine-tunes on owned GPUs",
    href: "https://github.com/kdcyberdude/unsloth",
  },
  {
    name: "gstack",
    note: "Fork — agent/CEO tooling stack I run and extend",
    href: "https://github.com/kdcyberdude/gstack",
  },
  {
    name: "RealtimeTTS",
    note: "Fork — low-latency speech for voice stacks",
    href: "https://github.com/kdcyberdude/RealtimeTTS",
  },
];

/* ---- Writing — placeholder stubs Karandeep fills later ---- */
export const writing: { title: string; blurb: string; href?: string; soon?: boolean }[] = [
  {
    title: "Why I self-host 7 GPUs instead of renting cloud",
    blurb: "The economics and the iteration speed of owning your training hardware.",
    soon: true,
  },
  {
    title: "Building an internet-scale Punjabi speech corpus",
    blurb: "Sourcing, DRM, and the data pipeline behind a 100K-hour ASR dataset.",
    soon: true,
  },
  {
    title: "Per-customer diffusion fine-tunes in production",
    blurb: "The LuxeAI pipeline: from a user's photos to a studio-grade shoot.",
    soon: true,
  },
];
