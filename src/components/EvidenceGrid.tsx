import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "../data/content";
import { useReducedMotion } from "../hooks";
import { ExtLinks, LinkedText } from "./ui";

function ProjectRow({ p, highlighted }: { p: Project; highlighted: boolean }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <article
      id={`project-${p.id}`}
      className={`border-t border-[var(--color-line)] py-10 md:py-12 scroll-mt-28 transition-colors duration-500 ${
        highlighted ? "border-[var(--color-acid)]" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8">
        <div className="min-w-0">
          <h3 className="serif text-2xl md:text-[1.75rem] font-medium tracking-tight text-txt">
            {p.name}
          </h3>
          <p className="mt-2 text-[14px] text-muted">{p.kicker}</p>
        </div>
        <div className="mono text-[12px] text-dim shrink-0 md:text-right">
          {p.year}
          {p.href && (
            <>
              <span className="mx-2 text-[var(--color-line-bright)]">·</span>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-acid transition-colors"
              >
                open ↗
              </a>
            </>
          )}
        </div>
      </div>

      <p className="mt-5 max-w-2xl text-[15px] text-muted leading-relaxed">{p.summary}</p>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-6 self-start mono text-[12px] text-dim hover:text-acid transition-colors"
        aria-expanded={open}
      >
        {open ? "Hide detail" : "More detail"}
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
            <p className="mt-6 mono text-[11px] text-dim">{p.role}</p>
            <ul className="mt-4 space-y-3 max-w-2xl">
              {p.bullets.map((b, i) => (
                <li key={i} className="text-[14px] text-txt/80 leading-relaxed">
                  <LinkedText text={b} />
                </li>
              ))}
            </ul>
            {p.links && <ExtLinks links={p.links} />}
          </motion.div>
        )}
      </AnimatePresence>
    </article>
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
      if (id === "babytracker") {
        document.getElementById("project-parentinc")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setFocus("parentinc");
        window.setTimeout(() => setFocus(null), 2400);
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
    <div className="max-w-3xl">
      {projects.map((p) => (
        <ProjectRow key={p.id} p={p} highlighted={focus === p.id} />
      ))}
    </div>
  );
}
