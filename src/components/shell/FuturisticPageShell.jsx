import FutureBackground from '../landing/future/FutureBackground';

/** Full-page void + animated backdrop (matches landing system). */
export default function FuturisticPageShell({ children, className = '' }) {
  return (
    <div className={`dark relative min-h-screen overflow-x-hidden bg-[#030308] text-zinc-100 ${className}`}>
      <FutureBackground />
      {children}
    </div>
  );
}
