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
import FuturisticPageShell from '../components/shell/FuturisticPageShell';
import FuturisticTopBar from '../components/shell/FuturisticTopBar';
import { formatFileSize } from '../lib/formatters';
import { fx } from '../lib/futureUi';
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
            <ThemeToggle />
            <Link to="/history" className={fx.btnOutline}>
              History
            </Link>
          </>
        }
      />

      <div className={`${fx.containerWide} ${fx.mainTop} px-4 sm:px-6`}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className={fx.card}>
            <p className={fx.kicker}>Product logo check</p>

            <h1 className={fx.titleHero}>Upload a product image and inspect the visible logo</h1>

            <p className={`mt-4 max-w-2xl ${fx.body}`}>
              This flow is for individual users. Upload a product image and the system will inspect the visible logo to
              detect whether it appears authentic, suspicious, or counterfeit.
            </p>

            <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.06] p-4">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                <ShieldCheck className="h-4 w-4 text-cyan-400" aria-hidden />
                Supported brands
              </p>
              <p className="mt-2 text-sm text-zinc-400">Adidas, Nike, Puma, Zara, Gucci</p>
            </div>

            <label className={`mt-6 ${fx.dropzone}`}>
              <UploadCloud className="h-8 w-8 text-cyan-400" aria-hidden />
              <span className="mt-3 text-base font-semibold text-white">Drop product image here or click to browse</span>
              <span className="mt-2 text-sm text-zinc-500">Supported formats: SVG, PNG, JPG — up to 10MB</span>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>

            {error && (
              <div className={`mt-4 flex items-start gap-3 ${fx.alertError}`}>
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMessage && <div className={`mt-4 ${fx.alertSuccess}`}>{successMessage}</div>}

            {fileDetails && (
              <div className={`mt-5 ${fx.panel} p-4`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{fileDetails.name}</p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {fileDetails.type} • {fileDetails.size}
                    </p>
                  </div>

                  <button type="button" onClick={handleRemoveFile} className={fx.btnDangerGhost}>
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
                className={fx.btnPrimary}
              >
                <ScanSearch className="h-4 w-4" />
                {isAnalyzing ? 'Analyzing...' : 'Analyze Logo'}
              </button>

              <Link to="/history" className={fx.btnGhost}>
                View History
              </Link>

              {result?.id && (
                <Link to={`/history/${result.id}`} className={fx.btnOutline}>
                  Open Details
                </Link>
              )}
            </div>
          </section>

          <section className={fx.card}>
            <h2 className={fx.titleMd}>Preview &amp; result</h2>
            <p className={`mt-2 ${fx.body}`}>
              Your uploaded product image and the authenticity result will appear here.
            </p>

            <div className={`mt-6 ${fx.panel} p-4`}>
              <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/15 bg-black/40">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Uploaded product preview"
                    className="max-h-64 w-auto object-contain"
                  />
                ) : (
                  <div className="text-center text-zinc-500">
                    <ImageIcon className="mx-auto h-8 w-8 text-zinc-600" />
                    <p className="mt-3 text-sm font-medium text-zinc-400">No product image selected yet</p>
                  </div>
                )}
              </div>
            </div>

            <div className={`mt-6 ${fx.panel} p-5`}>
              {!result && !isAnalyzing && (
                <div className="rounded-xl border border-dashed border-white/15 p-4 text-sm text-zinc-500">
                  Run an analysis to see the final verdict, confidence score, detected brand, and notes.
                </div>
              )}

              {isAnalyzing && (
                <div className="rounded-xl border border-cyan-500/25 bg-cyan-950/25 p-4 text-sm text-cyan-100">
                  We are analyzing the uploaded image now...
                </div>
              )}

              {result && <AnalysisResultCard result={result} />}
            </div>
          </section>
        </div>
      </div>
    </FuturisticPageShell>
  );
}
