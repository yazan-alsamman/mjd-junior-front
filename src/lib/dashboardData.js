export const summaryCards = [
  {
    title: 'Analyses This Week',
    value: '1,284',
    delta: '+12.4%',
    trend: 'up',
    hint: 'Compared to last week',
  },
  {
    title: 'Authentic Logos',
    value: '924',
    delta: '72.0%',
    trend: 'neutral',
    hint: 'Of total scanned files',
  },
  {
    title: 'Suspicious Findings',
    value: '243',
    delta: '+4.1%',
    trend: 'up',
    hint: 'Needs manual review',
  },
  {
    title: 'Counterfeit Alerts',
    value: '117',
    delta: '-1.8%',
    trend: 'down',
    hint: 'Escalated to legal team',
  },
];

export const recentAnalyses = [
  {
    id: 'ANL-2026-301',
    brand: 'Axiswear',
    fileName: 'axiswear_primary_logo.svg',
    status: 'authentic',
    confidence: 98,
    scannedAt: '2 minutes ago',
  },
  {
    id: 'ANL-2026-298',
    brand: 'Northsend',
    fileName: 'northsend_badge_alt.png',
    status: 'suspicious',
    confidence: 74,
    scannedAt: '26 minutes ago',
  },
  {
    id: 'ANL-2026-290',
    brand: 'Kvantix',
    fileName: 'kvantix_darkmark.jpg',
    status: 'counterfeit',
    confidence: 93,
    scannedAt: '1 hour ago',
  },
];

export const quickActions = [
  {
    title: 'Upload Logo Batch',
    description: 'Submit multiple brand assets for parallel analysis.',
  },
  {
    title: 'Open Verification API',
    description: 'Generate API keys and automate verification workflows.',
  },
  {
    title: 'Create Watchlist Rule',
    description: 'Track suspicious logo patterns for protected brands.',
  },
];
