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
      <div className="panel p-7 md:p-12 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(199,247,62,0.12), transparent)" }}
        />
        <div className="relative">
          <div className="sec-tag mb-4">§ / let's build</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] max-w-2xl">
            The right people on the{" "}
            <span className="acid-text">right mission</span>.
          </h2>
          <p className="mt-5 max-w-xl text-muted text-[15px] md:text-base leading-relaxed">
            I'm looking for a founding-team seat where I can train the models, ship the product, and
            run the infra — {profile.availability.roles.join(" / ")} roles across{" "}
            {profile.availability.geos}. If you're building something ambitious, I'd love to hear
            what.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.links.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-acid px-5 py-3 text-[15px] font-semibold text-bg hover:bg-acid/90 transition-colors"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              Email me →
            </a>
            <a
              href={profile.links.resume}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line-bright)] px-5 py-3 text-[15px] font-medium text-txt hover:border-[var(--color-acid)]/40 hover:text-acid transition-colors"
            >
              Download résumé
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="group border-t border-[var(--color-line)] pt-3 hover:border-[var(--color-acid)]/40 transition-colors"
              >
                <div className="label mb-1">{c.label}</div>
                <div className="mono text-[13px] text-txt group-hover:text-acid transition-colors break-all">
                  {c.value}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-dim">
        <span className="mono">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </span>
        <span className="mono">
          built from scratch · react + canvas · press{" "}
          <kbd className="border border-[var(--color-line)] rounded px-1.5 py-0.5 text-[11px]">/</kbd>{" "}
          for terminal
        </span>
      </footer>
    </section>
  );
}
