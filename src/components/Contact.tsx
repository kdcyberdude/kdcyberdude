import { profile } from "../data/content";

const CHANNELS = [
  { label: "Email", value: profile.links.email, href: `mailto:${profile.links.email}` },
  { label: "LinkedIn", value: "in/kdcyberdude", href: profile.links.linkedin },
  { label: "GitHub", value: "kdcyberdude", href: profile.links.github },
  { label: "Hugging Face", value: "kdcyberdude", href: profile.links.huggingface },
];

export default function Contact() {
  return (
    <section id="contact" className="wrap scroll-mt-24 py-20 md:py-28">
      <div className="border-t border-[var(--color-line-bright)] pt-12 md:pt-16">
        <div className="sec-tag mb-4">08 / contact</div>
        <h2 className="serif text-3xl md:text-5xl font-medium tracking-tight leading-[1.05] max-w-2xl">
          Looking for labs and teams that care about{" "}
          <span className="acid-text">empirical work</span>.
        </h2>
        <p className="mt-5 max-w-xl text-muted text-[15px] md:text-base leading-relaxed">
          Open to Anthropic Fellows / research engineering, applied ML research, and founding /
          forward-deployed seats — {profile.availability.geos}. If you’re building something
          rigorous, I’d like to hear about it.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.links.email}`}
            className="inline-flex items-center gap-2 rounded-sm bg-acid px-5 py-3 text-[15px] font-semibold on-acid hover:bg-acid-dim transition-colors"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            Email me →
          </a>
          <a
            href={profile.links.resume}
            className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-line-bright)] bg-panel px-5 py-3 text-[15px] font-medium text-txt hover:border-[var(--color-acid)]/40 hover:text-acid transition-colors"
          >
            Download résumé
          </a>
          <a
            href={profile.links.learningBench}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm px-4 py-3 text-[15px] font-medium text-muted hover:text-acid transition-colors"
          >
            LearningBench ↗
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="group border-t border-[var(--color-line)] pt-3 hover:border-[var(--color-acid)]/45 transition-colors"
            >
              <div className="label mb-1">{c.label}</div>
              <div className="mono text-[13px] text-txt group-hover:text-acid transition-colors break-all">
                {c.value}
              </div>
            </a>
          ))}
        </div>
      </div>

      <footer className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-dim">
        <span className="mono">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </span>
        <span className="mono">
          press{" "}
          <kbd className="border border-[var(--color-line)] rounded-sm px-1.5 py-0.5 text-[11px]">/</kbd>{" "}
          for terminal
        </span>
      </footer>
    </section>
  );
}
