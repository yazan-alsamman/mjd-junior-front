import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ImageIcon,
  ScanSearch,
  ShieldCheck,
  UploadCloud,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { checkLogo } from '../api/logoApi';
import ThemeToggle from '../components/common/ThemeToggle';
import AnalysisResultCard from '../components/logo/AnalysisResultCard';
import { formatFileSize } from '../lib/formatters';
import { validateImageFile } from '../lib/validation';

export default function CheckLogoPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const fileDetails = useMemo(() => {
    if (!selectedFile) return null;

    return {
      name: selectedFile.name,
      size: formatFileSize(selectedFile.size),
      type: selectedFile.type || 'Unknown file type',
    };
  }, [selectedFile]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    setError('');
    setResult(null);
    setSuccessMessage('');

    if (!file) {
      return;
    }

    const validationMessage = validateImageFile(file);

    if (validationMessage) {
      setSelectedFile(null);
      setPreviewUrl('');
      setError(validationMessage);
      return;
    }

    setSelectedFile(file);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setResult(null);
    setError('');
    setSuccessMessage('');

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl('');
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please choose a product image before starting the analysis.');
      setSuccessMessage('');
      return;
    }

    try {
      setError('');
      setIsAnalyzing(true);
      setResult(null);
      setSuccessMessage('');

      const data = await checkLogo(selectedFile);

      setResult(data);
      setSuccessMessage('Analysis completed successfully and was added to history.');
    } catch (err) {
      setError(err.message || 'Something went wrong while analyzing the uploaded image.');
      setSuccessMessage('');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-ink-50 px-4 py-6 text-ink-900 transition-colors sm:px-8 sm:py-10 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl animate-[fadeInUp_.45s_ease]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 transition hover:bg-ink-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to homepage
          </Link>

          <ThemeToggle />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm shadow-ink-950/5 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-slate-400">
              Product Logo Check
            </p>

            <h1 className="mt-2 font-display text-3xl font-semibold text-ink-950 dark:text-white">
              Upload a product image and inspect the visible logo
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600 dark:text-slate-300">
              This page is designed for individual users. Upload a product image, and the
              system will inspect the visible logo to detect whether it appears authentic,
              suspicious, or counterfeit.
            </p>

            <div className="mt-5 rounded-2xl border border-brand-100 bg-brand-50/70 p-4 dark:border-brand-800 dark:bg-slate-950">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
                <ShieldCheck className="h-4 w-4 text-brand-600" />
                Supported brands
              </p>
              <p className="mt-2 text-sm text-ink-600 dark:text-slate-300">
                Adidas, Nike, Puma, Zara, Gucci
              </p>
            </div>

            <label className="mt-6 flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/40 px-5 text-center transition hover:border-brand-300 hover:bg-brand-50/70 dark:border-brand-700 dark:bg-slate-950">
              <UploadCloud className="h-8 w-8 text-brand-600" />
              <span className="mt-3 text-base font-semibold text-ink-900 dark:text-white">
                Drop product image here or click to browse
              </span>
              <span className="mt-2 text-sm text-ink-600 dark:text-slate-300">
                Supported formats: SVG, PNG, JPG — up to 10MB
              </span>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>

            {error && (
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                {successMessage}
              </div>
            )}

            {fileDetails && (
              <div className="mt-5 rounded-2xl border border-ink-200 bg-ink-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-ink-900 dark:text-white">
                      {fileDetails.name}
                    </p>
                    <p className="mt-1 text-sm text-ink-600 dark:text-slate-300">
                      {fileDetails.type} • {fileDetails.size}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-700 transition hover:bg-ink-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                  >
                    <X className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !selectedFile}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <ScanSearch className="h-4 w-4" />
                {isAnalyzing ? 'Analyzing...' : 'Analyze Logo'}
              </button>

              <Link
                to="/history"
                className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm font-semibold text-ink-700 transition hover:bg-ink-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              >
                View History
              </Link>

              {result?.id && (
                <Link
                  to={`/history/${result.id}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-100 dark:border-brand-700 dark:bg-slate-950 dark:text-brand-300"
                >
                  Open Details
                </Link>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm shadow-ink-950/5 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-ink-950 dark:text-white">
              Preview & Result
            </h2>
            <p className="mt-2 text-sm text-ink-600 dark:text-slate-300">
              Your uploaded product image and the authenticity result will appear here.
            </p>

            <div className="mt-6 rounded-2xl border border-ink-200 bg-ink-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-ink-300 bg-white dark:border-slate-700 dark:bg-slate-900">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Uploaded product preview"
                    className="max-h-64 w-auto object-contain"
                  />
                ) : (
                  <div className="text-center text-ink-500 dark:text-slate-400">
                    <ImageIcon className="mx-auto h-8 w-8" />
                    <p className="mt-3 text-sm font-medium">No product image selected yet</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-ink-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              {!result && !isAnalyzing && (
                <div className="rounded-xl border border-dashed border-ink-300 p-4 text-sm text-ink-600 dark:border-slate-700 dark:text-slate-300">
                  Run an analysis to see the final verdict, confidence score, detected brand,
                  and notes.
                </div>
              )}

              {isAnalyzing && (
                <div className="rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-800 dark:border-brand-800 dark:bg-slate-950 dark:text-brand-300">
                  We are analyzing the uploaded image now...
                </div>
              )}

              {result && <AnalysisResultCard result={result} />}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
