import { motion } from "framer-motion";
import { profile, stats } from "../data/content";
import { useReducedMotion } from "../hooks";

export default function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col justify-center pt-24 pb-16 md:pb-24">
      <div className="wrap relative">
        <motion.p {...rise(0)} className="label mb-6">
          {profile.availability.status}
        </motion.p>

        <motion.h1
          {...rise(0.06)}
          className="serif text-[clamp(3rem,11vw,5.75rem)] font-medium leading-[0.95] tracking-tight text-txt max-w-4xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          {...rise(0.16)}
          className="mt-7 max-w-2xl text-[clamp(1.25rem,3.2vw,1.85rem)] font-semibold leading-[1.25] tracking-tight text-txt"
        >
          {profile.headline}
        </motion.p>

        <motion.p
          {...rise(0.26)}
          className="mt-5 max-w-xl text-[15px] md:text-[17px] text-muted leading-relaxed"
        >
          {profile.subline}
        </motion.p>

        <motion.div {...rise(0.36)} className="mt-9 flex flex-wrap gap-3">
          <a
            href="#research"
            className="inline-flex items-center rounded-sm bg-acid px-5 py-3 text-[14px] font-semibold on-acid hover:bg-acid-dim transition-colors"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            LearningBench →
          </a>
          <a
            href="#lab"
            className="inline-flex items-center rounded-sm border border-[var(--color-line-bright)] bg-panel px-5 py-3 text-[14px] font-medium text-txt hover:border-[var(--color-acid)]/50 transition-colors"
          >
            Watch me scope a problem
          </a>
          <a
            href={profile.links.resume}
            className="inline-flex items-center rounded-sm px-4 py-3 text-[14px] font-medium text-muted hover:text-acid transition-colors"
          >
            Résumé
          </a>
        </motion.div>

        <motion.div
          {...rise(0.48)}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 border-t border-[var(--color-line)] pt-8"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div
                className={`serif text-3xl md:text-4xl tracking-tight ${
                  s.accent ? "text-acid" : "text-txt"
                }`}
              >
                {s.value}
              </div>
              <div className="mt-1.5 text-[12px] md:text-[13px] text-muted leading-snug max-w-[12rem]">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
