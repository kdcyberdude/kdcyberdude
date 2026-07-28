/* ============================================================
   Single source of truth — Karandeep Singh / kdcyberdude.com
   Storytelling CV for research labs & deep-tech teams.
   ============================================================ */

export const profile = {
  name: "Karandeep Singh",
  handle: "kdcyberdude",
  headline: "I turn ambiguous problems into measurable experiments — then ship them.",
  subline:
    "Model training & evaluation · self-hosted GPU infra · 0→1 product.",
  location: "Jalandhar, India · open to relocation",
  availability: {
    status: "Open to research labs & deep-tech teams",
    roles: [
      "Researcher / Research Engineer",
      "Applied ML Engineer",
      "Forward-Deployed Engineer",
      "Member of Technical Staff",
    ],
  },
  summary:
    "I design evaluations, train models, and run the hardware that makes the loop real. My work spans a $25K Google DeepMind × Kaggle Grand Prize, ASR/TTS/LLMs built on 100K+ hours of speech, a 7-GPU home lab, and consumer AI products.",
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
    kaggleProfile: "https://www.kaggle.com/kdcyberdude",
    kaggleBenchmark: "https://www.kaggle.com/benchmarks",
    pressCoverage:
      "https://prabhattimes.com/news/er-karandeep-singh-google-deepmind",
    harvestGym: "https://github.com/kdcyberdude/HARvestGym",
    treow: "https://www.treowintelligence.com/",
    luxeai: "https://console.luxeai.studio",
    asrModel: "https://huggingface.co/kdcyberdude/w2v-multilingual-v1.4-scratch",
    ttsModel: "https://huggingface.co/kdcyberdude/tts-pa-v0.1",
    llmModel: "https://huggingface.co/kdcyberdude/gemma_sft_galbat_v1",
    rigPost:
      "https://www.reddit.com/r/comfyui/comments/1pd072e/i_built_a_7gpu_ai_monster_rig_at_home_35090_44090/",
    mojitoBlog:
      "https://medium.com/@kdsingh.cyberdude/automate-the-process-of-localization-using-mojito-translation-management-system-tms-in-android-and-5c4d26953fb5",
    parentinc: "https://theparentinc.com/",
    babyTrackerApp:
      "https://play.google.com/store/apps/details?id=com.tickledmedia.ParentTown&hl=en_IN",
  },
};

/** Primary platforms — shown prominently in the hero */
export const platforms: {
  label: string;
  href: string;
  handle: string;
  external?: boolean;
}[] = [
  {
    label: "GitHub",
    href: "https://github.com/kdcyberdude",
    handle: "kdcyberdude",
    external: true,
  },
  {
    label: "Hugging Face",
    href: "https://huggingface.co/kdcyberdude",
    handle: "kdcyberdude",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kdcyberdude",
    handle: "in/kdcyberdude",
    external: true,
  },
  {
    label: "Email",
    href: "mailto:kdsingh.cyberdude@gmail.com",
    handle: "kdsingh.cyberdude@gmail.com",
  },
];

export const stats: { value: string; label: string; accent?: boolean }[] = [
  { value: "$25K", label: "DeepMind × Kaggle Grand Prize", accent: true },
  { value: "100K+", label: "hrs speech · ASR corpus" },
  { value: "6.96%", label: "best IndicSUPERB WER" },
  { value: "7", label: "GPUs · home lab" },
];

/* ---- LearningBench flagship ---- */
export const learningBench = {
  name: "LearningBench",
  award: "$25,000 Grand Prize · Google DeepMind × Kaggle",
  kicker: "Measuring inference-time learning in LLMs",
  year: "Mar – Apr 2026",
  summary:
    "Can a model acquire a genuinely new system inside one conversation, rather than retrieve something memorised? I built a benchmark to answer that question — solo, as a first-time Kaggle competitor — and won the Grand Prize against 1,068 teams.",
  bullets: [
    "Entirely new rule systems make pretraining recall useless; models have to learn from evidence in the conversation.",
    "Programmatic ground truth and trajectory metrics separate genuine learning from plausible-looking final answers.",
    "Featured on [Kaggle’s official benchmark page](https://www.kaggle.com/benchmarks) as the #2 most-voted community benchmark.",
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
  benchmarks: "https://www.kaggle.com/benchmarks",
  kaggleProfile: "https://www.kaggle.com/kdcyberdude",
  press: "https://prabhattimes.com/news/er-karandeep-singh-google-deepmind",
};

/* ---- Selected work ---- */
export type ExtLink = { label: string; href: string };

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
  /** Bullets support `[label](url)` markdown for deep links */
  bullets: string[];
  links?: ExtLink[];
};

