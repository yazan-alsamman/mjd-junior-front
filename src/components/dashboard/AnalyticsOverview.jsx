const defaultItems = [
  { label: 'Authentic', value: 0, color: 'bg-emerald-500' },
  { label: 'Suspicious', value: 0, color: 'bg-amber-500' },
  { label: 'Counterfeit', value: 0, color: 'bg-rose-500' },
];

export default function AnalyticsOverview({ stats }) {
  const chartData = [
    {
      label: 'Authentic',
      value: Number(stats?.authenticCount || 0),
      color: 'bg-emerald-500',
    },
    {
      label: 'Suspicious',
      value: Number(stats?.suspiciousCount || 0),
      color: 'bg-amber-500',
    },
    {
      label: 'Counterfeit',
      value: Number(stats?.counterfeitCount || 0),
      color: 'bg-rose-500',
    },
  ];

  const items = chartData.some((item) => item.value > 0) ? chartData : defaultItems;
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm shadow-ink-950/5 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="font-display text-lg font-semibold text-ink-950 dark:text-white">
        Analytics Overview
      </h3>

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between">
              <p className="text-sm font-medium text-ink-700 dark:text-slate-200">
                {item.label}
              </p>
              <p className="text-sm text-ink-500 dark:text-slate-400">{item.value}</p>
            </div>

            <div className="h-3 rounded-full bg-ink-100 dark:bg-slate-800">
              <div
                className={`h-3 rounded-full ${item.color} transition-all duration-700`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
