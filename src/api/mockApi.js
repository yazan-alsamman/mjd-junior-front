import { brand } from '../config/brand';
import { normalizeDashboard } from './adapters';

const MOCK_DB_KEY = 'verisigil.mock.db';
const NETWORK_DELAY_MS = 700;

function wait(ms = NETWORK_DELAY_MS) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function detectBrandName(fileName = '') {
  const normalizedName = fileName.toLowerCase();
  const knownBrands = ['nike', 'adidas', 'puma', 'zara', 'gucci'];
  const detectedBrand = knownBrands.find((brandName) => normalizedName.includes(brandName));

  if (!detectedBrand) {
    return 'Unknown';
  }

  return detectedBrand.charAt(0).toUpperCase() + detectedBrand.slice(1);
}

function inferStatus(fileName = '') {
  const normalizedName = fileName.toLowerCase();

  if (normalizedName.includes('fake') || normalizedName.includes('copy')) {
    return 'counterfeit';
  }

  if (normalizedName.includes('suspicious') || normalizedName.includes('replica')) {
    return 'suspicious';
  }

  return 'authentic';
}

function buildNotes(status, brandName) {
  if (status === 'counterfeit') {
    return `Multiple visual inconsistencies suggest counterfeit use of the ${brandName} mark.`;
  }

  if (status === 'suspicious') {
    return `The detected ${brandName} mark needs manual review because some features are inconclusive.`;
  }

  return `The detected ${brandName} mark appears consistent with approved references.`;
}

function seedDatabase() {
  return {
    analyses: [
      {
        id: 'ANL-2026-301',
        fileName: 'nike-shoe.jpg',
        status: 'authentic',
        confidence: 94,
        brandName: 'Nike',
        notes: 'The uploaded product image appears consistent with official Nike references.',
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        imageUrl: '',
        sourceType: 'user-upload',
      },
      {
        id: 'ANL-2026-298',
        fileName: 'gucci-bag-copy.png',
        status: 'counterfeit',
        confidence: 89,
        brandName: 'Gucci',
        notes: 'Visual inconsistencies suggest a likely counterfeit logo usage.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        imageUrl: '',
        sourceType: 'marketplace',
      },
      {
        id: 'ANL-2026-290',
        fileName: 'zara-shirt-suspicious.jpg',
        status: 'suspicious',
        confidence: 76,
        brandName: 'Zara',
        notes: 'The uploaded product requires further manual verification.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
        imageUrl: '',
        sourceType: 'website',
      },
    ],
    authenticLogoUploads: [],
    violationReports: [],
  };
}

function readDatabase() {
  const rawValue = window.localStorage.getItem(MOCK_DB_KEY);

  if (!rawValue) {
    const db = seedDatabase();
    window.localStorage.setItem(MOCK_DB_KEY, JSON.stringify(db));
    return db;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    const db = seedDatabase();
    window.localStorage.setItem(MOCK_DB_KEY, JSON.stringify(db));
    return db;
  }
}

function writeDatabase(db) {
  window.localStorage.setItem(MOCK_DB_KEY, JSON.stringify(db));
}

function computeStats(analyses, violationReports) {
  return analyses.reduce(
    (accumulator, item) => {
      accumulator.totalAnalyses += 1;
      if (item.status === 'authentic') accumulator.authenticCount += 1;
      if (item.status === 'suspicious') accumulator.suspiciousCount += 1;
      if (item.status === 'counterfeit') accumulator.counterfeitCount += 1;
      return accumulator;
    },
    {
      totalAnalyses: 0,
      authenticCount: 0,
      suspiciousCount: 0,
      counterfeitCount: 0,
      violationReports: violationReports.length,
    },
  );
}

export async function login(credentials) {
  await wait();

  if (
    credentials.email?.toLowerCase() !== brand.demoCredentials.email ||
    credentials.password !== brand.demoCredentials.password
  ) {
    throw new Error(
      `Invalid credentials. Use ${brand.demoCredentials.email} / ${brand.demoCredentials.password}.`,
    );
  }

  return {
    accessToken: 'mock-access-token-verisigil',
    refreshToken: '',
    rememberMe: Boolean(credentials.rememberMe),
    user: {
      id: 'user-demo-1',
      name: 'Nora Ibrahim',
      role: 'Brand Integrity Lead',
      email: brand.demoCredentials.email,
    },
  };
}

export async function getCurrentUser() {
  await wait(250);

  return {
    id: 'user-demo-1',
    name: 'Nora Ibrahim',
    role: 'Brand Integrity Lead',
    email: brand.demoCredentials.email,
  };
}

export async function logout() {
  await wait(150);
  return { success: true };
}

export async function checkLogo(file) {
  await wait(1100);

  const db = readDatabase();
  const brandName = detectBrandName(file?.name || '');
  const status = inferStatus(file?.name || '');
  const confidenceByStatus = {
    authentic: 94,
    suspicious: 76,
    counterfeit: 89,
  };

  const analysis = {
    id: createId('ANL'),
    fileName: file?.name || 'uploaded-file',
    status,
    confidence: confidenceByStatus[status] || 80,
    brandName,
    notes: buildNotes(status, brandName),
    createdAt: new Date().toISOString(),
    imageUrl: '',
    sourceType: 'user-upload',
  };

  db.analyses.unshift(analysis);
  writeDatabase(db);

  return analysis;
}

export async function getAnalysisHistory() {
  await wait(400);
  const db = readDatabase();
  return db.analyses;
}

export async function getAnalysisById(id) {
  await wait(300);
  const db = readDatabase();
  const match = db.analyses.find((item) => item.id === id);

  if (!match) {
    throw new Error('Analysis not found.');
  }

  return match;
}

export async function getCompanyDashboard() {
  await wait(450);
  const db = readDatabase();

  return normalizeDashboard({
    stats: computeStats(db.analyses, db.violationReports),
    recentAnalyses: db.analyses.slice(0, 5),
  });
}

export async function uploadAuthenticLogos(files) {
  await wait(850);
  const db = readDatabase();

  const uploadedFiles = Array.from(files || []).map((file) => ({
    id: createId('LOGO'),
    fileName: file.name,
    uploadedAt: new Date().toISOString(),
  }));

  db.authenticLogoUploads.unshift(...uploadedFiles);
  writeDatabase(db);

  return {
    success: true,
    count: uploadedFiles.length,
    message: `${uploadedFiles.length} authentic logo file(s) uploaded successfully.`,
  };
}

export async function reportViolation(payload) {
  await wait(700);
  const db = readDatabase();

  const violation = {
    id: createId('VIO'),
    ...payload,
    createdAt: new Date().toISOString(),
  };

  db.violationReports.unshift(violation);
  writeDatabase(db);

  return {
    success: true,
    message: 'Violation report submitted successfully.',
    item: violation,
  };
}
