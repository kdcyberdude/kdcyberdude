import { motion } from "framer-motion";
import { learningBench, pokemonResearch } from "../data/content";
import { LinkedText, Reveal } from "./ui";

export default function LearningBench() {
  return (
    <section id="research" className="wrap scroll-mt-24 py-16 md:py-24">
      <Reveal>
        <div className="flex items-center gap-3 mb-8">
          <span className="sec-tag">01 / research</span>
          <span className="h-px flex-1 bg-[var(--color-line)]" />
        </div>
      </Reveal>

      <Reveal>
        <p className="label text-acid mb-3">{learningBench.award}</p>
        <h2 className="serif text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-tight leading-[1.05] max-w-3xl">
          {learningBench.name}
        </h2>
        <p className="mt-3 text-lg md:text-xl font-semibold text-muted tracking-tight">
          {learningBench.kicker}
        </p>
        <p className="mt-5 max-w-2xl text-[15px] md:text-base text-muted leading-relaxed">
          {learningBench.summary}
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {learningBench.metrics.map((m) => (
            <div
              key={m.k}
              className="border-t border-[var(--color-line-bright)] pt-3"
            >
              <div className="serif text-2xl md:text-3xl text-txt">{m.v}</div>
              <div className="label mt-1">{m.k}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14">
        <Reveal delay={0.1}>
          <ul className="space-y-4">
            {learningBench.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-[14px] md:text-[15px] text-muted leading-relaxed">
                <span className="mono text-acid mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <LinkedText text={b} />
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={learningBench.href}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm"
            >
              Explore the case study ↗
            </a>
            <a
              href={learningBench.writeup}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
            >
              Kaggle writeup
            </a>
            <a
              href={learningBench.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-sm px-4 py-2.5 text-[13px] font-medium text-muted hover:text-acid transition-colors"
            >
              GitHub
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="space-y-5">
            <p className="label">Key findings</p>
            {learningBench.findings.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i, duration: 0.45 }}
                className="border-l-2 border-[var(--color-acid)]/40 pl-4"
              >
                <h3 className="text-[15px] font-semibold text-txt">{f.title}</h3>
                <p className="mt-1 text-[13px] text-muted leading-relaxed">{f.blurb}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <article id="pokemon-research" className="mt-16 border-t border-[var(--color-line-bright)] pt-10 scroll-mt-28">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="label text-acid">Agent research · The Pokémon Company / Kaggle</p>
            <span className="mono text-[12px] text-dim">{pokemonResearch.year}</span>
          </div>
          <h3 className="serif mt-3 text-2xl md:text-3xl font-medium tracking-tight">
            {pokemonResearch.name}
          </h3>
          <p className="mt-4 max-w-2xl text-[15px] text-muted leading-relaxed">
            {pokemonResearch.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-12 gap-y-4">
            {pokemonResearch.metrics.map((m) => (
              <div key={m.k}>
                <div className="serif text-xl md:text-2xl text-txt">{m.v}</div>
                <div className="label mt-1">{m.k}</div>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {pokemonResearch.links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-sm ${i === 0 ? "btn-primary" : "btn-secondary"}`}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </article>
      </Reveal>
    </section>
  );
}
