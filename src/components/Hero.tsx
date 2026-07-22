import { motion } from "framer-motion";
import { profile, stats } from "../data/content";
import { useReducedMotion } from "../hooks";
import TrainingPanel from "./TrainingPanel";

export default function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-16 md:pb-24">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[420px] w-[820px] max-w-full opacity-[0.5]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(199,247,62,0.14), rgba(94,234,212,0.06) 55%, transparent 78%)",
        }}
      />
      <div className="wrap relative grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-14 items-center">
        {/* left: copy */}
        <div>
          <motion.div
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-acid)]/25 bg-[var(--color-acid)]/[0.06] px-3 py-1.5 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="glow-dot absolute inline-flex h-full w-full rounded-full bg-acid" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
            </span>
            <span className="mono text-[11px] tracking-wide text-txt">
              {profile.availability.status}
            </span>
            <span className="mono text-[11px] text-dim hidden sm:inline">
              · {profile.availability.geos}
            </span>
          </motion.div>

          <motion.p
            {...rise(0.05)}
            className="serif text-[clamp(2.4rem,7vw,4.4rem)] font-normal leading-[1.05] tracking-tight text-txt mb-5"
          >
            {profile.name}
          </motion.p>

          <h1 className="text-[clamp(1.35rem,3.4vw,2.1rem)] font-semibold leading-[1.15] tracking-tight text-muted">
            {profile.triad.map((_, i) => (
              <motion.span key={i} {...rise(0.1 + i * 0.08)} className="block">
                {i === 0 ? (
                  <>
                    I <span className="acid-text">train</span> the models,
                  </>
                ) : i === 1 ? (
                  <>
                    <span className="acid-text">build</span> the product,
                  </>
                ) : (
                  <>
                    and <span className="acid-text">run</span> the infra.
                  </>
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            {...rise(0.42)}
            className="mt-6 max-w-xl text-muted text-[15px] md:text-[17px] leading-relaxed"
          >
            {profile.summary}
          </motion.p>

          <motion.div {...rise(0.52)} className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#brief"
              className="group inline-flex items-center gap-2 rounded-lg bg-acid px-5 py-2.5 text-[15px] font-semibold text-bg hover:bg-acid/90 transition-colors"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              Brief me
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line-bright)] px-5 py-2.5 text-[15px] font-medium text-txt hover:border-[var(--color-acid)]/40 hover:text-acid transition-colors"
            >
              See the work
            </a>
          </motion.div>

          <motion.div {...rise(0.6)} className="mt-8 flex flex-wrap gap-x-2 gap-y-2">
            {profile.availability.roles.map((r) => (
              <span
                key={r}
                className="mono text-[11px] text-muted border border-[var(--color-line)] rounded-full px-2.5 py-1"
              >
                {r}
              </span>
            ))}
          </motion.div>
        </div>

        {/* right: live telemetry */}
        <motion.div {...rise(0.3)} className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
          <TrainingPanel variant="ambient" />
        </motion.div>
      </div>

      {/* stat strip */}
      <div className="wrap relative mt-14 md:mt-20">
        <div className="hairline mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {stats.map((s, i) => (
            <motion.div key={i} {...rise(0.5 + i * 0.06)}>
              <div
                className={`text-2xl md:text-3xl font-semibold tracking-tight tabular-nums ${
                  s.accent ? "acid-text" : "text-txt"
                }`}
              >
                {s.value}
              </div>
              <div className="mt-1 text-[13px] text-muted leading-snug">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