export const projects: Project[] = [
  {
    id: "treow",
    name: "Treow AI",
    kicker: "Regional speech & language models",
    href: "https://www.treowintelligence.com/",
    year: "2024 → now",
    role: "Co-Founder · Treow Intelligence",
    summary:
      "Punjabi ASR / TTS and small LLMs on a self-built corpus — from ~550 public hours to 100,000+ hours of speech.",
    metrics: [
      { k: "ASR", v: "100K+ hrs" },
      { k: "WER", v: "6.96–10.18%" },
      { k: "TTS", v: "1K+ hrs" },
    ],
    stack: ["ASR / TTS", "small LLMs", "data pipelines", "self-hosted GPUs"],
    bullets: [
      "Built proprietary ASR (100K+ hours; 6.96–10.18% WER on AI4Bharat’s IndicSUPERB) and TTS (1K+ hours); trained Punjabi small LLMs on a self-built synthetic dataset.",
      "Engineered an internet-scale ETL pipeline for speech + text; sourced Punjabi, Hindi, and English audio at scale.",
      "Teacher–student style curation to grow usable training data far beyond what was publicly available for Punjabi.",
      "Open models on Hugging Face: [multilingual ASR](https://huggingface.co/kdcyberdude/w2v-multilingual-v1.4-scratch), [Punjabi TTS](https://huggingface.co/kdcyberdude/tts-pa-v0.1), and [Punjabi Gemma SFT](https://huggingface.co/kdcyberdude/gemma_sft_galbat_v1).",
    ],
    links: [
      { label: "Treow", href: "https://www.treowintelligence.com/" },
      { label: "Hugging Face", href: "https://huggingface.co/kdcyberdude" },
      { label: "ASR model", href: "https://huggingface.co/kdcyberdude/w2v-multilingual-v1.4-scratch" },
      { label: "TTS model", href: "https://huggingface.co/kdcyberdude/tts-pa-v0.1" },
      { label: "LLM", href: "https://huggingface.co/kdcyberdude/gemma_sft_galbat_v1" },
    ],
  },
  {
    id: "luxeai",
    name: "LuxeAI Studio",
    kicker: "Consumer AI photography",
    href: "https://console.luxeai.studio",
    year: "2024 → now",
    role: "Co-Founder & CTO · Treow Intelligence",
    summary:
      "Users upload real photos, get a personalized diffusion model, and receive studio-grade shoots — model, pipeline, and product on self-hosted GPUs.",
    metrics: [
      { k: "fine-tunes", v: "300+ FLUX" },
      { k: "pipeline", v: "1290+ ComfyUI nodes" },
      { k: "surface", v: "full product" },
    ],
    stack: ["FLUX", "ComfyUI", "Supabase", "EC2 / S3", "Stripe / Razorpay"],
    bullets: [
      "Shipped end-to-end: studio console (crop-aware training, realtime generation streams), billing (credit ledger, Stripe/Razorpay, pay-later), and growth (affiliates, bulk delivery, third-party API).",
      "Productionized a multi-stage ComfyUI pipeline — 1290+ nodes covering segmentation-driven inpainting, ControlNet conditioning, and multi-model scaling — as a parameterized backend service.",
      "Supabase + EC2 route requests to a self-hosted home GPU server for training and inference. [Home lab write-up →](https://www.reddit.com/r/comfyui/comments/1pd072e/i_built_a_7gpu_ai_monster_rig_at_home_35090_44090/)",
      "Ran 300+ customer fine-tunes in production — each person gets their own model, then studio-grade shoots from the same pipeline.",
    ],
    links: [
      { label: "Console", href: "https://console.luxeai.studio" },
      { label: "Treow", href: "https://www.treowintelligence.com/" },
    ],
  },
  {
    id: "homelab",
    name: "Home lab",
    kicker: "7 GPUs · training & inference",
    href: "https://www.reddit.com/r/comfyui/comments/1pd072e/i_built_a_7gpu_ai_monster_rig_at_home_35090_44090/",
    year: "2024 → now",
    role: "Designed, built & operated",
    summary:
      "No research lab nearby — so I built one at home. Seven GPUs behind Treow and LuxeAI: own the stack, cut the per-token bill, iterate at hardware speed.",
    metrics: [
      { k: "GPUs", v: "3× 5090 + 4× 4090" },
      { k: "workloads", v: "train + serve" },
      { k: "ops", v: "self-hosted" },
    ],
    stack: ["multi-GPU", "Docker", "AWS EC2 / S3", "Cloudflare", "ComfyUI / vLLM"],
    bullets: [
      "Assembled and run 3× RTX 5090 + 4× RTX 4090 — among the most powerful personal AI setups in North India. [Write-up →](https://www.reddit.com/r/comfyui/comments/1pd072e/i_built_a_7gpu_ai_monster_rig_at_home_35090_44090/)",
      "Runs [LuxeAI](https://console.luxeai.studio) customer training/inference and [Treow](https://www.treowintelligence.com/) ASR/TTS/LLM jobs on owned hardware.",
      "Hybrid topology: home GPUs for training/inference; AWS + Cloudflare for routing, storage, and public edges.",
      "Self-hosting as a moat: full control, lower marginal cost, faster experiment loops.",
    ],
    links: [
      {
        label: "Write-up",
        href: "https://www.reddit.com/r/comfyui/comments/1pd072e/i_built_a_7gpu_ai_monster_rig_at_home_35090_44090/",
      },
    ],
  },
  {
    id: "parentinc",
    name: "The Parentinc",
    kicker: "theAsianparent · product, data & ML",
    href: "https://theparentinc.com/",
    year: "2021 → 2024",
    role: "Full-Stack → ML & Data Engineer",
    summary:
      "Three years at Southeast Asia’s parenting super-app — from shipping mobile product at 100K+ DAU to owning analytics migrations and an LLM recommendation engine.",
    metrics: [
      { k: "scale", v: "100K+ DAU" },
      { k: "app size", v: "−30%" },
      { k: "data", v: "Airbyte → Sigma" },
    ],
    stack: ["Flutter", "Airbyte", "Sigma", "LLM recsys", "CI/CD"],
    bullets: [
      "Architected Baby Tracker inside theAsianparent (100K+ DAU); integrated Flutter into decade-old Android/iOS codebases, cutting app size ~30%. [Play Store →](https://play.google.com/store/apps/details?id=com.tickledmedia.ParentTown&hl=en_IN)",
      "Led vendor evaluation and migrated Grow Analytics to Sigma; unified analytics, production, and shopping-platform data via Airbyte while resolving cross-source consistency issues.",
      "Built an LLM-based recommendation engine injecting in-shop product recommendations into thousands of existing articles.",
      "CI/CD covering validation, build distribution, and auto-translation via Mojito TMS — [localization write-up](https://medium.com/@kdsingh.cyberdude/automate-the-process-of-localization-using-mojito-translation-management-system-tms-in-android-and-5c4d26953fb5).",
    ],
    links: [
      { label: "The Parentinc", href: "https://theparentinc.com/" },
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.tickledmedia.ParentTown&hl=en_IN",
      },
      {
        label: "Mojito TMS blog",
        href: "https://medium.com/@kdsingh.cyberdude/automate-the-process-of-localization-using-mojito-translation-management-system-tms-in-android-and-5c4d26953fb5",
      },
    ],
  },
];

