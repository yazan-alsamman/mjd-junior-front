import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { brand } from '../../../config/brand';

const cols = [
  {
    title: 'Product',
    links: [
      { to: '/check', label: 'Scan' },
      { to: '/history', label: 'History' },
      { to: '/dashboard', label: 'Dashboard' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/', label: 'Overview' },
      { to: '/login', label: 'Company login' },
    ],
  },
];

export default function FutureFooter() {
  return (
    <footer className="border-t border-white/[0.06] px-4 py-14 sm:px-6">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-syne text-2xl font-bold text-white">{brand.name}</p>
          <p className="mt-2 max-w-xs font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600">
            {brand.tagline}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:gap-16">
          {cols.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-600">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-zinc-400 transition hover:text-white"
                    >
                      <motion.span whileHover={{ x: 4 }} className="inline-block">
                        {l.label}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="font-mono text-[10px] text-zinc-700">
          © {new Date().getFullYear()} {brand.name}
          <span className="mx-2 text-zinc-800">·</span>
          Crafted signal
        </p>
      </div>
    </footer>
  );
}
