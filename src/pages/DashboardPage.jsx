import { useCallback, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Globe,
  ImagePlus,
  MessageCircleWarning,
  ShieldCheck,
  UploadCloud,
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import {
  getCompanyDashboard,
  reportViolation,
  uploadAuthenticLogos,
} from '../api/companyApi';
import RecentAnalysesTable from '../components/dashboard/RecentAnalysesTable';
import AnalyticsOverview from '../components/dashboard/AnalyticsOverview';
import { formatCompactNumber } from '../lib/formatters';
import { fx } from '../lib/futureUi';
import {
  violationDefaultValues,
  violationSchema,
} from '../lib/validation';

const sources = [
  {
    title: 'Social media reports',
    description: 'Track suspected counterfeit logos shared on social platforms.',
    icon: MessageCircleWarning,
  },
  {
    title: 'Website monitoring',
    description: 'Review logos and products detected on commercial websites.',
    icon: Globe,
  },
  {
    title: 'Brand asset uploads',
    description: 'Store original logos to support verification and comparison.',
    icon: ImagePlus,
  },
];

const emptyDashboard = {
  stats: {
    totalAnalyses: 0,
    authenticCount: 0,
    suspiciousCount: 0,
    counterfeitCount: 0,
    violationReports: 0,
  },
  recentAnalyses: [],
};

const fieldClass = `${fx.input}`;
const errText = 'mt-1 text-xs text-rose-300';

export default function DashboardPage() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(emptyDashboard);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState('');
  const [uploadStatus, setUploadStatus] = useState({
    loading: false,
    success: '',
    error: '',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(violationSchema),
    defaultValues: violationDefaultValues,
    mode: 'onBlur',
  });

  const [reportFeedback, setReportFeedback] = useState({
    success: '',
    error: '',
  });

  const loadDashboard = useCallback(async () => {
    try {
      setDashboardLoading(true);
      setDashboardError('');
      const data = await getCompanyDashboard();
      setDashboard(data);
    } catch (error) {
      setDashboardError(error.message || 'Failed to load dashboard data.');
    } finally {
      setDashboardLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleLogoUpload = async (event) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    try {
      setUploadStatus({
        loading: true,
        success: '',
        error: '',
      });

      const response = await uploadAuthenticLogos(files);

      setUploadStatus({
        loading: false,
        success:
          response?.message || `${files.length} authentic logo file(s) uploaded successfully.`,
        error: '',
      });

      await loadDashboard();
      event.target.value = '';
    } catch (error) {
      setUploadStatus({
        loading: false,
        success: '',
        error: error.message || 'Failed to upload authentic logo files.',
      });
    }
  };

  const onViolationSubmit = async (values) => {
    try {
      setReportFeedback({ success: '', error: '' });
      const response = await reportViolation(values);
      setReportFeedback({
        success: response?.message || 'Violation report submitted successfully.',
        error: '',
      });
      reset(violationDefaultValues);
      await loadDashboard();
    } catch (error) {
      setReportFeedback({
        success: '',
        error: error.message || 'Failed to submit violation report.',
      });
    }
  };

  const stats = dashboard.stats || emptyDashboard.stats;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-[fadeInUp_.5s_ease]">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className={fx.kicker}>Company workspace</p>
            <h1 className={`mt-2 ${fx.titleHero}`}>Brand protection dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Manage authentic logo assets, review suspicious detections, and report counterfeit activity from digital
              channels.
            </p>
          </div>

          <button type="button" onClick={loadDashboard} className={fx.btnGhost}>
            Refresh data
          </button>
        </header>

        <section id="overview" className={fx.dashHero}>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
            Welcome back
          </p>
          <h2 className="mt-2 font-syne text-2xl font-bold text-white sm:text-3xl">
            {user?.name}, your brand integrity workspace is ready
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-300">
            Review suspicious activity, upload authentic references, and track incoming logo-related reports from users
            and monitored channels.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a href="#recent-analyses" className={fx.btnSolid}>
              <ShieldCheck className="h-4 w-4 text-brand-700" />
              Review detections
            </a>

            <a href="#violations" className={fx.btnOutline}>
              Report new violation
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {dashboardError && <div className={fx.alertError}>{dashboardError}</div>}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className={fx.statCard}>
            <p className="text-sm text-zinc-500">Total analyses</p>
            <p className="mt-2 font-syne text-3xl font-bold text-white">
              {dashboardLoading ? '—' : formatCompactNumber(stats.totalAnalyses)}
            </p>
          </div>

          <div className={fx.statCard}>
            <p className="text-sm text-zinc-500">Authentic detections</p>
            <p className="mt-2 font-syne text-3xl font-bold text-emerald-300">
              {dashboardLoading ? '—' : formatCompactNumber(stats.authenticCount)}
            </p>
          </div>

          <div className={fx.statCard}>
            <p className="text-sm text-zinc-500">Suspicious cases</p>
            <p className="mt-2 font-syne text-3xl font-bold text-amber-300">
              {dashboardLoading ? '—' : formatCompactNumber(stats.suspiciousCount)}
            </p>
          </div>

          <div className={fx.statCard}>
            <p className="text-sm text-zinc-500">Reported violations</p>
            <p className="mt-2 font-syne text-3xl font-bold text-rose-300">
              {dashboardLoading ? '—' : formatCompactNumber(stats.violationReports)}
            </p>
          </div>
        </section>

        <section id="recent-analyses" className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
          <article className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-xl">
            <header className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
              <h3 className="font-syne text-lg font-semibold text-white">Recent logo analyses</h3>
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">Company view</span>
            </header>

            {dashboardLoading ? (
              <div className="px-5 py-6 text-sm text-zinc-500">Loading recent analyses...</div>
            ) : (
              <RecentAnalysesTable items={dashboard.recentAnalyses} />
            )}
          </article>

          <article className="space-y-5">
            <AnalyticsOverview stats={stats} />

            <div className={`${fx.cardTight} border-dashed border-cyan-500/20 text-center`}>
              <Building2 className="mx-auto h-6 w-6 text-cyan-500/60" />
              <h4 className="mt-3 text-sm font-semibold text-white">Brand asset library ready for backend storage</h4>
              <p className="mt-1 text-sm text-zinc-500">
                The frontend upload flow is complete. The backend only needs to accept multipart logo files and persist
                them.
              </p>
            </div>
          </article>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <article id="logo-uploads" className={fx.card}>
            <h3 className={fx.titleMd}>Upload authentic logos</h3>
            <p className={`mt-2 ${fx.body}`}>
              Upload original company logos to enrich comparison rules and support verification.
            </p>

            <label
              className={`mt-4 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-cyan-500/25 bg-cyan-500/[0.06] px-4 text-center transition hover:border-fuchsia-400/30 hover:bg-fuchsia-500/[0.06]`}
            >
              <UploadCloud className="h-6 w-6 text-cyan-400" />
              <span className="mt-3 text-sm font-semibold text-white">
                {uploadStatus.loading ? 'Uploading...' : 'Drop authentic logo files or click to upload'}
              </span>
              <span className="mt-1 text-sm text-zinc-500">SVG, PNG, JPG supported</span>
              <input type="file" multiple className="sr-only" onChange={handleLogoUpload} />
            </label>

            {uploadStatus.success && <div className={`mt-4 ${fx.alertSuccess}`}>{uploadStatus.success}</div>}

            {uploadStatus.error && <div className={`mt-4 ${fx.alertError}`}>{uploadStatus.error}</div>}
          </article>

          <article id="violations" className={fx.card}>
            <h3 className={fx.titleMd}>Report a violation</h3>
            <p className={`mt-2 ${fx.body}`}>
              Log a suspicious or fake logo finding and record its source for follow-up.
            </p>

            <form onSubmit={handleSubmit(onViolationSubmit)} className="mt-4 space-y-3">
              <div>
                <input
                  {...register('brand')}
                  placeholder="Brand (Nike, Adidas...)"
                  className={fieldClass}
                />
                {errors.brand && <p className={errText}>{errors.brand.message}</p>}
              </div>

              <div>
                <select {...register('source')} className={fieldClass}>
                  <option value="website">Website</option>
                  <option value="social">Social Media</option>
                  <option value="marketplace">Marketplace</option>
                  <option value="other">Other</option>
                </select>
                {errors.source && <p className={errText}>{errors.source.message}</p>}
              </div>

              <div>
                <input {...register('url')} placeholder="Source URL" className={fieldClass} />
                {errors.url && <p className={errText}>{errors.url.message}</p>}
              </div>

              <div>
                <textarea
                  {...register('notes')}
                  placeholder="Additional notes"
                  rows={4}
                  className={`${fieldClass} ${fx.textarea}`}
                />
                {errors.notes && <p className={errText}>{errors.notes.message}</p>}
              </div>

              <button type="submit" disabled={isSubmitting} className={`w-full ${fx.btnPrimary}`}>
                {isSubmitting ? 'Submitting...' : 'Submit report'}
              </button>
            </form>

            {reportFeedback.success && <div className={`mt-4 ${fx.alertSuccess}`}>{reportFeedback.success}</div>}

            {reportFeedback.error && <div className={`mt-4 ${fx.alertError}`}>{reportFeedback.error}</div>}

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {sources.map((source) => {
                const Icon = source.icon;

                return (
                  <div key={source.title} className={`${fx.panel} p-4`}>
                    <Icon className="h-5 w-5 text-cyan-400" />
                    <p className="mt-3 text-sm font-semibold text-white">{source.title}</p>
                    <p className="mt-1 text-sm text-zinc-500">{source.description}</p>
                  </div>
                );
              })}
            </div>

            <div id="settings" className={`mt-4 rounded-xl border border-dashed border-white/15 p-4`}>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                <BadgeCheck className="h-4 w-4 text-emerald-400" />
                Backend-ready contract
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                This dashboard already expects live stats, recent analyses, logo uploads, and violation submission from
                the backend API.
              </p>
            </div>
          </article>
        </section>
      </div>
    </DashboardLayout>
  );
}
