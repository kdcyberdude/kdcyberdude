import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile, projects, timeline, probes } from "../data/content";

type Line = { type: "in" | "out" | "sys"; text: string };

const BANNER = [
  "kd@lab:~$ welcome. type a command or `help`.",
];

function runCommand(cmd: string, close: () => void): Line[] {
  const c = cmd.trim().toLowerCase();
  if (!c) return [];
  const go = (id: string) => {
    close();
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120);
  };

  switch (c) {
    case "help":
      return [
        { type: "out", text: "available commands:" },
        { type: "out", text: "  whoami       who is karandeep" },
        { type: "out", text: "  research     flagship benchmark" },
        { type: "out", text: "  lab          experiment scoper" },
        { type: "out", text: "  projects     selected work" },
        { type: "out", text: "  probes       agents, evals, forks" },
        { type: "out", text: "  experience   career timeline" },
        { type: "out", text: "  stack        work / tools (in projects)" },
        { type: "out", text: "  hire         open roles" },
        { type: "out", text: "  contact      reach me" },
        { type: "out", text: "  resume       open résumé (pdf)" },
        { type: "out", text: "  clear        clear the screen" },
      ];
    case "whoami":
      return [
        { type: "out", text: profile.name + " — applied ML engineer." },
        { type: "out", text: profile.headline },
        { type: "out", text: profile.location },
      ];
    case "research":
    case "learningbench":
      return [
        { type: "out", text: "Flagship research — $25K DeepMind × Kaggle Grand Prize" },
        { type: "out", text: "inference-time learning eval · 135 tasks · 14 models" },
        { type: "sys", text: "→ opening research…" },
        ...(go("research"), []),
      ];
    case "lab":
    case "scope":
      return [{ type: "sys", text: "→ opening experiment lab…" }, ...(go("lab"), [])];
    case "projects":
    case "ls":
    case "work":
      return [
        ...projects.map((p) => ({
          type: "out" as const,
          text: `  ${p.id.padEnd(12)} ${p.name} — ${p.kicker}`,
        })),
        { type: "sys", text: "→ opening work…" },
        ...(go("work"), []),
      ];
    case "probes":
    case "github":
    case "code":
      return [
        ...probes.map((p) => ({
          type: "out" as const,
          text: `  ${p.status.padEnd(8)} ${p.name} — ${p.kicker}`,
        })),
        { type: "sys", text: "→ opening probes…" },
        ...(go("probes"), []),
      ];
    case "experience":
    case "path":
      return [
        ...timeline.map((j) => ({
          type: "out" as const,
          text: `  ${j.period.padEnd(22)} ${j.duration.padEnd(12)} ${j.role} · ${j.org}`,
        })),
        { type: "sys", text: "→ opening path…" },
        ...(go("experience"), []),
      ];
    case "rig":
    case "lab-hw":
    case "homelab":
      return [
        { type: "out", text: "home lab — 7× GPU, self-hosted:" },
        { type: "out", text: "  3× RTX 5090  +  4× RTX 4090" },
        { type: "out", text: "  runs treow + luxeai training & inference." },
        { type: "sys", text: "→ jumping to work…" },
        ...(go("work"), []),
      ];
    case "skills":
    case "stack":
      return [{ type: "sys", text: "→ opening work…" }, ...(go("work"), [])];
    case "hire":
      return [
        { type: "out", text: "open to: " + profile.availability.roles.join(" / ") },
        { type: "out", text: "measurement + shipping — research labs & deep-tech teams." },
        { type: "sys", text: "→ let's talk…" },
        ...(go("contact"), []),
      ];
    case "contact":
      return [
        { type: "out", text: "email:      " + profile.links.email },
        { type: "out", text: "linkedin:   " + profile.links.linkedin },
        { type: "out", text: "github:     " + profile.links.github },
        { type: "out", text: "huggingface:" + profile.links.huggingface },
        { type: "sys", text: "→ opening contact…" },
        ...(go("contact"), []),
      ];
    case "resume":
    case "cv":
      window.open(profile.links.resume, "_blank", "noopener,noreferrer");
      return [{ type: "sys", text: "→ opening résumé.pdf…" }];
    case "clear":
    case "cls":
      return [{ type: "sys", text: "__CLEAR__" }];
    case "sudo":
      return [{ type: "out", text: "nice try. high-agency, but you still don't have root here 😉" }];
    default:
      return [{ type: "out", text: `command not found: ${c} — try \`help\`` }];
  }
}

export default function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>(BANNER.map((t) => ({ type: "sys", text: t })));
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = value;
    const out = runCommand(cmd, onClose);
    if (out.some((l) => l.text === "__CLEAR__")) {
      setLines([]);
    } else {
      setLines((prev) => [...prev, { type: "in", text: cmd }, ...out]);
    }
    if (cmd.trim()) setHistory((h) => [cmd, ...h]);
    setHIdx(-1);
    setValue("");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const ni = Math.min(history.length - 1, hIdx + 1);
      if (history[ni]) {
        setHIdx(ni);
        setValue(history[ni]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const ni = Math.max(-1, hIdx - 1);
      setHIdx(ni);
      setValue(ni === -1 ? "" : history[ni]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-3 pt-[8vh] md:pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            className="relative w-full max-w-2xl panel overflow-hidden"
            initial={{ y: -16, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--color-line)] bg-panel-2">
              <span className="mono text-[11px] text-dim ml-1">kd@lab — zsh</span>
              <button
                onClick={onClose}
                className="ml-auto mono text-[11px] text-dim hover:text-txt"
                aria-label="Close terminal"
              >
                esc ✕
              </button>
            </div>

            <div
              ref={bodyRef}
              className="p-4 h-[50vh] max-h-[420px] overflow-y-auto mono text-[13px] leading-relaxed"
            >
              {lines.map((l, i) => (
                <div
                  key={i}
                  className={
                    l.type === "in"
                      ? "text-txt"
                      : l.type === "sys"
                        ? "text-acid"
                        : "text-muted"
                  }
                >
                  {l.type === "in" ? (
                    <span>
                      <span className="acid-text">kd@lab:~$</span> {l.text}
                    </span>
                  ) : (
                    <span className="whitespace-pre-wrap">{l.text}</span>
                  )}
                </div>
              ))}
              <form onSubmit={submit} className="flex items-center gap-2 mt-1">
                <span className="acid-text">kd@lab:~$</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  className="flex-1 bg-transparent outline-none text-txt caret-[var(--color-acid)]"
                  aria-label="Terminal input"
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
