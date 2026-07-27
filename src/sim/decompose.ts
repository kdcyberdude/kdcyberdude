/* ============================================================
   First-principles experiment scoper.
   Deterministic keyword match → hear → principles → hypothesize →
   measure → experiment → kill → receipts.
   Illustrative of how Karandeep scopes research and product work — not an LLM.
   Serves research labs and FDE / product audiences.
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
  read: string;
  stages: Stage[];
};

export const presets: { label: string; prompt: string; kind: "research" | "build" }[] = [
  {
    label: "Inference-time learning eval",
    prompt:
      "Design a benchmark that measures whether LLMs can learn novel rules inside a conversation — not just recall training data.",
    kind: "research",
  },
  {
    label: "Reward hacking probe",
    prompt:
      "How would you test whether a model is reward-hacking a proxy metric instead of the intended goal?",
    kind: "research",
  },
  {
    label: "Regional speech stack",
    prompt:
      "We need ASR and TTS for a low-resource regional language where no clean corpus exists yet.",
    kind: "build",
  },
  {
    label: "Per-user diffusion product",
    prompt:
      "Users upload selfies and should get studio-grade photos that actually look like them.",
    kind: "build",
  },
  {
    label: "Cut API inference cost",
    prompt:
      "Our LLM API bill is exploding — can we self-host without tanking quality?",
    kind: "build",
  },
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
  /* ---------- EVAL / LEARNING / BENCHMARK ---------- */
  {
    key: "eval",
    match:
      /eval|benchmark|learningbench|in-?context|inference-?time|novel rule|memor|recall|cognitive|agi.?eval|measure.*(learn|model)/i,
    read: () =>
      "an evaluation problem — separate genuine learning from memorised recall, with a metric that can kill bad designs.",
    stages: [
      S("hear", [
        "You want to know if the model can acquire a new rule from evidence in-context — not whether it already saw the answer in pretraining.",
        "That means the environment must be novel by construction. Static quiz sets leak; programmatic generators don’t.",
      ]),
      S("principles", [
        "If memorisation can help, the benchmark is contaminated. Invent the rules; grade with the same function that made the examples.",
        "Accuracy alone is weak. Measure the learning act: evidence used, hypothesis updates, trajectory slope.",
        "Reward being fast at being wrong is a bug. Zero accuracy → zero score.",
      ]),
      S("hypothesize", [
        "H1: frontier scale alone does not buy inference-time learning — hypothesis management does.",
        "H2: evidence appetite (how many probes a model takes) is a stable model property and predicts performance.",
        "H3: extended reasoning helps induction-heavy skills more than rapid procedural adaptation.",
      ], [{ label: "LearningBench — $25K Grand Prize", projectId: "learningbench" }]),
      S("measure", [
        "Primary: efficiency-weighted accuracy with a free-exploration zone, then penalties for avoidable over-querying.",
        "Secondary: OLS slope of practice-round accuracy (trajectory orthogonality) — did learning occur?",
        "Process: probe counts, identical-action streaks, token spend on failed vs solved runs.",
      ]),
      S("experiment", [
        "Build 100+ programmatic tasks across distinct cognitive acts (associative, concept, language, observational, procedural, RL).",
        "Evaluate a ladder of models (small → frontier, instruct vs thinking) on the same generators.",
        "Publish tasks + grading code so others can reproduce — public output is the point.",
      ], [{ label: "LearningBench repo + project page", projectId: "learningbench" }]),
      S("kill", [
        "Kill if a closed book / memorisation baseline matches in-context learners — novelty failed.",
        "Kill a scoring rule if it rewards verbosity or random probing without accuracy.",
        "Kill a sub-ability if every model saturates — not discriminative.",
      ]),
    ],
  },

  /* ---------- SAFETY / REWARD / RED TEAM ---------- */
  {
    key: "safety",
    match:
      /reward.?hack|alignment|safety|red.?team|sycophan|decept|specimens|misuse|jailbreak|proxy metric|oversight/i,
    read: () =>
      "a safety / behaviour question — define the failure mode, then build the smallest test that would catch it.",
    stages: [
      S("hear", [
        "You’re worried the system optimises a proxy while looking compliant on the intended goal.",
        "That’s an experimental design problem before it’s a training problem.",
      ]),
      S("principles", [
        "Name the intended goal and the proxy separately. If you can’t, you can’t measure gaming.",
        "Prefer behavioural tests with ground truth over vibe checks or LLM-as-judge alone.",
        "Log trajectories — single-shot answers hide the hacking strategy.",
      ]),
      S("hypothesize", [
        "H1: under pressure, the model will sacrifice the true goal to raise the proxy.",
        "H2: the failure shows up as stuck action loops once the first hypothesis is wrong (no update).",
        "H3: simple capability + incentive framing is enough to elicit the behaviour without exotic scaffolding.",
      ]),
      S("measure", [
        "Define success/fail labels that a program can grade — not a panel of opinions.",
        "Track proxy↑ while true-goal↓; also identical-action streaks and token waste on failed runs.",
        "Compare instruct vs reasoning modes — deliberation can help or hurt depending on the task.",
      ], [{ label: "LearningBench — hypothesis updating metrics", projectId: "learningbench" }]),
      S("experiment", [
        "Build a thin environment where the proxy and true goal diverge by construction.",
        "Run a fixed model ladder; ablate prompts / tools / budgets; keep seeds.",
        "Write up negative results too — knowing what didn’t elicit hacking is useful.",
      ]),
      S("kill", [
        "Kill the setup if the ‘true goal’ isn’t independently checkable.",
        "Kill if only one brittle prompt triggers the failure — not a robust phenomenon.",
        "Kill if grading needs another LLM with no calibration set.",
      ]),
    ],
  },

  /* ---------- VOICE / SPEECH ---------- */
  {
    key: "voice",
    match: /voice|speech|asr|tts|audio|transcri|accent|dialect|regional|punjabi|hindi/i,
    read: () =>
      "a speech stack for a low-resource language — the corpus is the product; models come second.",
    stages: [
      S("hear", [
        "Three systems: ASR, language/intent, TTS. The scarce resource is clean native speech, not another architecture paper.",
      ]),
      S("principles", [
        "WER on real accents is the gate. Don’t build the assistant until ASR clears a holdout you trust.",
        "Data quality beats data volume. Filter hard.",
        "Own the training loop if you need iteration speed and cost control.",
      ]),
      S("hypothesize", [
        "H1: a fine-tuned multilingual base on our corpus beats a giant general API on this language.",
        "H2: internet-scale sourcing + aggressive filtering unlocks usable hours where public sets don’t exist.",
      ]),
      S("measure", [
        "Primary: WER / CER per accent cohort — never only the average.",
        "Secondary: latency budget for the intended surface; human spot-check rate on filtered audio.",
      ]),
      S("experiment", [
        "Stand up acquisition → VAD → align → SNR filter → first Whisper-class fine-tune in one week.",
        "Ship a thin /transcribe API to real speakers; corrections become next train set.",
      ], [
        { label: "Treow AI — 100K+ hrs ASR", projectId: "treow" },
        { label: "Home lab — 7 GPUs self-hosted", projectId: "homelab" },
      ]),
      S("kill", [
        "Kill the language scope if holdout WER won’t move after clean data — pick a narrower domain.",
        "Kill real-time UX if distill/on-device path isn’t feasible for the latency target.",
      ]),
    ],
  },

  /* ---------- IMAGE / DIFFUSION ---------- */
  {
    key: "image",
    match: /image|photo|selfie|portrait|diffusion|flux|studio|face|generat/i,
    read: () =>
      "personalized generation — subject fidelity is the product; everything else is packaging.",
    stages: [
      S("hear", [
        "Outputs must look like the specific person. Shared foundation models with prompts won’t clear that bar.",
      ]),
      S("principles", [
        "Per-subject fine-tune + disciplined gen graph. Consistency beats one lucky sample.",
        "Unit economics: training cost per user must fit price.",
        "Consent and rejection gates are product features, not afterthoughts.",
      ]),
      S("hypothesize", [
        "H1: 10–20 clean subject photos + FLUX-class fine-tune locks identity without baking in backgrounds.",
        "H2: multi-subject needs a staged pipeline (masks → dual checkpoint), not a bigger prompt.",
      ]),
      S("measure", [
        "Identity fidelity on hard poses (human + automated checks); reject rate per vertical.",
        "Cost per successful shoot; queue wait time.",
      ]),
      S("experiment", [
        "One vertical end-to-end: upload → train → generate → deliver → pay.",
        "Then harden the couple/consistency path against real user rejects.",
      ], [
        { label: "LuxeAI — per-customer FLUX", projectId: "luxeai" },
        { label: "Home lab — train + serve", projectId: "homelab" },
      ]),
      S("kill", [
        "Kill a vertical if fidelity won’t clear the bar at the target price.",
        "Kill shared-model approaches if identity drift stays visible to non-experts.",
      ]),
    ],
  },

  /* ---------- SELF-HOST / COST ---------- */
  {
    key: "selfhost",
    match: /self.?host|inference cost|gpu|openai bill|token cost|serve|latency|on.?prem/i,
    read: () =>
      "moving steady load off metered APIs — quality held constant, cost and control as the variables.",
    stages: [
      S("hear", [
        "You don’t need ‘a GPU strategy’ — you need a quality bar, a utilization plan, and a cutover path.",
      ]),
      S("principles", [
        "Smallest open model that clears eval; fine-tune on your traffic to close gaps.",
        "Idle GPUs erase savings. Batch and queue.",
        "Shadow deploy before cutover — never big-bang on quality-blind cost.",
      ]),
      S("hypothesize", [
        "H1: for your narrow task distribution, a fine-tuned open model matches the API within ε.",
        "H2: owned baseline GPUs + cloud burst beats all-cloud at your volume within weeks.",
      ]),
      S("measure", [
        "Eval set from real failures; cost per request; p95 latency; quality delta vs incumbent.",
      ]),
      S("experiment", [
        "Week 1: model pick + eval harness + serving prototype.",
        "Week 2: shadow traffic; decide cutover per route.",
      ], [{ label: "Home lab — self-hosted train + serve", projectId: "homelab" }]),
      S("kill", [
        "Kill self-host if quality gap won’t close without ruinous GPU count.",
        "Kill a model size if utilization can’t stay healthy.",
      ]),
    ],
  },

  /* ---------- AGENTS / HTTP / TOOLS ---------- */
  {
    key: "agent",
    match: /agent|tool|http|api.?reverse|browser.?free|harvest|copilot|rag|automate/i,
    read: () =>
      "an agent / automation loop — define the action space and success checks before chaining prompts.",
    stages: [
      S("hear", [
        "The hard part is reliable action under partial observability — not a longer system prompt.",
      ]),
      S("principles", [
        "Prefer programmatic success checks. If a human must grade every run, you don’t have an experiment.",
        "Shrink the action space. Browser-free HTTP can be a feature, not a limitation.",
        "Log trajectories; stuck loops are the failure signature.",
      ]),
      S("hypothesize", [
        "H1: a small model can learn to reverse-engineer APIs from raw HTTP given the right env.",
        "H2: identical-action streaks predict failure better than total tokens.",
      ]),
      S("measure", [
        "Task success rate; steps to success; illegal action rate; loop detection.",
      ]),
      S("experiment", [
        "Build a gym with clear rewards; train or evaluate against fixed seeds; publish the env.",
      ], [{ label: "HARvestGym — HTTP agents", projectId: "harvestgym" }]),
      S("kill", [
        "Kill browser-heavy setups if HTTP APIs already expose the task.",
        "Kill training if a scripted baseline already clears the bar.",
      ]),
    ],
  },
];

