import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BrandMark from '../../brand/BrandMark';
import ThemeToggle from '../../common/ThemeToggle';
const links = [
  { href: '#signal', label: 'Scan' },
  { href: '#forge', label: 'Features' },
  { href: '#ledger', label: 'Workflow' },
  { href: '#ignite', label: 'Start' },
];

export default function FutureNav() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-black/40 px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_24px_80px_-24px_rgba(99,102,241,0.35)] backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-3">
          <BrandMark to="/" light />
          <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/90 sm:inline">
            Logo verification
          </span>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              className="group relative px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-white"
              whileHover={reduce ? {} : { y: -1 }}
            >
              {l.label}
              <span className="absolute bottom-1 left-3 right-3 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-transform duration-300 group-hover:scale-x-100" />
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/login"
            className="hidden rounded-xl border border-white/10 px-3 py-2 font-mono text-xs font-medium uppercase tracking-wider text-zinc-300 transition hover:border-white/20 hover:text-white sm:inline-flex"
          >
            Company login
          </Link>
          <motion.div whileHover={reduce ? {} : { scale: 1.03 }} whileTap={reduce ? {} : { scale: 0.97 }}>
            <Link
              to="/check"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(168,85,247,0.7)] transition [background-size:200%_auto] hover:bg-right"
              style={{ backgroundPosition: '0% 50%' }}
            >
              Start scan
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>

          <button
            type="button"
            className="inline-flex rounded-xl border border-white/10 p-2 text-white md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mx-auto mt-2 flex max-w-[1400px] flex-col gap-1 rounded-2xl border border-white/10 bg-black/80 p-3 backdrop-blur-xl md:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-3 font-mono text-xs uppercase tracking-widest text-zinc-300"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/login"
            className="rounded-lg px-3 py-3 font-mono text-xs uppercase tracking-widest text-zinc-300"
            onClick={() => setOpen(false)}
          >
            Company login
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
