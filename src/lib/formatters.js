const STATUS_LABELS = {
  authentic: 'Authentic',
  suspicious: 'Suspicious',
  counterfeit: 'Counterfeit',
  unknown: 'Unknown',
};

export function formatStatusLabel(status) {
  return STATUS_LABELS[status] || STATUS_LABELS.unknown;
}

export function formatDateTime(value) {
  if (!value) return '—';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export function formatCompactNumber(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return '0';
  }

  return new Intl.NumberFormat(undefined, {
    notation: numericValue >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(numericValue);
}

export function formatPercentage(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? `${Math.round(numericValue)}%` : '0%';
}

export function formatFileSize(bytes) {
  const numericValue = Number(bytes);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return '0 MB';
  }

  return `${(numericValue / (1024 * 1024)).toFixed(2)} MB`;
}
