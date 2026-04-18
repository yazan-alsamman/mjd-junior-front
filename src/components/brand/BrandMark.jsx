import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brand } from '../../config/brand';

export default function BrandMark({ to = '/', compact = false, light = false }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
      aria-label={`${brand.name} home`}
    >
      <span
        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${
          light
            ? 'border-white/20 bg-white/10 text-white'
            : 'border-brand-200 bg-brand-50 text-brand-700'
        }`}
      >
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
      </span>
      {!compact && (
        <span className="leading-none">
          <span
            className={`block font-display text-base font-semibold ${
              light ? 'text-white' : 'text-ink-950'
            }`}
          >
            {brand.name}
          </span>
          <span
            className={`block text-xs ${light ? 'text-ink-200' : 'text-ink-500'}`}
          >
            {brand.tagline}
          </span>
        </span>
      )}
    </Link>
  );
}
