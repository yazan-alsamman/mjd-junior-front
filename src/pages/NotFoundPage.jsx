import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandMark from '../components/brand/BrandMark';

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink-50 px-4">
      <section className="w-full max-w-md rounded-2xl border border-ink-200 bg-white p-8 text-center shadow-sm shadow-ink-950/5">
        <div className="mb-5 flex justify-center">
          <BrandMark to="/" compact />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
          404
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-ink-950">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-ink-600">
          The page you are looking for does not exist in this workspace.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Go to Home
        </Link>
      </section>
    </main>
  );
}
