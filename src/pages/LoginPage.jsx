import { CheckCircle2, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import BrandMark from '../components/brand/BrandMark';
import { useAuth } from '../context/AuthContext';

const featureItems = [
  'Forensic visual analysis with confidence scoring',
  'Manipulation detection for geometry and color anomalies',
  'Traceable verdict history for audit workflows',
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (values) => {
    await login(values);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink-50 px-4 py-6 sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-200/35 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-analysis-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.12fr_0.88fr]">
        <section className="rounded-3xl border border-white/20 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-900 p-7 text-ink-100 shadow-2xl shadow-ink-950/20 sm:p-10 lg:p-12">
          <BrandMark light />

          <div className="mt-8 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-300/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-100">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Secure access
            </span>

            <h1 className="max-w-lg font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Sign in to the trusted logo verification workspace
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-ink-200 sm:text-base">
              Access analysis timelines, suspicious logo alerts, and brand protection
              workflows in one secure platform.
            </p>
          </div>

          <ul className="mt-10 space-y-4">
            {featureItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-300/20">
                  <CheckCircle2 className="h-4 w-4 text-brand-100" />
                </span>
                <p className="text-sm text-ink-200">{item}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-ink-300">
            <LockKeyhole className="h-4 w-4 text-brand-100" />
            Session persistence and backend-ready token handling are enabled.
          </div>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-ink-950/10 backdrop-blur-xl sm:p-8 lg:p-10">
          <header className="mb-7 space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-500">
              Welcome back
            </p>
            <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
              Sign in to continue
            </h2>
            <p className="text-sm text-ink-600">
              Use your workspace account to access verification tools.
            </p>
          </header>

          <LoginForm
            onLogin={handleLogin}
            onSuccess={() => navigate('/dashboard', { replace: true })}
          />

          <div className="mt-6 border-t border-ink-200 pt-4">
            <Link
              to="/"
              className="text-sm font-semibold text-ink-700 underline decoration-ink-300 underline-offset-4 transition hover:text-brand-700 hover:decoration-brand-400"
            >
              Back to homepage
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
