import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FutureCTA() {
  const reduce = useReducedMotion();

  return (
    <section id="ignite" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-950 px-6 py-16 sm:px-12 sm:py-20"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-60"
            animate={
              reduce
                ? {}
                : {
                    background: [
                      'radial-gradient(circle at 20% 30%, rgba(99,102,241,0.35), transparent 50%)',
                      'radial-gradient(circle at 80% 40%, rgba(34,211,238,0.35), transparent 50%)',
                      'radial-gradient(circle at 40% 80%, rgba(244,114,182,0.3), transparent 50%)',
                      'radial-gradient(circle at 20% 30%, rgba(99,102,241,0.35), transparent 50%)',
                    ],
                  }
            }
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <motion.div
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-200/90"
                animate={reduce ? {} : { boxShadow: ['0 0 0 0 rgba(34,211,238,0)', '0 0 0 6px rgba(34,211,238,0.15)', '0 0 0 0 rgba(34,211,238,0)'] }}
                transition={{ duration: 2.8, repeat: Infinity }}
              >
                <Radio className="h-3.5 w-3.5 text-fuchsia-400" aria-hidden />
                Ready when you are
              </motion.div>
              <h2 className="font-syne text-4xl font-bold leading-[1.02] text-white sm:text-5xl lg:text-6xl">
                Start checking
                <span className="block bg-gradient-to-r from-white via-cyan-200 to-fuchsia-300 bg-clip-text text-transparent">
                  product logos.
                </span>
              </h2>
              <p className="mt-6 text-lg text-zinc-400">
                Run a quick logo scan as a guest, or sign in as a company to upload authentic references, review
                detections, and report violations from the dashboard.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
              <motion.div whileHover={reduce ? {} : { scale: 1.03 }} whileTap={reduce ? {} : { scale: 0.98 }}>
                <Link
                  to="/check"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-black shadow-[0_0_60px_-15px_rgba(255,255,255,0.55)] sm:w-auto"
                >
                  Start free scan
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </motion.div>
              <Link
                to="/login"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 px-8 py-4 text-center text-sm font-semibold text-zinc-200 transition hover:border-white/25 hover:bg-white/[0.04] sm:w-auto"
              >
                Company login
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
