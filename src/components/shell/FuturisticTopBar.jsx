/**
 * Fixed glass command bar for inner pages (non-landing).
 * @param {React.ReactNode} start — left cluster (back links, titles)
 * @param {React.ReactNode} end — right cluster (secondary actions, CTAs)
 */
export default function FuturisticTopBar({ start, end }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-black/50 px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_24px_80px_-24px_rgba(99,102,241,0.28)] backdrop-blur-xl">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">{start}</div>
        <div className="flex flex-wrap items-center justify-end gap-2">{end}</div>
      </div>
    </header>
  );
}
