import {
  ArrowRight,
  Building2,
  CheckCircle2,
  LockKeyhole,
  ScanSearch,
  Shield,
  UploadCloud,
  UserRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandMark from '../components/brand/BrandMark';
import ResultStateCard from '../components/landing/ResultStateCard';
import ThemeToggle from '../components/common/ThemeToggle';
import { brand } from '../config/brand';

const trustIndicators = [
  'AI + forensic rules validation',
  'Encrypted upload and transit protection',
  'Audit-ready decision trace for every scan',
];

const sampleResults = [
  {
    status: 'authentic',
    confidence: 98,
    description: 'Geometry and vector signatures match known official assets.',
    evidence: ['Canonical spacing matched', 'Color profile verified'],
  },
  {
    status: 'suspicious',
    confidence: 74,
    description: 'Minor manipulation patterns detected around symbol edges.',
    evidence: ['Gradient drift anomaly', 'Glyph kerning inconsistency'],
  },
  {
    status: 'counterfeit',
    confidence: 93,
    description: 'High-probability imitation of protected commercial mark.',
    evidence: ['Trademark similarity overlap', 'Unauthorized style replication'],
  },
];

const supportedBrands = ['Adidas', 'Nike', 'Puma', 'Zara', 'Gucci'];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ink-50 text-ink-900 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-28 top-0 h-72 w-72 rounded-full bg-brand-200/35 blur-3xl" />
        <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-analysis-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-8 animate-[fadeInUp_.45s_ease]">
        <header className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm shadow-ink-950/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <BrandMark to="/" />

            <nav className="flex items-center gap-2">
              <ThemeToggle />

              <Link
                to="/login"
                className="rounded-xl px-3 py-2 text-sm font-medium text-ink-700 transition hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Sign in
              </Link>

              <Link
                to="/check"
                className="inline-flex items-center gap-2 rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:bg-brand-600 dark:hover:bg-brand-700"
              >
                Start Verification
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </nav>
          </div>
        </header>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700 dark:border-brand-800 dark:bg-slate-900 dark:text-brand-300">
              <Shield className="h-3.5 w-3.5" aria-hidden="true" />
              AI Product & Logo Verification
            </p>

            <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-ink-950 dark:text-white sm:text-5xl">
              Verify product logos and protect brand identity in one platform.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-ink-600 dark:text-slate-300">
              {brand.name} helps individuals inspect product logos before they trust
              a product, while companies can monitor suspicious findings, upload
              authentic brand assets, and report logo misuse across digital channels.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/check"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-900/20 transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
              >
                Analyze Logo
                <ScanSearch className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-5 py-3 text-sm font-semibold text-ink-700 transition hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Company Dashboard
                <Building2 className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ul className="grid gap-3 pt-2 sm:grid-cols-3">
              {trustIndicators.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-ink-200 bg-white px-3 py-3 text-sm text-ink-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/80 bg-white/85 p-6 shadow-lg shadow-ink-950/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900 sm:p-7">
            <h2 className="font-display text-xl font-semibold text-ink-950 dark:text-white">
              Secure Product Image Upload
            </h2>
            <p className="mt-2 text-sm text-ink-600 dark:text-slate-300">
              Upload a product image to inspect the visible logo and detect
              possible counterfeit indicators.
            </p>

            <label className="mt-5 flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/40 px-4 text-center transition hover:border-brand-300 hover:bg-brand-50/70 dark:border-brand-700 dark:bg-slate-950">
              <UploadCloud className="h-7 w-7 text-brand-600" aria-hidden="true" />
              <span className="mt-3 text-sm font-semibold text-ink-900 dark:text-white">
                Drop product image here or browse
              </span>
              <span className="mt-1 text-sm text-ink-600 dark:text-slate-300">
                SVG, PNG, JPG up to 10MB
              </span>
              <input type="file" className="sr-only" />
            </label>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-ink-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
              <span className="text-sm text-ink-600 dark:text-slate-300">Data protection</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-800 dark:text-slate-100">
                <LockKeyhole className="h-4 w-4 text-brand-600" aria-hidden="true" />
                AES-256 secured
              </span>
            </div>

            <div className="mt-4 rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
              <p className="text-sm font-semibold text-ink-900 dark:text-white">Supported brands</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {supportedBrands.map((brandName) => (
                  <span
                    key={brandName}
                    className="rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    {brandName}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-2">
          <article className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm shadow-ink-950/5 dark:border-slate-800 dark:bg-slate-900">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 dark:bg-slate-950 dark:text-brand-300">
              <UserRound className="h-3.5 w-3.5" />
              For Individuals
            </div>

            <h3 className="mt-4 font-display text-2xl font-semibold text-ink-950 dark:text-white">
              Check product logos before you trust the item
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-slate-300">
              Upload a product image, inspect the visible logo, and review the
              authenticity result with confidence and notes.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-ink-600 dark:text-slate-300">
              <li className="rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                Upload product image
              </li>
              <li className="rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                Review authenticity result
              </li>
              <li className="rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                Access previous analyses
              </li>
            </ul>

            <Link
              to="/check"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Start User Check
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>

          <article className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm shadow-ink-950/5 dark:border-slate-800 dark:bg-slate-900">
            <div className="inline-flex items-center gap-2 rounded-full bg-analysis-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-analysis-700 dark:bg-slate-950 dark:text-cyan-300">
              <Building2 className="h-3.5 w-3.5" />
              For Companies
            </div>

            <h3 className="mt-4 font-display text-2xl font-semibold text-ink-950 dark:text-white">
              Protect your brand with monitoring and reporting workflows
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-slate-300">
              Upload authentic logo assets, review suspicious detections, and report
              logo misuse from websites, marketplaces, and social media.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-ink-600 dark:text-slate-300">
              <li className="rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                Upload authentic logos
              </li>
              <li className="rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                Review recent detections
              </li>
              <li className="rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                Report violations from digital channels
              </li>
            </ul>

            <Link
              to="/login"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 transition hover:bg-ink-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Sign in as Company
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        </section>

        <section id="sample-report" className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-slate-400">
                Verification Outcomes
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink-950 dark:text-white">
                Transparent verdicts with confidence evidence
              </h2>
            </div>
            <Link
              to="/check"
              className="hidden rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 transition hover:bg-ink-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 lg:inline-flex"
            >
              Run live analysis
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {sampleResults.map((result) => (
              <ResultStateCard key={result.status} {...result} />
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-ink-200 bg-white p-6 shadow-sm shadow-ink-950/5 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-slate-400">
                Trusted Operations
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ink-950 dark:text-white sm:text-3xl">
                Built for both individuals and brand protection teams
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-600 dark:text-slate-300">
                Individuals can verify product logos before purchasing, while
                companies can monitor suspicious activity, manage authentic logo
                assets, and report violations from websites and social media.
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="rounded-xl border border-ink-200 bg-ink-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm font-semibold text-ink-900 dark:text-white">
                  Product logo verification for end users
                </p>
              </li>
              <li className="rounded-xl border border-ink-200 bg-ink-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm font-semibold text-ink-900 dark:text-white">
                  Company dashboards for brand monitoring
                </p>
              </li>
              <li className="rounded-xl border border-ink-200 bg-ink-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm font-semibold text-ink-900 dark:text-white">
                  Violation reporting from web and social media
                </p>
              </li>
              <li className="rounded-xl border border-ink-200 bg-ink-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Frontend-ready for API integration
                </p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}