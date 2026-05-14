import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, Clock3, FileImage, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/common/ThemeToggle';
import FuturisticPageShell from '../components/shell/FuturisticPageShell';
import FuturisticTopBar from '../components/shell/FuturisticTopBar';
import { getAnalysisHistory } from '../api/logoApi';
import { formatDateTime } from '../lib/formatters';
import { fx, fxStatusBadge } from '../lib/futureUi';

function ensureArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.results)) return value.results;
  return [];
}

export default function HistoryPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const data = await getAnalysisHistory();
      setItems(ensureArray(data));
    } catch (err) {
      setItems([]);
      setError(err.message || 'Failed to load product check history.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const safeItems = ensureArray(items);

  return (
    <FuturisticPageShell>
      <FuturisticTopBar
        start={
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/" className={fx.btnGhost}>
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>

            <button type="button" onClick={loadHistory} className={fx.btnGhost}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        }
        end={
          <>
            <ThemeToggle />
            <Link to="/check" className={fx.btnPrimary}>
              New product check
            </Link>
          </>
        }
      />

      <div className={`${fx.containerNarrow} ${fx.mainTop} px-4 sm:px-6`}>
        <section className={fx.card}>
          <p className={fx.kicker}>Guest product checks</p>
          <h1 className={fx.titleHero}>Your previous logo checks</h1>
          <p className={`mt-3 max-w-2xl ${fx.body}`}>
            Review product images checked from this browser/session. Company monitoring results are managed separately
            inside the company dashboard.
          </p>

          {isLoading && <div className={`mt-6 ${fx.alertInfo}`}>Loading product check history...</div>}

          {error && <div className={`mt-6 ${fx.alertError}`}>{error}</div>}

          {!isLoading && !error && (
            <div className="mt-8 space-y-4">
              {safeItems.length === 0 && (
                <div className={`${fx.panel} p-5 text-sm text-zinc-400`}>
                  No previous product checks found. Upload a product image to start a new logo authenticity check.
                </div>
              )}

              {safeItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/history/${item.id}`}
                  className="block rounded-2xl border border-white/[0.08] bg-black/25 p-4 transition hover:border-cyan-500/30 hover:bg-white/[0.04]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
                        <FileImage className="h-5 w-5 text-cyan-400" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.fileName || 'Uploaded product image'}
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          Detected brand: {item.brandName || 'Unknown'}
                        </p>

                        <p className="mt-1 inline-flex items-center gap-1 font-mono text-xs text-zinc-600">
                          <Clock3 className="h-3.5 w-3.5" />
                          {formatDateTime(item.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={fxStatusBadge(item.status || 'unknown')}>
                        {item.statusLabel || 'Unknown'}
                      </span>

                      <p className="mt-2 text-sm font-semibold text-white">
                        {Math.round(Number(item.confidence) || 0)}%
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </FuturisticPageShell>
  );
}
