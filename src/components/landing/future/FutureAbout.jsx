import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { brand } from '../../../config/brand';

const chapters = [
  {
    year: '01',
    title: 'Signal acquisition',
    copy: 'Every upload becomes a structured evidence packet—hashes, color spaces, and edge topology preserved.',
  },
  {
    year: '02',
    title: 'Dual inference',
    copy: 'Neural perception meets deterministic rules so teams see both the “what” and the “why”.',
  },
  {
    year: '03',
    title: 'Action fabric',
    copy: 'From consumer clarity to enterprise escalation, the same substrate powers both sides of the market.',
  },
];

export default function FutureAbout() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineScale = useTransform(scrollYProgress, [0.15, 0.85], reduce ? [1, 1] : [0.2, 1]);

  return (
    <section
      ref={ref}
      id="ledger"
      className="relative px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.35fr_1fr] lg:gap-24">
        <div className="relative lg:sticky lg:top-32 lg:self-start">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-fuchsia-300/80">
              Ledger · origin story
            </p>
            <h2 className="mt-4 font-syne text-4xl font-bold leading-[1.05] text-white sm:text-5xl">
              We built {brand.name} for the edge between craft and chaos.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-500">
              Counterfeits move faster than policy. {brand.name} is the control room where intuition becomes
              defensible signal—without sanding away the drama of real-world brand work.
            </p>
          </motion.div>

          <div className="absolute left-0 top-0 hidden h-full w-px overflow-hidden lg:block">
            <motion.div
              className="w-full bg-gradient-to-b from-cyan-400 via-fuchsia-500 to-transparent"
              style={{ height: '100%', scaleY: lineScale, transformOrigin: 'top' }}
            />
          </div>
        </div>

        <div className="relative space-y-10 pl-0 lg:pl-12">
          <div className="absolute left-0 top-2 hidden w-px bg-white/10 lg:block" style={{ height: 'calc(100% - 1rem)' }} />

          {chapters.map((c, i) => (
            <motion.article
              key={c.year}
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-zinc-950/80 to-black p-8 sm:p-10"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-fuchsia-600/10 blur-3xl" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.35em] text-zinc-600">
                {c.year}
              </span>
              <h3 className="mt-3 font-syne text-2xl font-semibold text-white sm:text-3xl">
                {c.title}
              </h3>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-zinc-400 sm:text-base">{c.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
