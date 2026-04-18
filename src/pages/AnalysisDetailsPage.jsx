import { useEffect, useState } from 'react';
import { ArrowLeft, BadgeCheck, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ThemeToggle from '../components/common/ThemeToggle';
import { getAnalysisById } from '../api/logoApi';
import { formatDateTime } from '../lib/formatters';

const statusConfig = {
  authentic: {
    className: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    icon: ShieldCheck,
  },
  suspicious: {
    className: 'bg-amber-50 text-amber-700 ring-amber-200',
    icon: ShieldAlert,
  },
  counterfeit: {
    className: 'bg-rose-50 text-rose-700 ring-rose-200',
    icon: ShieldAlert,
  },
  unknown: {
    className: 'bg-ink-100 text-ink-700 ring-ink-200',
    icon: BadgeCheck,
  },
};

export default function AnalysisDetailsPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadItem() {
      try {
        setIsLoading(true);
        setError('');
        const data = await getAnalysisById(id);
        setItem(data);
      } catch (err) {
        setError(err.message || 'Failed to load analysis details.');
      } finally {
        setIsLoading(false);
      }
    }

    loadItem();
  }, [id]);

  const currentStatus = statusConfig[item?.status] || statusConfig.unknown;
  const StatusIcon = currentStatus.icon;

  return (
    <main className="min-h-screen bg-ink-50 px-4 py-6 text-ink-900 transition-colors sm:px-8 sm:py-10 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/history"
              className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 transition hover:bg-ink-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to history
            </Link>

            <Link
              to="/check"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              New Analysis
            </Link>
          </div>

          <ThemeToggle />
        </div>

        <section className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm shadow-ink-950/5 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-slate-400">
            Analysis Details
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink-950 dark:text-white">
            Detailed authenticity result
          </h1>
          <p className="mt-3 text-sm text-ink-600 dark:text-slate-300">
            Review the selected analysis result and associated metadata.
          </p>

          {isLoading && (
            <div className="mt-6 rounded-2xl border border-ink-200 bg-ink-50 p-4 text-sm text-ink-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              Loading analysis details...
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {error}
            </div>
          )}

          {!isLoading && !error && item && (
            <div className="mt-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink-200 bg-ink-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <div>
                  <p className="text-sm text-ink-500 dark:text-slate-400">File name</p>
                  <p className="mt-1 text-lg font-semibold text-ink-900 dark:text-white">
                    {item.fileName}
                  </p>
                </div>

                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ring-1 ${currentStatus.className}`}
                >
                  <StatusIcon className="h-4 w-4" />
                  {item.statusLabel}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-ink-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-sm text-ink-500 dark:text-slate-400">Detected brand</p>
                  <p className="mt-1 text-base font-semibold text-ink-900 dark:text-white">
                    {item.brandName}
                  </p>
                </div>

                <div className="rounded-2xl border border-ink-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-sm text-ink-500 dark:text-slate-400">Confidence</p>
                  <p className="mt-1 text-base font-semibold text-ink-900 dark:text-white">
                    {Math.round(item.confidence)}%
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-ink-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm text-ink-500 dark:text-slate-400">Analysis notes</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-700 dark:text-slate-300">
                  {item.notes || 'No detailed notes available for this analysis.'}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-ink-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-sm text-ink-500 dark:text-slate-400">Created at</p>
                  <p className="mt-1 text-base font-semibold text-ink-900 dark:text-white">
                    {formatDateTime(item.createdAt)}
                  </p>
                </div>

                <div className="rounded-2xl border border-ink-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-sm text-ink-500 dark:text-slate-400">Source</p>
                  <p className="mt-1 text-base font-semibold capitalize text-ink-900 dark:text-white">
                    {item.sourceType || 'user-upload'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
