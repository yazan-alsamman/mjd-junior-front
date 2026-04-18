import { Globe } from 'lucide-react';

export default function SocialLoginButton({ disabled = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm font-medium text-ink-700 shadow-sm shadow-ink-950/5 transition duration-200 hover:-translate-y-0.5 hover:border-ink-300 hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Globe className="h-4 w-4 text-ink-600" aria-hidden="true" />
      Continue with Google
    </button>
  );
}
