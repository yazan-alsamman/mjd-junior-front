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
import ThemeToggle from '../components/common/ThemeToggle';
import { formatCompactNumber } from '../lib/formatters';
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
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-slate-400">
              Company Workspace
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-ink-950 dark:text-white">
              Brand Protection Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-ink-600 dark:text-slate-300">
              Manage authentic logo assets, review suspicious detections, and report
              counterfeit activity from digital channels.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={loadDashboard}
              className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm font-semibold text-ink-700 transition hover:bg-ink-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              Refresh Data
            </button>
          </div>
        </header>

        <section
          id="overview"
          className="rounded-3xl border border-brand-100 bg-gradient-to-r from-brand-700 via-brand-600 to-analysis-600 p-6 text-white shadow-lg shadow-brand-900/20 sm:p-7"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">
            Welcome back
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
            {user?.name}, your brand integrity workspace is ready
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-brand-100">
            Review suspicious activity, upload authentic references, and track incoming
            logo-related reports from users and monitored channels.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="#recent-analyses"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              <ShieldCheck className="h-4 w-4" />
              Review Detections
            </a>

            <a
              href="#violations"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Report New Violation
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {dashboardError && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {dashboardError}
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm shadow-ink-950/5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-ink-500 dark:text-slate-400">Total analyses</p>
            <p className="mt-2 text-3xl font-semibold text-ink-950 dark:text-white">
              {dashboardLoading ? '—' : formatCompactNumber(stats.totalAnalyses)}
            </p>
          </div>

          <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm shadow-ink-950/5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-ink-500 dark:text-slate-400">Authentic detections</p>
            <p className="mt-2 text-3xl font-semibold text-emerald-700">
              {dashboardLoading ? '—' : formatCompactNumber(stats.authenticCount)}
            </p>
          </div>

          <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm shadow-ink-950/5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-ink-500 dark:text-slate-400">Suspicious cases</p>
            <p className="mt-2 text-3xl font-semibold text-amber-700">
              {dashboardLoading ? '—' : formatCompactNumber(stats.suspiciousCount)}
            </p>
          </div>

          <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm shadow-ink-950/5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-ink-500 dark:text-slate-400">Reported violations</p>
            <p className="mt-2 text-3xl font-semibold text-rose-700">
              {dashboardLoading ? '—' : formatCompactNumber(stats.violationReports)}
            </p>
          </div>
        </section>

        <section id="recent-analyses" className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
          <article className="rounded-2xl border border-ink-200 bg-white shadow-sm shadow-ink-950/5 dark:border-slate-800 dark:bg-slate-900">
            <header className="flex items-center justify-between border-b border-ink-200 px-5 py-4 dark:border-slate-800">
              <h3 className="font-display text-lg font-semibold text-ink-950 dark:text-white">
                Recent Logo Analyses
              </h3>
              <span className="text-sm text-ink-500 dark:text-slate-400">Company view</span>
            </header>

            {dashboardLoading ? (
              <div className="px-5 py-6 text-sm text-ink-500 dark:text-slate-400">
                Loading recent analyses...
              </div>
            ) : (
              <RecentAnalysesTable items={dashboard.recentAnalyses} />
            )}
          </article>

          <article className="space-y-5">
            <AnalyticsOverview stats={stats} />

            <div className="rounded-2xl border border-dashed border-ink-300 bg-white p-5 text-center shadow-sm shadow-ink-950/5 dark:border-slate-700 dark:bg-slate-900">
              <Building2 className="mx-auto h-6 w-6 text-ink-400 dark:text-slate-500" />
              <h4 className="mt-3 text-sm font-semibold text-ink-900 dark:text-white">
                Brand asset library ready for backend storage
              </h4>
              <p className="mt-1 text-sm text-ink-600 dark:text-slate-300">
                The frontend upload flow is complete. The backend only needs to accept
                multipart logo files and persist them.
              </p>
            </div>
          </article>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <article
            id="logo-uploads"
            className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm shadow-ink-950/5 dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="font-display text-lg font-semibold text-ink-950 dark:text-white">
              Upload Authentic Logos
            </h3>
            <p className="mt-2 text-sm text-ink-600 dark:text-slate-300">
              Upload original company logos to enrich comparison rules and support
              verification.
            </p>

            <label className="mt-4 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-brand-200 bg-brand-50/35 px-4 text-center transition hover:border-brand-300 hover:bg-brand-50/65 dark:border-brand-700 dark:bg-slate-950">
              <UploadCloud className="h-6 w-6 text-brand-600" />
              <span className="mt-3 text-sm font-semibold text-ink-900 dark:text-white">
                {uploadStatus.loading
                  ? 'Uploading...'
                  : 'Drop authentic logo files or click to upload'}
              </span>
              <span className="mt-1 text-sm text-ink-600 dark:text-slate-300">
                SVG, PNG, JPG supported
              </span>
              <input type="file" multiple className="sr-only" onChange={handleLogoUpload} />
            </label>

            {uploadStatus.success && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                {uploadStatus.success}
              </div>
            )}

            {uploadStatus.error && (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                {uploadStatus.error}
              </div>
            )}
          </article>

          <article
            id="violations"
            className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm shadow-ink-950/5 dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="font-display text-lg font-semibold text-ink-950 dark:text-white">
              Report a Violation
            </h3>
            <p className="mt-2 text-sm text-ink-600 dark:text-slate-300">
              Log a suspicious or fake logo finding and record its source for follow-up.
            </p>

            <form onSubmit={handleSubmit(onViolationSubmit)} className="mt-4 space-y-3">
              <div>
                <input
                  {...register('brand')}
                  placeholder="Brand (Nike, Adidas...)"
                  className="w-full rounded-xl border border-ink-200 px-3 py-2 text-sm outline-none transition focus:border-brand-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
                {errors.brand && (
                  <p className="mt-1 text-xs text-rose-600">{errors.brand.message}</p>
                )}
              </div>

              <div>
                <select
                  {...register('source')}
                  className="w-full rounded-xl border border-ink-200 px-3 py-2 text-sm outline-none transition focus:border-brand-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  <option value="website">Website</option>
                  <option value="social">Social Media</option>
                  <option value="marketplace">Marketplace</option>
                  <option value="other">Other</option>
                </select>
                {errors.source && (
                  <p className="mt-1 text-xs text-rose-600">{errors.source.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('url')}
                  placeholder="Source URL"
                  className="w-full rounded-xl border border-ink-200 px-3 py-2 text-sm outline-none transition focus:border-brand-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
                {errors.url && (
                  <p className="mt-1 text-xs text-rose-600">{errors.url.message}</p>
                )}
              </div>

              <div>
                <textarea
                  {...register('notes')}
                  placeholder="Additional notes"
                  rows="4"
                  className="w-full rounded-xl border border-ink-200 px-3 py-2 text-sm outline-none transition focus:border-brand-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
                {errors.notes && (
                  <p className="mt-1 text-xs text-rose-600">{errors.notes.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </form>

            {reportFeedback.success && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                {reportFeedback.success}
              </div>
            )}

            {reportFeedback.error && (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                {reportFeedback.error}
              </div>
            )}

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {sources.map((source) => {
                const Icon = source.icon;

                return (
                  <div
                    key={source.title}
                    className="rounded-xl border border-ink-200 bg-ink-50 p-4 dark:border-slate-800 dark:bg-slate-950"
                  >
                    <Icon className="h-5 w-5 text-brand-600" />
                    <p className="mt-3 text-sm font-semibold text-ink-900 dark:text-white">
                      {source.title}
                    </p>
                    <p className="mt-1 text-sm text-ink-600 dark:text-slate-300">
                      {source.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div
              id="settings"
              className="mt-4 rounded-xl border border-dashed border-ink-300 p-4 dark:border-slate-700"
            >
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
                <BadgeCheck className="h-4 w-4 text-emerald-600" />
                Backend-ready contract
              </p>
              <p className="mt-1 text-sm text-ink-600 dark:text-slate-300">
                This dashboard already expects live stats, recent analyses, logo uploads, and
                violation submission from the backend API.
              </p>
            </div>
          </article>
        </section>
      </div>
    </DashboardLayout>
  );
}
