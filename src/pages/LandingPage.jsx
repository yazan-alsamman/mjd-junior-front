import FutureAbout from '../components/landing/future/FutureAbout';
import FutureBackground from '../components/landing/future/FutureBackground';
import FutureCTA from '../components/landing/future/FutureCTA';
import FutureFeatures from '../components/landing/future/FutureFeatures';
import FutureFooter from '../components/landing/future/FutureFooter';
import FutureHero from '../components/landing/future/FutureHero';
import FutureNav from '../components/landing/future/FutureNav';

/**
 * Premium futuristic landing: asymmetric layout, Framer Motion reveals,
 * pointer-driven hero glass, bento features, scroll-linked ledger, neon CTA.
 */
export default function LandingPage() {
  return (
    <div className="dark relative min-h-screen overflow-x-hidden bg-[#030308] text-zinc-100">
      <FutureBackground />
      <FutureNav />
      <main className="relative">
        <FutureHero />
        <FutureFeatures />
        <FutureAbout />
        <FutureCTA />
      </main>
      <FutureFooter />
    </div>
  );
}
