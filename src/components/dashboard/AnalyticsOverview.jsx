const defaultItems = [
  { label: 'Authentic', value: 0, color: 'bg-emerald-400' },
  { label: 'Suspicious', value: 0, color: 'bg-amber-400' },
  { label: 'Counterfeit', value: 0, color: 'bg-rose-400' },
];

export default function AnalyticsOverview({ stats }) {
  const chartData = [
    {
      label: 'Authentic',
      value: Number(stats?.authenticCount || 0),
      color: 'bg-emerald-400',
    },
    {
      label: 'Suspicious',
      value: Number(stats?.suspiciousCount || 0),
      color: 'bg-amber-400',
    },
    {
      label: 'Counterfeit',
      value: Number(stats?.counterfeitCount || 0),
      color: 'bg-rose-400',
    },
  ];

  const items = chartData.some((item) => item.value > 0) ? chartData : defaultItems;
  const maxValue = Math.max(...items.map((item) => item.value), 1);
  const total = Number(stats?.totalAnalyses || 0);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/30 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-syne text-lg font-semibold text-white">Monitoring verdicts</h3>
          <p className="mt-1 text-sm text-zinc-500">Final AI results from verified crawler findings.</p>
        </div>

        <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-zinc-400">
          Total {total}
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-300">{item.label}</p>
              <p className="font-mono text-sm text-zinc-500">{item.value}</p>
            </div>

            <div className="h-3 rounded-full bg-white/[0.06] ring-1 ring-white/[0.04]">
              <div
                className={`h-3 rounded-full ${item.color} shadow-[0_0_12px_-2px_rgba(255,255,255,0.25)] transition-all duration-700`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {!chartData.some((item) => item.value > 0) && (
        <p className="mt-4 text-xs leading-relaxed text-zinc-600">
          Run verification on monitoring results to populate final verdict analytics.
        </p>
      )}
    </div>
  );
}
