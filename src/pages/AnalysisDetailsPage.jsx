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
    <FuturisticPageShell>
      <FuturisticTopBar
        start={
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/history" className={fx.btnGhost}>
              <ArrowLeft className="h-4 w-4" />
              History
            </Link>
            <Link to="/check" className={fx.btnPrimary}>
              New Analysis
            </Link>
          </div>
        }
        end={<ThemeToggle />}
      />

      <div className={`${fx.containerMd} ${fx.mainTop} px-4 sm:px-6`}>
        <section className={fx.card}>
          <p className={fx.kicker}>Analysis details</p>
          <h1 className={fx.titleHero}>Detailed authenticity result</h1>
          <p className={`mt-3 ${fx.body}`}>Review the selected analysis result and associated metadata.</p>

          {isLoading && <div className={`mt-6 ${fx.alertInfo}`}>Loading analysis details...</div>}

          {error && <div className={`mt-6 ${fx.alertError}`}>{error}</div>}

          {!isLoading && !error && item && (
            <div className="mt-8 space-y-5">
              <div className={`${fx.panel} flex flex-wrap items-center justify-between gap-4 p-5`}>
                <div>
                  <p className="text-sm text-zinc-500">File name</p>
                  <p className="mt-1 text-lg font-semibold text-white">{item.fileName}</p>
                </div>

                <span className={`${fxStatusBadge(item.status)} gap-2 px-3 py-1.5 text-sm`}>
                  <StatusIcon className="h-4 w-4" />
                  {item.statusLabel}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className={`${fx.panel} p-5`}>
                  <p className="text-sm text-zinc-500">Detected brand</p>
                  <p className="mt-1 text-base font-semibold text-white">{item.brandName}</p>
                </div>

                <div className={`${fx.panel} p-5`}>
                  <p className="text-sm text-zinc-500">Confidence</p>
                  <p className="mt-1 text-base font-semibold text-white">{Math.round(item.confidence)}%</p>
                </div>
              </div>

              <div className={`${fx.panel} p-5`}>
                <p className="text-sm text-zinc-500">Analysis notes</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  {item.notes || 'No detailed notes available for this analysis.'}
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
                    {item.sourceType || 'user-upload'}
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