export const traits: { title: string; proof: string }[] = [
  {
    title: "Measure first",
    proof:
      "Programmatic ground truth and trajectory metrics turn fuzzy claims into evidence. For agent actions, I use provenance over outgoing parameters — not just “did the tool call look right.”",
  },
  {
    title: "First principles → thin experiment",
    proof:
      "Find the one hard claim, define the observable, run the smallest test that could kill the idea. Then scale what survives — same muscle for research questions and product bets.",
  },
  {
    title: "Full-stack ML depth",
    proof:
      "Same person designs the eval, trains the model, stands up the GPU job queue, and ships the product surface. Fewer handoffs, fewer “someone else’s problem” gaps.",
  },
  {
    title: "High agency",
    proof:
      "Built a 7-GPU home lab and sourced internet-scale regional speech when the corpus didn’t exist. When the tool or the lab is missing, I build it.",
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
  "Full-stack product engineer → ML & data → independent research and training on owned infra. ~3 years at theAsianparent, then Treow end-to-end — models, home lab, and product.";

export const timeline: Job[] = [
  {
    org: "Treow Intelligence",
    role: "Co-Founder & CTO",
    period: "Oct 2024 — Present",
    duration: "~1 yr 10 mo",
    href: "https://www.treowintelligence.com/",
    summary:
      "AI-native studio on self-hosted GPUs: consumer diffusion product (LuxeAI) + regional speech/LLM work (Treow AI). Looking ahead: research labs and deep-tech teams where this loop scales beyond solo.",
    bullets: [
      "Own the loop: dataset → train / fine-tune → eval → serve — on a 7-GPU home lab (3× 5090 + 4× 4090). [Write-up →](https://www.reddit.com/r/comfyui/comments/1pd072e/i_built_a_7gpu_ai_monster_rig_at_home_35090_44090/)",
      "[Treow AI](https://www.treowintelligence.com/): ASR on 100K+ hrs (6.96–10.18% WER on IndicSUPERB), TTS, Punjabi small LLMs; internet-scale data pipelines. [Models on HF →](https://huggingface.co/kdcyberdude)",
      "[LuxeAI](https://console.luxeai.studio): crop-aware training, realtime generation, ComfyUI orchestration (1290+ nodes), full paid product surface with 300+ fine-tuned diffusion models.",
      "[HARvestGym](https://github.com/kdcyberdude/HARvestGym): open RL env + provenance checks for HTTP agents on live apps.",
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
      "Architected Baby Tracker — used by 100K+ daily active users inside theAsianparent. [Play Store →](https://play.google.com/store/apps/details?id=com.tickledmedia.ParentTown&hl=en_IN)",
      "Led Flutter integration into existing Android / iOS apps; cut app size ~30%.",
      "Built CI/CD covering validation, build distribution, and auto-translation ([Mojito TMS write-up](https://medium.com/@kdsingh.cyberdude/automate-the-process-of-localization-using-mojito-translation-management-system-tms-in-android-and-5c4d26953fb5)).",
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
  transcript:
    "https://drive.google.com/file/d/1szJOY22MkXPfj14TWwNdT-Rz7DxT0iFM/view?usp=sharing",
};

export const certifications: {
  name: string;
  issuer: string;
  href: string;
}[] = [
  {
    name: "Hacking and Patching",
    issuer: "University of Colorado Boulder",
    href: "https://www.coursera.org/account/accomplishments/verify/LT7GHY9TCMYG",
  },
  {
    name: "Foundations of Cybersecurity",
    issuer: "Google",
    href: "https://www.coursera.org/account/accomplishments/verify/UC5E84KTNEMG",
  },
  {
    name: "Cybersecurity and Mobility",
    issuer: "Kennesaw State University",
    href: "https://www.coursera.org/account/accomplishments/verify/SD6JM6HBPPR9",
  },
  {
    name: "Blockchain Specialization",
    issuer: "University at Buffalo, SUNY · 4 courses",
    href: "https://www.coursera.org/account/accomplishments/specialization/Z6CWVUGLSGRK",
  },
];

export type ProbeStatus = "public" | "private" | "fork" | "models";

export type Probe = {
  id: string;
  name: string;
  kicker: string;
  status: ProbeStatus;
  blurb: string;
  stack: string[];
  href?: string;
  host?: "github" | "huggingface" | "medium";
};

export const probesIntro =
  "Repos and models you can open.";

export const probes: Probe[] = [
  {
    id: "harvestgym",
    name: "HARvestGym",
    kicker: "GitHub",
    status: "public",
    host: "github",
    href: "https://github.com/kdcyberdude/HARvestGym",
    blurb: "RL env for HTTP agents — plus provenance checks on outgoing requests.",
    stack: ["RL", "HTTP agents", "security measurement"],
  },
  {
    id: "open-models",
    name: "Open models",
    kicker: "Hugging Face",
    status: "models",
    host: "huggingface",
    href: "https://huggingface.co/kdcyberdude",
    blurb: "ASR, Punjabi TTS, and Punjabi Gemma SFT — trained on the home lab.",
    stack: ["ASR", "TTS", "SFT", "Indic"],
  },
  {
    id: "punjabi-asr",
    name: "Punjabi ASR",
    kicker: "GitHub",
    status: "public",
    host: "github",
    href: "https://github.com/kdcyberdude/Punjabi_ASR",
    blurb: "Public notebooks into the larger Treow ASR corpus.",
    stack: ["ASR", "Punjabi", "IndicSUPERB"],
  },
  {
    id: "mojito-blog",
    name: "Mojito TMS",
    kicker: "Medium",
    status: "public",
    host: "medium",
    href: "https://medium.com/@kdsingh.cyberdude/automate-the-process-of-localization-using-mojito-translation-management-system-tms-in-android-and-5c4d26953fb5",
    blurb: "Automating localization across Android/iOS with Mojito TMS.",
    stack: ["CI/CD", "localization", "mobile"],
  },
];
