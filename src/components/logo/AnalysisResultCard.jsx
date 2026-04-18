const resultStatusStyles = {
  authentic: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  suspicious: 'bg-amber-50 text-amber-700 ring-amber-200',
  counterfeit: 'bg-rose-50 text-rose-700 ring-rose-200',
  unknown: 'bg-ink-100 text-ink-700 ring-ink-200',
};

export default function AnalysisResultCard({ result }) {
  const resultBadgeClass = resultStatusStyles[result?.status] || resultStatusStyles.unknown;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-ink-500 dark:text-slate-400">Authenticity status</p>
          <span
            className={`mt-1 inline-flex rounded-full px-3 py-1 text-sm font-semibold ring-1 ${resultBadgeClass}`}
          >
            {result.statusLabel}
          </span>
        </div>

        <div>
          <p className="text-sm text-ink-500 dark:text-slate-400">Confidence</p>
          <p className="text-base font-semibold text-ink-900 dark:text-white">
            {Math.round(result.confidence)}%
          </p>
        </div>
      </div>

      <div>
        <p className="mb-1 text-sm text-ink-500 dark:text-slate-400">Confidence level</p>
        <div className="h-2 w-full rounded-full bg-ink-200 dark:bg-slate-800">
          <div
            className="h-2 rounded-full bg-brand-600 transition-all duration-500"
            style={{ width: `${Math.min(Math.max(result.confidence, 0), 100)}%` }}
          />
        </div>
      </div>

      <div className="rounded-xl border border-ink-200 bg-ink-50 p-4 dark:border-slate-800 dark:bg-slate-950">
        <p className="text-sm text-ink-500 dark:text-slate-400">Detected brand</p>
        <p className="mt-1 text-base font-semibold text-ink-900 dark:text-white">
          {result.brandName || 'Unknown'}
        </p>
      </div>

      <div className="rounded-xl border border-ink-200 bg-ink-50 p-4 dark:border-slate-800 dark:bg-slate-950">
        <p className="text-sm text-ink-500 dark:text-slate-400">Analysis notes</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-700 dark:text-slate-300">
          {result.notes || 'No additional notes available.'}
        </p>
      </div>
    </div>
  );
}
