import { formatStatusLabel } from '../lib/formatters';

function unwrapData(payload) {
  if (payload && typeof payload === 'object' && 'data' in payload && payload.data != null) {
    return payload.data;
  }

  return payload;
}

function ensureNumber(value, fallback = 0) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
}

export function normalizeStatus(value) {
  const normalizedValue = String(value || '')
    .trim()
    .toLowerCase();

  const aliases = {
    authentic: 'authentic',
    original: 'authentic',
    verified: 'authentic',
    valid: 'authentic',
    suspicious: 'suspicious',
    manipulated: 'suspicious',
    review: 'suspicious',
    counterfeit: 'counterfeit',
    fake: 'counterfeit',
    fraudulent: 'counterfeit',
    no_logo_detected: 'unknown',
    error: 'unknown',
  };

  return aliases[normalizedValue] || 'unknown';
}

export function normalizeUser(payload) {
  const data = unwrapData(payload) || {};
  const user = data.user || data.profile || data;

  return {
    id: user.id || user.userId || user._id || 'user-unknown',
    name: user.name || user.fullName || user.displayName || 'Unknown User',
    email: user.email || '',
    role: user.role || user.jobTitle || 'Member',
    companyName: user.companyName || '',
    isActive: Boolean(user.isActive ?? true),
  };
}

export function normalizeAuthSession(payload, rememberMe = false) {
  const data = unwrapData(payload) || {};

  return {
    accessToken: data.accessToken || data.token || data.jwt || data.access_token || '',
    refreshToken: data.refreshToken || data.refresh_token || '',
    rememberMe: Boolean(rememberMe),
    user: normalizeUser(data.user ? { data: data.user } : data),
  };
}

export function normalizeAnalysisRecord(payload = {}) {
  const data = unwrapData(payload) || {};
  const status = normalizeStatus(data.status || data.label || data.verdict);

  return {
    id: String(data.id || data.analysisId || data._id || `analysis-${Date.now()}`),
    fileName:
      data.fileName ||
      data.filename ||
      data.sourceFileName ||
      data.originalName ||
      data.originalImagePath?.split?.('\\').pop?.() ||
      data.originalImagePath?.split?.('/')?.pop?.() ||
      'Uploaded file',
    status,
    statusLabel: data.statusLabel || formatStatusLabel(status),
    confidence: ensureNumber(
      data.confidence || data.score || data.probability || data.matchScore,
      0,
    ),
    brandName: data.brandName || data.brand || data.detectedBrand || data.company || 'Unknown',
    notes: data.notes || data.reason || data.description || data.summary || '',
    createdAt:
      data.createdAt ||
      data.created_at ||
      data.scannedAt ||
      data.timestamp ||
      new Date().toISOString(),
    imageUrl:
      data.imageUrl ||
      data.previewUrl ||
      data.sourceImageUrl ||
      data.logoUrl ||
      data.originalImagePath ||
      '',
    sourceType: data.sourceType || data.source || data.channel || 'user-upload',
    sourceUrl: data.sourceUrl || '',
    similarityScore: ensureNumber(data.similarityScore, 0),
    originalImagePath: data.originalImagePath || '',
    croppedLogoPath: data.croppedLogoPath || '',
    raw: data,
  };
}

export function normalizeAnalysisList(payload) {
  const data = unwrapData(payload);

  if (Array.isArray(data)) {
    return data.map(normalizeAnalysisRecord);
  }

  if (Array.isArray(data?.items)) {
    return data.items.map(normalizeAnalysisRecord);
  }

  if (Array.isArray(data?.results)) {
    return data.results.map(normalizeAnalysisRecord);
  }

  return [];
}

function normalizeReferenceLogo(item = {}) {
  return {
    id: item.id || item._id || '',
    userId: item.userId || '',
    brandName: item.brandName || item.brand || 'Unknown',
    imagePath: item.imagePath || item.imageUrl || '',
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
  };
}

function normalizeReport(item = {}) {
  return {
    id: item.id || item._id || '',
    userId: item.userId || '',
    analysisId: item.analysisId || null,
    reportType: item.reportType || '',
    description: item.description || '',
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
  };
}

export function normalizeDashboard(payload) {
  const data = unwrapData(payload) || {};
  const stats = data.stats || data.overview || {};

  return {
    stats: {
      totalAnalyses: ensureNumber(stats.totalAnalyses || stats.total || stats.analysesCount),
      authenticCount: ensureNumber(stats.authenticCount || stats.authentic || stats.verified),
      suspiciousCount: ensureNumber(stats.suspiciousCount || stats.suspicious || stats.review),
      counterfeitCount: ensureNumber(stats.counterfeitCount || stats.counterfeit || stats.fake),
      violationReports: ensureNumber(
        stats.violationReports ||
          stats.reportedViolations ||
          stats.violations ||
          data.recentReports?.length,
      ),
    },
    recentAnalyses: normalizeAnalysisList(data.recentAnalyses || data.recent || data.latest || []),
    referenceLogos: Array.isArray(data.referenceLogos)
      ? data.referenceLogos.map(normalizeReferenceLogo)
      : [],
    recentReports: Array.isArray(data.recentReports)
      ? data.recentReports.map(normalizeReport)
      : [],
  };
}