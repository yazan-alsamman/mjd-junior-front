import { ExternalLink, ImageOff } from 'lucide-react';
import { formatDateTime, formatPercentage } from '../../lib/formatters';
import { fx, fxStatusBadge } from '../../lib/futureUi';

function getStatusClass(status) {
  if (status === 'pending_analysis') {
    return 'inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 px-2.5 py-1 text-xs font-semibold text-cyan-100 ring-1 ring-cyan-400/35';
  }

  return fxStatusBadge(status);
}

function formatSourceLabel(item) {
  if (item.platform === 'google_images') return 'Google Images';
  if (item.sourceType === 'instagram') return 'Instagram';
  if (item.sourceType) return item.sourceType.replaceAll('_', ' ');
  return 'Unknown source';
}

function formatRiskLabel(item) {
  if (!item.accountLabel) return '—';

  const score =
    item.accountScorePercent === null || item.accountScorePercent === undefined
      ? ''
      : ` · ${formatPercentage(item.accountScorePercent)}`;

  return `${item.accountLabel}${score}`;
}

function ResultImage({ item }) {
  const imageSrc = item.imageUrl || '';

  if (!imageSrc) {
    return (
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-black/35 text-zinc-600">
        <ImageOff className="h-5 w-5" />
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={item.title || `${item.brand} crawler result`}
      className="h-14 w-14 rounded-xl border border-white/10 object-cover"
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}

export default function CrawlerResultsTable({ items = [], loading = false, error = '' }) {
  if (loading) {
    return <div className="px-5 py-6 text-sm text-zinc-500">Loading crawler results...</div>;
  }

  if (error) {
    return <div className={`m-5 ${fx.alertError}`}>{error}</div>;
  }

  if (!items.length) {
    return (
      <div className="px-5 py-8 text-center">
        <p className="text-sm font-semibold text-white">No crawler results available yet.</p>
        <p className="mt-1 text-sm text-zinc-500">
          Results will appear here after the crawler sends Instagram or Google Images findings.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className={fx.tableHead}>
            <th className="px-5 py-3">Result</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Source</th>
            <th className="px-5 py-3">Account</th>
            <th className="px-5 py-3">Captured</th>
            <th className="px-5 py-3">Link</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className={fx.tableRow}>
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <ResultImage item={item} />
                  <div>
                    <p className="font-semibold capitalize text-white">{item.brand}</p>
                    <p className="mt-1 max-w-[260px] truncate text-xs text-zinc-500">
                      {item.title || item.description || item.searchQuery || item.localImagePath || 'Crawler finding'}
                    </p>
                    {item.targetSite && (
                      <p className="mt-1 text-xs text-cyan-300/80">{item.targetSite}</p>
                    )}
                  </div>
                </div>
              </td>

              <td className="px-5 py-4">
                <span className={getStatusClass(item.productStatus)}>{item.productStatusLabel}</span>
                {item.similarityScore !== null && item.similarityScore !== undefined && (
                  <p className="mt-1 text-xs text-zinc-500">
                    Similarity: {formatPercentage(Number(item.similarityScore) * 100)}
                  </p>
                )}
              </td>

              <td className="px-5 py-4">
                <p className="text-sm font-medium capitalize text-zinc-200">{formatSourceLabel(item)}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.sourceName || item.platform || '—'}</p>
              </td>

              <td className="px-5 py-4">
                <p className="text-sm capitalize text-zinc-300">{formatRiskLabel(item)}</p>
                {item.sellerName && <p className="mt-1 text-xs text-zinc-500">@{item.sellerName}</p>}
              </td>

              <td className="px-5 py-4 text-sm text-zinc-400">{formatDateTime(item.capturedAt)}</td>

              <td className="px-5 py-4">
                {item.sourceUrl ? (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200"
                  >
                    Open
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="text-sm text-zinc-600">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}