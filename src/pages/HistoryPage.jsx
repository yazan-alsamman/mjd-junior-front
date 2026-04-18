import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, Clock3, FileImage, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/common/ThemeToggle';
import { getAnalysisHistory } from '../api/logoApi';
import { formatDateTime } from '../lib/formatters';

const statusStyles = {
  authentic: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  suspicious: 'bg-amber-50 text-amber-700 ring-amber-200',
  counterfeit: 'bg-rose-50 text-rose-700 ring-rose-200',
  unknown: 'bg-ink-100 text-ink-700 ring-ink-200',
};

export default function HistoryPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await getAnalysisHistory();
      setItems(data);
    } catch (err) {
      setError(err.message || 'Failed to load analysis history.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return (
    <main className="min-h-screen bg-ink-50 px-4 py-6 text-ink-900 transition-colors sm:px-8 sm:py-10 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 transition hover:bg-ink-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to homepage
            </Link>

            <button
              type="button"
              onClick={loadHistory}
              className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 transition hover:bg-ink-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <ThemeToggle />
            <Link
              to="/check"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              New Analysis
            </Link>
          </div>
        </div>

        <section className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm shadow-ink-950/5 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-slate-400">
            User History
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink-950 dark:text-white">
            Previous logo analyses
          </h1>
          <p className="mt-3 text-sm text-ink-600 dark:text-slate-300">
            Review your previous product checks and authenticity decisions.
          </p>

          {isLoading && (
            <div className="mt-6 rounded-2xl border border-ink-200 bg-ink-50 p-4 text-sm text-ink-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              Loading history...
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {error}
            </div>
          )}

          {!isLoading && !error && (
            <div className="mt-6 space-y-4">
              {items.length === 0 && (
                <div className="rounded-2xl border border-ink-200 bg-ink-50 p-5 text-sm text-ink-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                  No previous analyses found.
                </div>
              )}

              {items.map((item) => (
                <Link
                  key={item.id}
                  to={`/history/${item.id}`}
                  className="block rounded-2xl border border-ink-200 bg-ink-50 p-4 transition hover:border-brand-300 hover:bg-white dark:border-slate-800 dark:bg-slate-950 dark:hover:border-brand-700 dark:hover:bg-slate-900"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-white p-3 ring-1 ring-ink-200 dark:bg-slate-900 dark:ring-slate-700">
                        <FileImage className="h-5 w-5 text-brand-600" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-ink-900 dark:text-white">
                          {item.fileName}
                        </p>
                        <p className="mt-1 text-sm text-ink-600 dark:text-slate-300">
                          Brand: {item.brandName}
                        </p>
                        <p className="mt-1 inline-flex items-center gap-1 text-xs text-ink-500 dark:text-slate-400">
                          <Clock3 className="h-3.5 w-3.5" />
                          {formatDateTime(item.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
                          statusStyles[item.status] || statusStyles.unknown
                        }`}
                      >
                        {item.statusLabel}
                      </span>
                      <p className="mt-2 text-sm font-semibold text-ink-900 dark:text-white">
                        {Math.round(item.confidence)}%
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
