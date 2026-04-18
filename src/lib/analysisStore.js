const ANALYSIS_CACHE_KEY = 'verisigil.analysis.cache';

function readCache() {
  try {
    const rawValue = window.sessionStorage.getItem(ANALYSIS_CACHE_KEY);
    return rawValue ? JSON.parse(rawValue) : [];
  } catch {
    return [];
  }
}

function writeCache(items) {
  window.sessionStorage.setItem(ANALYSIS_CACHE_KEY, JSON.stringify(items));
}

export function mergeAnalysisLists(items = []) {
  const cache = readCache();
  const mergedMap = new Map();

  [...items, ...cache].forEach((item) => {
    if (!item?.id) return;
    mergedMap.set(item.id, item);
  });

  return Array.from(mergedMap.values()).sort((firstItem, secondItem) => {
    const firstTimestamp = new Date(firstItem.createdAt || 0).getTime();
    const secondTimestamp = new Date(secondItem.createdAt || 0).getTime();
    return secondTimestamp - firstTimestamp;
  });
}

export function cacheAnalysis(item) {
  if (!item?.id) return;
  const nextItems = mergeAnalysisLists([item]);
  writeCache(nextItems);
}

export function cacheAnalyses(items) {
  writeCache(mergeAnalysisLists(items));
}

export function getCachedAnalysisById(id) {
  return readCache().find((item) => item.id === id) || null;
}

export function clearAnalysisCache() {
  window.sessionStorage.removeItem(ANALYSIS_CACHE_KEY);
}
