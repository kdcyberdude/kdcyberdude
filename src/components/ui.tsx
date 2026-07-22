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
    <section id={id} className="wrap scroll-mt-24 py-20 md:py-28">
      <div className="mb-10 md:mb-14">
        <div className="flex items-center gap-3">
          <span className="sec-tag">{tag}</span>
          <span className="h-px flex-1 bg-[var(--color-line)]" />
        </div>
        <h2 className="mt-4 text-2xl md:text-4xl font-semibold tracking-tight text-txt">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-muted text-[15px] md:text-base leading-relaxed">
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
