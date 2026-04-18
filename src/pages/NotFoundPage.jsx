import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandMark from '../components/brand/BrandMark';
import FuturisticPageShell from '../components/shell/FuturisticPageShell';
import { fx } from '../lib/futureUi';

export default function NotFoundPage() {
  return (
    <FuturisticPageShell>
      <div className={`${fx.containerMd} flex min-h-screen flex-col items-center justify-center px-4 py-24`}>
        <section className={`${fx.card} w-full max-w-md border-white/10 text-center`}>
          <div className="mb-5 flex justify-center">
            <BrandMark to="/" light compact />
          </div>
          <p className={fx.kicker}>404</p>
          <h1 className="mt-2 font-syne text-3xl font-bold text-white">Signal lost</h1>
          <p className={`mt-3 ${fx.body}`}>The page you are looking for does not exist in this workspace.</p>
          <Link to="/" className={`mt-8 inline-flex ${fx.btnPrimary}`}>
            <ArrowLeft className="h-4 w-4" />
            Go to home
          </Link>
        </section>
      </div>
    </FuturisticPageShell>
  );
}
