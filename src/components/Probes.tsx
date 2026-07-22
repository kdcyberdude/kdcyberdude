import { probes, digs, probesIntro, probesNote, profile, type Probe } from "../data/content";
import { Reveal } from "./ui";

const STATUS: Record<
  Probe["status"],
  { label: string; className: string }
> = {
  public: {
    label: "public",
    className: "text-teal border-[var(--color-teal)]/30",
  },
  private: {
    label: "private",
    className: "text-amber border-[var(--color-amber)]/35",
  },
  fork: {
    label: "fork",
    className: "text-violet border-[var(--color-violet)]/35",
  },
  probe: {
    label: "probe",
    className: "text-acid border-[var(--color-acid)]/30",
  },
};

function HostTag({ host }: { host?: Probe["host"] }) {
  if (!host || host === "github") return null;
  return (
    <span className="mono text-[10px] text-dim">
      · {host === "bitbucket" ? "Bitbucket" : "local"}
    </span>
  );
}

function ProbeCard({ p, i }: { p: Probe; i: number }) {
  const st = STATUS[p.status];
  const inner = (
    <>
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="label">{p.kicker}</span>
        <span
          className={`mono text-[10px] border rounded-full px-2 py-0.5 ${st.className}`}
        >
          {st.label}
          <HostTag host={p.host} />
        </span>
      </div>
      <h3 className="text-[16px] font-semibold text-txt tracking-tight flex items-baseline gap-2">
        {p.name}
        {p.href && <span className="text-dim text-[12px] font-normal">↗</span>}
      </h3>
      <p className="mt-2 text-[13.5px] text-muted leading-relaxed flex-1">{p.blurb}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span
            key={s}
            className="mono text-[10.5px] text-muted border border-[var(--color-line)] rounded px-2 py-0.5"
          >
            {s}
          </span>
        ))}
      </div>
    </>
  );

  const className =
    "panel p-5 h-full flex flex-col transition-colors hover:border-[var(--color-acid)]/30";

  return (
    <Reveal delay={i * 0.04}>
      {p.href ? (
        <a
          href={p.href}
          target="_blank"
          rel="noreferrer"
          className={`${className} group`}
        >
          {inner}
        </a>
      ) : (
        <div className={className} title="Private — ask me for a walkthrough">
          {inner}
          <p className="mt-3 mono text-[10px] text-dim">
            no public link yet · ask for a walkthrough
          </p>
        </div>
      )}
    </Reveal>
  );
}

export default function Probes() {
  return (
    <div>
      <Reveal>
        <div className="mb-8 panel p-5 md:p-6 border-[var(--color-acid)]/20 bg-[var(--color-acid)]/[0.03]">
          <p className="text-[14.5px] text-txt/90 leading-relaxed">{probesIntro}</p>
          <p className="mt-3 text-[13.5px] text-muted leading-relaxed">
            {probesNote}{" "}
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-txt underline decoration-[var(--color-acid)]/40 underline-offset-4 hover:text-acid"
            >
              github.com/kdcyberdude
            </a>
            {profile.links.bitbucket ? (
              <>
                {" · "}
                <a
                  href={profile.links.bitbucket}
                  target="_blank"
                  rel="noreferrer"
                  className="text-txt underline decoration-[var(--color-acid)]/40 underline-offset-4 hover:text-acid"
                >
                  Bitbucket
                </a>
              </>
            ) : null}
          </p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {probes.map((p, i) => (
          <ProbeCard key={p.id} p={p} i={i} />
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="mono text-[11px] acid-text">upstream digs</span>
            <span className="h-px flex-1 bg-[var(--color-line)]" />
            <span className="mono text-[10px] text-dim">
              forks I actually commit to
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {digs.map((d) => (
              <a
                key={d.name}
                href={d.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 rounded-lg border border-[var(--color-line)] bg-white/[0.015] px-3.5 py-3 hover:border-[var(--color-acid)]/35 transition-colors group"
              >
                <span className="mono text-[11px] text-acid mt-0.5 shrink-0">⎇</span>
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-txt group-hover:text-acid transition-colors">
                    {d.name}
                  </div>
                  <div className="text-[12px] text-muted leading-snug mt-0.5">
                    {d.note}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