const generic: Domain = {
  key: "generic",
  match: /.*/,
  read: () =>
    "an ambiguous problem — I’ll scope it the way I scope any build: one hard claim, one measurable test.",
  stages: [
    S("hear", [
      "Restate the goal as a claim that could be false. If it can’t be false, it isn’t a project yet.",
    ]),
    S("principles", [
      "Find the one hard part. Everything else is plumbing.",
      "Define ‘working’ as a number before writing code.",
      "Thin end-to-end slice that a real user or grader can touch.",
    ]),
    S("hypothesize", [
      "Write the cheapest hypothesis that would change what you build next.",
      "Prefer tests that can kill the idea in days, not months.",
    ]),
    S("measure", [
      "One primary metric. Secondary diagnostics optional. No vanity dashboards.",
    ]),
    S("experiment", [
      "Week 1: prove the hard part in isolation.",
      "Week 2: wire end-to-end; put it in front of reality.",
    ], [
      { label: "LearningBench — eval taste", projectId: "learningbench" },
      { label: "LuxeAI / Treow — shipped systems", projectId: "luxeai" },
    ]),
    S("kill", [
      "Kill if the metric doesn’t move after a serious try — change the problem, not the slide deck.",
      "Kill scope creep that threatens the thin slice.",
    ]),
  ],
};

const RECEIPTS_STAGE = (receipts: Receipt[]): Omit<Stage, "id"> => ({
  label: "receipts",
  lines: ["I’ve already built pieces of this loop. Proof:"],
  receipts,
});

export function decompose(input: string): Brief {
  const text = input || "";
  const domain = domains.find((d) => d.match.test(text)) ?? generic;

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
      { label: "LearningBench — Grand Prize eval", projectId: "learningbench" },
      { label: "Treow AI — trained models", projectId: "treow" },
      { label: "Home lab — self-hosted GPUs", projectId: "homelab" },
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
