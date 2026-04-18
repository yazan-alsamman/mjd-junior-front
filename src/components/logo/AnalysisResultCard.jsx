import { fxStatusBadge } from '../../lib/futureUi';

export default function AnalysisResultCard({ result }) {
  const resultBadgeClass = fxStatusBadge(result?.status);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-500">Authenticity status</p>
          <span className={`mt-1 ${resultBadgeClass} px-3 py-1 text-sm`}>{result.statusLabel}</span>
        </div>

        <div>
          <p className="text-sm text-zinc-500">Confidence</p>
          <p className="mt-1 text-base font-semibold text-white">{Math.round(result.confidence)}%</p>
        </div>
      </div>

      <div>
        <p className="mb-1 text-sm text-zinc-500">Confidence level</p>
        <div className="h-2 w-full rounded-full bg-white/[0.08] ring-1 ring-white/[0.06]">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${Math.min(Math.max(result.confidence, 0), 100)}%` }}
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
