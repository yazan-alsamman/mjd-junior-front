import { ArrowDownRight, ArrowUpRight, Dot } from 'lucide-react';

const trendStyles = {
  up: {
    icon: ArrowUpRight,
    color: 'text-emerald-700',
  },
  down: {
    icon: ArrowDownRight,
    color: 'text-rose-700',
  },
  neutral: {
    icon: Dot,
    color: 'text-ink-500',
  },
};

export default function SummaryCard({ title, value, delta, trend, hint }) {
  const style = trendStyles[trend] ?? trendStyles.neutral;
  const TrendIcon = style.icon;

  return (
    <article className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm shadow-ink-950/5">
      <p className="text-sm text-ink-600">{title}</p>
      <p className="mt-3 font-display text-3xl font-semibold text-ink-950">
        {value}
      </p>
      <div className="mt-4 flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 text-sm ${style.color}`}>
          <TrendIcon className="h-4 w-4" aria-hidden="true" />
          {delta}
        </span>
        <span className="text-sm text-ink-500">{hint}</span>
      </div>
    </article>
  );
}
