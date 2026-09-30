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
        <div className="sec-tag mb-4">07 / contact</div>
        <h2 className="serif text-3xl md:text-5xl font-medium tracking-tight leading-[1.05] max-w-2xl">
          Open to teams taking AI from{" "}
          <span className="acid-text">research to real use</span>.
        </h2>
        <p className="mt-5 max-w-xl text-muted text-[15px] md:text-base leading-relaxed">
          I’m interested in research engineering, applied ML, and forward-deployed engineering
          roles. I like working with users to define the problem, build the system, and measure
          how well it works.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.links.email}`}
            className="btn btn-primary"
          >
            Email me →
          </a>
          <a
            href={profile.links.resume}
            className="btn btn-secondary"
          >
            Download résumé
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
