import { Globe } from 'lucide-react';

const baseDefault =
  'inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm font-medium text-ink-700 shadow-sm shadow-ink-950/5 transition duration-200 hover:-translate-y-0.5 hover:border-ink-300 hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const baseFuturistic =
  'inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm font-medium text-zinc-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-60';

export default function SocialLoginButton({ disabled = false, onClick, variant = 'default' }) {
  const isFx = variant === 'futuristic';
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={isFx ? baseFuturistic : baseDefault}
    >
      <Globe className={`h-4 w-4 ${isFx ? 'text-cyan-400/90' : 'text-ink-600'}`} aria-hidden="true" />
      Continue with Google
    </button>
  );
}
