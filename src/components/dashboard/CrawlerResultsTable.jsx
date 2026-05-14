import { ExternalLink, Eye, ImageOff, ScanSearch } from 'lucide-react';
import { formatDateTime, formatPercentage } from '../../lib/formatters';
import { fx, fxStatusBadge } from '../../lib/futureUi';

const VERIFYABLE_STATUSES = new Set(['pending_analysis', 'pending_similarity']);

function getStatusClass(status) {
  if (status === 'pending_analysis') {
    return 'inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 px-2.5 py-1 text-xs font-semibold text-cyan-100 ring-1 ring-cyan-400/35';
  }

  if (status === 'pending_similarity') {
    return 'inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 px-2.5 py-1 text-xs font-semibold text-indigo-100 ring-1 ring-indigo-400/35';
  }

  if (status === 'no_logo_detected') {
    return 'inline-flex items-center gap-1.5 rounded-full bg-zinc-500/15 px-2.5 py-1 text-xs font-semibold text-zinc-200 ring-1 ring-zinc-400/25';
  }

  return fxStatusBadge(status);
}

function getReadableStatusLabel(item) {
  const status = item.productStatus;

  if (status === 'pending_analysis') return 'Needs verification';
  if (status === 'pending_similarity') return 'Logo detected';
  if (status === 'authentic') return 'Authentic';
  if (status === 'suspicious') return 'Suspicious';
  if (status === 'counterfeit') return 'Counterfeit';
  if (status === 'no_logo_detected') return 'No logo detected';

  return item.productStatusLabel || 'Pending analysis';
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

function getResultTitle(item) {
  return item.title || item.description || item.searchQuery || item.localImagePath || 'Crawler finding';
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

function ResultActions({ item, onVerify, verifyingId }) {
  const canVerify = VERIFYABLE_STATUSES.has(item.productStatus);
  const isVerifying = verifyingId === item.id;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {item.sourceUrl ? (
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-200 transition hover:border-cyan-300/40 hover:bg-cyan-400/15"
        >
          Source
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      ) : null}

      {item.croppedLogoPath ? (
        <a
          href={item.croppedLogoPath}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-100 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-400/15"
        >
          Crop
          <Eye className="h-3.5 w-3.5" />
        </a>
      ) : null}

      {canVerify ? (
        <button
          type="button"
          onClick={() => onVerify?.(item)}
          disabled={isVerifying}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-100 transition hover:border-emerald-300/40 hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ScanSearch className="h-3.5 w-3.5" />
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>
      ) : null}
    </div>
  );
}

export default function CrawlerResultsTable({
  items = [],
  loading = false,
  error = '',
  onVerify,
  verifyingId = '',
}) {
  if (loading) {
    return <div className="px-5 py-6 text-sm text-zinc-500">Loading crawler results...</div>;
  }

  if (error) {
    return <div className={`m-5 ${fx.alertError}`}>{error}</div>;
  }

  if (!items.length) {
    return (
      <div className="px-5 py-10 text-center">
        <p className="text-sm font-semibold text-white">No monitoring results match the current filters.</p>
        <p className="mt-1 text-sm text-zinc-500">
          Run a targeted site scan or reset filters to review collected findings.
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
            <th className="px-5 py-3">Verdict</th>
            <th className="px-5 py-3">Source</th>
            <th className="px-5 py-3">Account risk</th>
            <th className="px-5 py-3">Captured</th>
            <th className="px-5 py-3">Actions</th>
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
                    <p className="mt-1 max-w-[300px] truncate text-xs text-zinc-500">{getResultTitle(item)}</p>
                    {item.targetSite && (
                      <p className="mt-1 text-xs font-medium text-cyan-300/80">{item.targetSite}</p>
                    )}
                  </div>
                </div>
              </td>

              <td className="px-5 py-4">
                <span className={getStatusClass(item.productStatus)}>{getReadableStatusLabel(item)}</span>

                {item.similarityScore !== null && item.similarityScore !== undefined && (
                  <p className="mt-1 text-xs text-zinc-500">
                    Similarity: {formatPercentage(Number(item.similarityScore) * 100)}
                  </p>
                )}

                {item.productConfidence !== null && item.productConfidence !== undefined && (
                  <p className="mt-1 text-xs text-zinc-600">
                    Confidence: {formatPercentage(Number(item.productConfidence) * 100)}
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
                <ResultActions item={item} onVerify={onVerify} verifyingId={verifyingId} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}