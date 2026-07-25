import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "../data/content";
import { useReducedMotion } from "../hooks";

function ProjectCard({ p, highlighted }: { p: Project; highlighted: boolean }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div
      id={`project-${p.id}`}
      className={`border-t border-[var(--color-line-bright)] pt-5 md:pt-6 flex flex-col scroll-mt-28 transition-colors duration-500 ${
        highlighted ? "border-[var(--color-acid)]" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="label mb-1.5">{p.kicker}</div>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-txt">{p.name}</h3>
        </div>
        {p.href && (
          <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="mono text-[11px] text-dim hover:text-acid transition-colors whitespace-nowrap"
          >
            visit ↗
          </a>
        )}
      </div>

      <div className="mono text-[11px] text-dim mt-2">
        {p.role} · {p.year}
      </div>

      <p className="mt-4 text-[14px] text-muted leading-relaxed">{p.summary}</p>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {p.metrics.map((m, i) => (
          <span key={i} className="inline-flex items-baseline gap-1.5">
            <span className="mono text-[10px] text-dim uppercase tracking-wide">{m.k}</span>
            <span className="mono text-[12px] text-acid font-medium">{m.v}</span>
          </span>
        ))}
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-5 self-start mono text-[12px] text-muted hover:text-acid transition-colors"
        aria-expanded={open}
      >
        {open ? "− hide detail" : "+ how it was built"}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduced ? undefined : { height: 0, opacity: 0 }}
            animate={reduced ? undefined : { height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-4 space-y-2.5 border-t border-[var(--color-line)] pt-4">
              {p.bullets.map((b, i) => (
                <li key={i} className="flex gap-2.5 text-[13.5px] text-txt/85 leading-relaxed">
                  <span className="acid-text mt-1 shrink-0">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="mono text-[10.5px] text-muted border border-[var(--color-line)] rounded-sm px-2 py-0.5"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EvidenceGrid() {
  const [focus, setFocus] = useState<string | null>(null);

  useEffect(() => {
    const on = (e: Event) => {
      const id = (e as CustomEvent).detail as string;
      if (id === "learningbench" || id === "harvestgym") {
        document.getElementById("research")?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      setFocus(id);
      requestAnimationFrame(() => {
        document.getElementById(`project-${id}`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
      window.setTimeout(() => setFocus(null), 2400);
    };
    window.addEventListener("focus-project", on as EventListener);
    return () => window.removeEventListener("focus-project", on as EventListener);
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-x-10 gap-y-2">
      {projects.map((p) => (
        <ProjectCard key={p.id} p={p} highlighted={focus === p.id} />
      ))}
    </div>
  );
}
