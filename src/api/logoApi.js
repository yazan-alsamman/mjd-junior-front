import { env } from '../config/env';
import {
  cacheAnalysis,
  cacheAnalyses,
  getCachedAnalysisById,
} from '../lib/analysisStore';
import {
  normalizeAnalysisList,
  normalizeAnalysisRecord,
} from './adapters';
import { apiRequest } from './client';
import { API_ENDPOINTS } from './endpoints';
import * as mockApi from './mockApi';

function ensureArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.results)) return value.results;
  return [];
}

export async function checkLogo(file) {
  if (env.useMockApi) {
    const result = await mockApi.checkLogo(file);
    const normalized = normalizeAnalysisRecord(result);
    cacheAnalysis(normalized);
    return normalized;
  }

  const formData = new FormData();
  formData.append('image', file);

  const response = await apiRequest(API_ENDPOINTS.CHECK_LOGO, {
    method: 'POST',
    body: formData,
  });

  const result = normalizeAnalysisRecord(response.item ?? response);
  cacheAnalysis(result);
  return result;
}

export async function getAnalysisHistory() {
  if (env.useMockApi) {
    const items = await mockApi.getAnalysisHistory();
    const normalized = normalizeAnalysisList(items);
    cacheAnalyses(normalized);
    return normalized;
  }

  const response = await apiRequest(API_ENDPOINTS.ANALYSIS_HISTORY, {
    method: 'GET',
  });

  const rawItems = ensureArray(response);
  const normalizedItems = rawItems.map(normalizeAnalysisRecord);

  cacheAnalyses(normalizedItems);

  return normalizedItems;
}

export async function getAnalysisById(id) {
  if (env.useMockApi) {
    const item = await mockApi.getAnalysisById(id);
    const normalized = normalizeAnalysisRecord(item);
    cacheAnalysis(normalized);
    return normalized;
  }

  try {
    const response = await apiRequest(API_ENDPOINTS.ANALYSIS_DETAILS(id), {
      method: 'GET',
    });

    const item = normalizeAnalysisRecord(response.item ?? response);
    cacheAnalysis(item);
    return item;
  } catch (error) {
    const cachedItem = getCachedAnalysisById(id);

    if (cachedItem) {
      return cachedItem;
    }

    throw error;
  }
}
