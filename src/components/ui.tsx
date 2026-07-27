import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "../hooks";

/** A numbered section with a mono tag + serif-ish heading. */
export function Section({
  id,
  tag,
  title,
  subtitle,
  children,
}: {
  id: string;
  tag: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="wrap scroll-mt-24 py-16 md:py-24">
      <div className="mb-10 md:mb-12">
        <div className="flex items-center gap-3">
          <span className="sec-tag">{tag}</span>
          <span className="h-px flex-1 bg-[var(--color-line)]" />
        </div>
        <h2 className="mt-5 serif text-2xl md:text-[2.5rem] font-medium tracking-tight text-txt leading-[1.15]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 max-w-xl text-muted text-[15px] leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

/** Fade + rise on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Render text with optional `[label](url)` markdown links. */
export function LinkedText({ text, className }: { text: string; className?: string }) {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a
        key={key++}
        href={m[2]}
        target="_blank"
        rel="noreferrer"
        className="text-acid hover:underline underline-offset-2"
      >
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <span className={className}>{parts}</span>;
}

export function ExtLinks({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  if (!links.length) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
      {links.map((l) => (
        <a
          key={l.href + l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className="mono text-[11px] text-acid hover:underline"
        >
          {l.label} ↗
        </a>
      ))}
    </div>
  );
}
