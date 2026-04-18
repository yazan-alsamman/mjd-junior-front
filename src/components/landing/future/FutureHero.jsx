import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Cpu, Orbit, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../../../config/brand';
import { fadeUp, staggerContainer } from './motionVariants';

export default function FutureHero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const parallaxText = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 80]);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const springConfig = { damping: 28, stiffness: 120 };
  const rotateX = useSpring(useTransform(my, [0, 1], reduce ? [0, 0] : [9, -9]), springConfig);
  const rotateY = useSpring(useTransform(mx, [0, 1], reduce ? [0, 0] : [-11, 11]), springConfig);
  const glowX = useSpring(useTransform(mx, [0, 1], [20, 80]), springConfig);
  const glowY = useSpring(useTransform(my, [0, 1], [20, 80]), springConfig);
  const glowX2 = useTransform(mx, [0, 1], [82, 18]);
  const glowY2 = useTransform(my, [0, 1], [78, 22]);
  const background = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(34,211,238,0.22), transparent 45%), radial-gradient(circle at ${glowX2}% ${glowY2}%, rgba(244,114,182,0.18), transparent 40%)`;

  function handlePointerMove(event) {
    if (reduce) return;
    const el = event.currentTarget;
    const r = el.getBoundingClientRect();
    mx.set((event.clientX - r.left) / r.width);
    my.set((event.clientY - r.top) / r.height);
  }

  function handlePointerLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <section
      ref={sectionRef}
      id="signal"
      className="relative min-h-[100svh] overflow-hidden px-4 pb-24 pt-28 sm:px-6 sm:pb-32 sm:pt-32"
    >
      <motion.div
        aria-hidden
        style={{ y: parallaxText }}
        className="pointer-events-none absolute left-[-8%] top-[18%] select-none font-syne text-[clamp(5rem,18vw,14rem)] font-black leading-none text-white/[0.04]"
      >
        SIGIL
      </motion.div>

      <div className="relative mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-3xl"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-200/90 shadow-[0_0_40px_-12px_rgba(34,211,238,0.5)]"
          >
            <Sparkles className="h-3.5 w-3.5 text-fuchsia-400" aria-hidden />
            Live inference · forensic-grade trace
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-syne text-[clamp(2.6rem,6vw,4.75rem)] font-bold leading-[0.95] tracking-tight text-white"
          >
            Decode reality
            <span className="block bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-transparent">
              behind every mark.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
          >
            {brand.name} fuses vision models with rule-based forensics so individuals can trust
            what they buy—and teams can hunt misuse across the open web.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <motion.div whileHover={reduce ? {} : { scale: 1.04 }} whileTap={reduce ? {} : { scale: 0.98 }}>
              <Link
                to="/check"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl px-8 py-4 text-base font-semibold text-white"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-500 transition-[filter] duration-300 group-hover:brightness-110" />
                <span className="absolute inset-0 opacity-0 mix-blend-overlay transition group-hover:opacity-100">
                  <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition duration-700 group-hover:translate-x-[100%]" />
                </span>
                <Cpu className="relative h-5 w-5" aria-hidden />
                <span className="relative">Initialize scan</span>
              </Link>
            </motion.div>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.03] px-6 py-4 text-sm font-semibold text-zinc-200 backdrop-blur-sm transition hover:border-white/25 hover:bg-white/[0.06]"
            >
              <Orbit className="h-4 w-4 text-cyan-400" aria-hidden />
              Command center
            </Link>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-[11px]"
          >
            <div>
              <dt className="text-zinc-600">Latency</dt>
              <dd className="mt-2 text-lg font-semibold tracking-normal text-white">&lt; 1.2s</dd>
            </div>
            <div>
              <dt className="text-zinc-600">Verdicts</dt>
              <dd className="mt-2 text-lg font-semibold tracking-normal text-white">3-axis</dd>
            </div>
            <div>
              <dt className="text-zinc-600">Channels</dt>
              <dd className="mt-2 text-lg font-semibold tracking-normal text-white">Web + SO</dd>
            </div>
          </motion.dl>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94, rotateX: 8 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{ perspective: 1200 }}
          className="relative z-10"
        >
          <motion.div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{ rotateX, rotateY, background }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/60 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_40px_120px_-40px_rgba(99,102,241,0.55)]"
          >
            <div className="rounded-[1.85rem] bg-gradient-to-br from-zinc-900/90 to-black p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fuchsia-300/90">
                    Session / uplink
                  </p>
                  <p className="mt-1 font-syne text-xl font-semibold text-white">
                    Spectral capture
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                  <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                  <span className="h-2 w-2 rounded-full bg-rose-500/70" />
                </div>
              </div>

              <div className="mt-6 space-y-4 font-mono text-xs text-zinc-400">
                <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 px-4 py-3">
                  <span>Tensor mesh</span>
                  <span className="text-cyan-300">stable</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 px-4 py-3">
                  <span>Glyph confidence</span>
                  <span className="text-fuchsia-300">94.2%</span>
                </div>
                <div className="relative h-36 overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-indigo-950/80 to-black">
                  <motion.div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background:
                        'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                    }}
                    animate={reduce ? {} : { y: [0, -40] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="h-24 w-24 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 shadow-[0_0_60px_-10px_rgba(34,211,238,0.5)]"
                      animate={reduce ? {} : { rotate: [0, 360] }}
                      transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                </div>
              </div>

              <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                Drag consciousness across the glass plane
              </p>
            </div>
          </motion.div>

          <motion.div
            aria-hidden
            className="absolute -right-6 -top-6 hidden h-24 w-24 rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/10 blur-sm sm:block"
            animate={reduce ? {} : { y: [0, -12, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-8 -left-4 h-20 w-20 rounded-full border border-cyan-400/20 bg-cyan-500/10 blur-md"
            animate={reduce ? {} : { scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
