/**
 * Shared Tailwind class fragments for the futuristic neon UI (dark-first).
 */

export const fx = {
  pageRoot: 'dark relative min-h-screen overflow-x-hidden bg-[#030308] text-zinc-100',

  container: 'relative z-10 mx-auto w-full max-w-[1400px]',
  containerMd: 'relative z-10 mx-auto w-full max-w-4xl',
  containerNarrow: 'relative z-10 mx-auto w-full max-w-5xl',
  containerWide: 'relative z-10 mx-auto w-full max-w-6xl',

  /** Padding below fixed FuturisticTopBar */
  mainTop: 'pt-24 pb-16 sm:pt-28',

  card: 'rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-xl sm:p-8',
  cardTight: 'rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-md',
  panel: 'rounded-2xl border border-white/[0.06] bg-black/35',

  kicker: 'font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/85',
  titleHero: 'mt-2 font-syne text-3xl font-bold leading-[1.05] text-white sm:text-4xl lg:text-5xl',
  titleLg: 'font-syne text-2xl font-bold text-white sm:text-3xl',
  titleMd: 'font-syne text-lg font-semibold text-white sm:text-xl',
  body: 'text-sm leading-relaxed text-zinc-400',
  bodyMuted: 'text-xs text-zinc-500',

  linkSubtle: 'text-sm font-semibold text-cyan-300/90 underline decoration-cyan-500/40 underline-offset-4 hover:text-cyan-200',

  btnGhost:
    'inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40',
  btnPrimary:
    'inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_32px_-8px_rgba(168,85,247,0.55)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 disabled:cursor-not-allowed disabled:opacity-60',
  btnOutline:
    'inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.07]',
  btnSolid:
    'inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_-8px_rgba(255,255,255,0.35)] transition hover:bg-zinc-100',
  btnDangerGhost:
    'inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-zinc-300 transition hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-200',

  input:
    'w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/45 focus:ring-2 focus:ring-cyan-500/20',
  textarea: 'min-h-[100px] resize-y',

  dropzone:
    'flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-cyan-500/25 bg-cyan-500/[0.06] px-5 text-center transition hover:border-fuchsia-400/35 hover:bg-fuchsia-500/[0.06]',

  statCard:
    'rounded-2xl border border-white/[0.08] bg-black/30 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-sm',

  dashHero:
    'rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-950/90 via-fuchsia-950/55 to-cyan-950/45 p-6 shadow-[0_0_60px_-20px_rgba(99,102,241,0.45)] sm:p-8',

  tableHead: 'text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500',
  tableRow: 'border-t border-white/[0.06] text-sm text-zinc-300',

  alertError: 'rounded-2xl border border-rose-500/35 bg-rose-950/40 px-4 py-3 text-sm text-rose-100',
  alertSuccess: 'rounded-2xl border border-emerald-500/35 bg-emerald-950/35 px-4 py-3 text-sm text-emerald-100',
  alertInfo: 'rounded-2xl border border-cyan-500/30 bg-cyan-950/30 px-4 py-3 text-sm text-cyan-100',

  statusAuthentic: 'bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/35',
  statusSuspicious: 'bg-amber-500/15 text-amber-100 ring-1 ring-amber-400/35',
  statusCounterfeit: 'bg-rose-500/15 text-rose-100 ring-1 ring-rose-400/35',
  statusUnknown: 'bg-zinc-600/20 text-zinc-200 ring-1 ring-zinc-500/30',

  divider: 'border-t border-white/10',
};

const statusMap = {
  authentic: fx.statusAuthentic,
  suspicious: fx.statusSuspicious,
  counterfeit: fx.statusCounterfeit,
  unknown: fx.statusUnknown,
};

export function fxStatusBadge(status) {
  const c = statusMap[status] || statusMap.unknown;
  return `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${c}`;
}
