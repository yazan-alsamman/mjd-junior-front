import { ArrowLeft, CheckCircle2, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import BrandMark from '../components/brand/BrandMark';
import ThemeToggle from '../components/common/ThemeToggle';
import FuturisticPageShell from '../components/shell/FuturisticPageShell';
import FuturisticTopBar from '../components/shell/FuturisticTopBar';
import { useAuth } from '../context/AuthContext';
import { fx } from '../lib/futureUi';

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
    <FuturisticPageShell>
      <FuturisticTopBar
        start={
          <Link to="/" className={fx.btnGhost}>
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Home
          </Link>
        }
        end={
          <>
            <BrandMark to="/" light compact />
            <ThemeToggle />
          </>
        }
      />

      <div className={`${fx.containerWide} ${fx.mainTop} px-4 sm:px-6`}>
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section
            className={`${fx.card} relative overflow-hidden border-cyan-500/10 bg-gradient-to-br from-zinc-950/90 via-indigo-950/40 to-black`}
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-fuchsia-600/20 blur-3xl" />
            <BrandMark light />

            <div className="mt-8 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/90">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                Secure access
              </span>

              <h1 className="max-w-lg font-syne text-3xl font-bold leading-tight text-white sm:text-4xl">
                Sign in to the trusted logo verification workspace
              </h1>

              <p className="max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                Access analysis timelines, suspicious logo alerts, and brand protection workflows in one secure
                platform.
              </p>
            </div>

            <ul className="mt-10 space-y-4">
              {featureItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-black/30 p-4 backdrop-blur-sm"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/30">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <p className="text-sm text-zinc-300">{item}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-500">
              <LockKeyhole className="h-4 w-4 text-cyan-400/80" />
              Secure session access for your verification workspace.
            </div>
          </section>

          <section className={`${fx.card} border-white/[0.1] bg-black/35`}>
            <header className="mb-7 space-y-2">
              <p className={fx.kicker}>Welcome back</p>
              <h2 className="font-syne text-2xl font-bold text-white sm:text-3xl">Sign in to continue</h2>
              <p className={fx.body}>Use your workspace account to access verification tools.</p>
            </header>

            <LoginForm
              variant="futuristic"
              onLogin={handleLogin}
              onSuccess={() => navigate('/dashboard', { replace: true })}
            />

            <div className={`mt-6 ${fx.divider} pt-5`}>
              <Link to="/" className={fx.linkSubtle}>
                Back to homepage
              </Link>
            </div>
          </section>
        </div>
      </div>
    </FuturisticPageShell>
  );
}
