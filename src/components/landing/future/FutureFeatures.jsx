import { motion, useReducedMotion } from 'framer-motion';
import {
  Fingerprint,
  Globe2,
  Radar,
  ShieldHalf,
  Workflow,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const tiles = [
  {
    id: 't1',
    span: 'lg:col-span-2 lg:row-span-2',
    icon: Radar,
    title: 'Omnichannel radar',
    body: 'Surface violations from marketplaces, social, and rogue domains in one coherent stream.',
    accent: 'from-violet-500/30 to-transparent',
    href: '/dashboard',
  },
  {
    id: 't2',
    span: '',
    icon: Zap,
    title: 'Sub-second verdict',
    body: 'Edge-optimized inference with explainable confidence.',
    accent: 'from-cyan-500/25 to-transparent',
    href: '/check',
  },
  {
    id: 't3',
    span: '',
    icon: Fingerprint,
    title: 'Glyph DNA',
    body: 'Vector + raster fusion for tamper hints.',
    accent: 'from-fuchsia-500/25 to-transparent',
    href: '/check',
  },
  {
    id: 't4',
    span: 'lg:col-span-2',
    icon: Workflow,
    title: 'Playbooks, not PDFs',
    body: 'Wire authentic assets, route escalations, and export audit trails without leaving the canvas.',
    accent: 'from-emerald-500/20 to-transparent',
    href: '/login',
  },
  {
    id: 't5',
    span: '',
    icon: ShieldHalf,
    title: 'Zero-trust uplink',
    body: 'Encrypted transit, ephemeral previews.',
    accent: 'from-amber-500/20 to-transparent',
    href: '/check',
  },
  {
    id: 't6',
    span: '',
    icon: Globe2,
    title: 'Geo-fenced watch',
    body: 'Region-tuned heuristics for local counterfeits.',
    accent: 'from-sky-500/20 to-transparent',
    href: '/dashboard',
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FutureFeatures() {
  const reduce = useReducedMotion();

  return (
    <section id="forge" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
            Forge · capability matrix
          </p>
          <h2 className="mt-4 font-syne text-4xl font-bold leading-tight text-white sm:text-5xl">
            Instruments for
            <span className="block text-zinc-500">the post-trust economy.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid auto-rows-[minmax(160px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {tiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <motion.article
                key={tile.id}
                variants={item}
                className={`group relative min-h-[200px] overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] ${tile.id === 't1' ? 'min-h-[280px] lg:min-h-[340px]' : ''} ${tile.span}`}
                whileHover={
                  reduce
                    ? {}
                    : {
                        y: -6,
                        transition: { type: 'spring', stiffness: 420, damping: 24 },
                      }
                }
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tile.accent} opacity-0 transition duration-500 group-hover:opacity-100`}
                />
                <div className="relative flex h-full flex-col">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-cyan-300 transition group-hover:border-cyan-400/40 group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-syne text-xl font-semibold text-white">{tile.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400">
                    {tile.body}
                  </p>
                  <Link
                    to={tile.href}
                    className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fuchsia-300/90 opacity-0 transition group-hover:opacity-100"
                  >
                    Open channel
                    <span className="h-px w-8 bg-gradient-to-r from-fuchsia-400 to-transparent" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
