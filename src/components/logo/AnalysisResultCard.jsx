import { fxStatusBadge } from '../../lib/futureUi';

function normalizePercent(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return 0;
  }

  if (numericValue >= 0 && numericValue <= 1) {
    return numericValue * 100;
  }

  return numericValue;
}

export default function AnalysisResultCard({ result }) {
  const resultBadgeClass = fxStatusBadge(result?.status);
  const confidencePercent = normalizePercent(result?.confidence);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-500">Authenticity status</p>
          <span className={`mt-1 ${resultBadgeClass} px-3 py-1 text-sm`}>{result.statusLabel}</span>
        </div>

        <div>
          <p className="text-sm text-zinc-500">Confidence</p>
          <p className="mt-1 text-base font-semibold text-white">{Math.round(confidencePercent)}%</p>
        </div>
      </div>

      <div>
        <p className="mb-1 text-sm text-zinc-500">Confidence level</p>
        <div className="h-2 w-full rounded-full bg-white/[0.08] ring-1 ring-white/[0.06]">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${Math.min(Math.max(confidencePercent, 0), 100)}%` }}
          />
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-black/35 p-4">
        <p className="text-sm text-zinc-500">Detected brand</p>
        <p className="mt-1 text-base font-semibold text-white">{result.brandName || 'Unknown'}</p>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-black/35 p-4">
        <p className="text-sm text-zinc-500">Analysis notes</p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-300">
          {result.notes || 'No additional notes available.'}
        </p>
      </div>
    </div>
  );
}
