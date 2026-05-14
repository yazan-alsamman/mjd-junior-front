import { useEffect, useState } from 'react';
import { ArrowLeft, BadgeCheck, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ThemeToggle from '../components/common/ThemeToggle';
import FuturisticPageShell from '../components/shell/FuturisticPageShell';
import FuturisticTopBar from '../components/shell/FuturisticTopBar';
import { getAnalysisById } from '../api/logoApi';
import { formatDateTime } from '../lib/formatters';
import { fx, fxStatusBadge } from '../lib/futureUi';

const statusConfig = {
  authentic: { icon: ShieldCheck },
  suspicious: { icon: ShieldAlert },
  counterfeit: { icon: ShieldAlert },
  unknown: { icon: BadgeCheck },
};

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
        setError(err.message || 'Failed to load product check details.');
      } finally {
        setIsLoading(false);
      }
    }

    loadItem();
  }, [id]);

  const currentStatus = statusConfig[item?.status] || statusConfig.unknown;
  const StatusIcon = currentStatus.icon;
  const confidencePercent = normalizePercent(item?.confidence);

  return (
    <FuturisticPageShell>
      <FuturisticTopBar
        start={
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/history" className={fx.btnGhost}>
              <ArrowLeft className="h-4 w-4" />
              History
            </Link>
            <Link to="/check" className={fx.btnPrimary}>
              New product check
            </Link>
          </div>
        }
        end={<ThemeToggle />}
      />

      <div className={`${fx.containerMd} ${fx.mainTop} px-4 sm:px-6`}>
        <section className={fx.card}>
          <p className={fx.kicker}>Product check details</p>
          <h1 className={fx.titleHero}>Detailed logo authenticity result</h1>
          <p className={`mt-3 ${fx.body}`}>
            Review the selected product image check, detected brand, confidence score, and stored analysis metadata.
          </p>

          {isLoading && <div className={`mt-6 ${fx.alertInfo}`}>Loading product check details...</div>}

          {error && <div className={`mt-6 ${fx.alertError}`}>{error}</div>}

          {!isLoading && !error && item && (
            <div className="mt-8 space-y-5">
              <div className={`${fx.panel} flex flex-wrap items-center justify-between gap-4 p-5`}>
                <div>
                  <p className="text-sm text-zinc-500">Uploaded image</p>
                  <p className="mt-1 text-lg font-semibold text-white">{item.fileName || 'Product image'}</p>
                </div>

                <span className={`${fxStatusBadge(item.status)} gap-2 px-3 py-1.5 text-sm`}>
                  <StatusIcon className="h-4 w-4" />
                  {item.statusLabel || 'Unknown'}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className={`${fx.panel} p-5`}>
                  <p className="text-sm text-zinc-500">Detected brand</p>
                  <p className="mt-1 text-base font-semibold text-white">{item.brandName || 'Unknown'}</p>
                </div>

                <div className={`${fx.panel} p-5`}>
                  <p className="text-sm text-zinc-500">Confidence</p>
                  <p className="mt-1 text-base font-semibold text-white">{Math.round(confidencePercent)}%</p>
                </div>
              </div>

              <div className={`${fx.panel} p-5`}>
                <p className="text-sm text-zinc-500">Analysis notes</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  {item.notes || 'No detailed notes available for this product check.'}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className={`${fx.panel} p-5`}>
                  <p className="text-sm text-zinc-500">Created at</p>
                  <p className="mt-1 text-base font-semibold text-white">{formatDateTime(item.createdAt)}</p>
                </div>

                <div className={`${fx.panel} p-5`}>
                  <p className="text-sm text-zinc-500">Source</p>
                  <p className="mt-1 text-base font-semibold capitalize text-white">
                    {item.sourceType || 'user upload'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </FuturisticPageShell>
  );
}
