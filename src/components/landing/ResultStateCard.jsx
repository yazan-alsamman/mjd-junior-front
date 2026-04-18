import { AlertTriangle, BadgeCheck, ShieldAlert } from 'lucide-react';

const stateStyles = {
  authentic: {
    icon: BadgeCheck,
    title: 'Authentic',
    ring: 'ring-emerald-200',
    iconBg: 'bg-emerald-50 text-emerald-700',
    tone: 'text-emerald-700',
  },
  suspicious: {
    icon: AlertTriangle,
    title: 'Suspicious',
    ring: 'ring-amber-200',
    iconBg: 'bg-amber-50 text-amber-700',
    tone: 'text-amber-700',
  },
  counterfeit: {
    icon: ShieldAlert,
    title: 'Counterfeit',
    ring: 'ring-rose-200',
    iconBg: 'bg-rose-50 text-rose-700',
    tone: 'text-rose-700',
  },
};

export default function ResultStateCard({
  status,
  confidence,
  description,
  evidence,
}) {
  const style = stateStyles[status];
  const Icon = style.icon;

  return (
    <article
      className={`rounded-2xl bg-white p-5 ring-1 ${style.ring} shadow-sm shadow-ink-950/5 transition duration-200 hover:-translate-y-0.5`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${style.iconBg}`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className={`text-sm font-semibold ${style.tone}`}>
          {confidence}% confidence
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-ink-950">
        {style.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">{description}</p>

      <ul className="mt-4 space-y-2">
        {evidence.map((line) => (
          <li key={line} className="text-sm text-ink-600">
            - {line}
          </li>
        ))}
      </ul>
    </article>
  );
}
