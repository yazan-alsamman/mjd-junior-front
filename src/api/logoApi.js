import { env } from '../config/env';
import {
  cacheAnalysis,
  cacheAnalyses,
  getCachedAnalysisById,
  mergeAnalysisLists,
} from '../lib/analysisStore';
import {
  normalizeAnalysisList,
  normalizeAnalysisRecord,
} from './adapters';
import { apiRequest } from './client';
import { API_ENDPOINTS } from './endpoints';
import * as mockApi from './mockApi';

export async function checkLogo(file) {
  if (env.useMockApi) {
    const result = await mockApi.checkLogo(file);
    cacheAnalysis(result);
    return normalizeAnalysisRecord(result);
  }

  const formData = new FormData();
  formData.append('logo', file);

  const response = await apiRequest(API_ENDPOINTS.CHECK_LOGO, {
    method: 'POST',
    body: formData,
    auth: false,
  });

  const result = normalizeAnalysisRecord(response);
  cacheAnalysis(result);
  return result;
}

export async function getAnalysisHistory() {
  if (env.useMockApi) {
    const items = await mockApi.getAnalysisHistory();
    cacheAnalyses(items);
    return mergeAnalysisLists(normalizeAnalysisList(items));
  }

  const response = await apiRequest(API_ENDPOINTS.ANALYSIS_HISTORY, {
    method: 'GET',
    auth: false,
  });

  const items = normalizeAnalysisList(response);
  cacheAnalyses(items);
  return mergeAnalysisLists(items);
}

export async function getAnalysisById(id) {
  if (env.useMockApi) {
    const item = await mockApi.getAnalysisById(id);
    cacheAnalysis(item);
    return normalizeAnalysisRecord(item);
  }

  try {
    const response = await apiRequest(API_ENDPOINTS.ANALYSIS_DETAILS(id), {
      method: 'GET',
      auth: false,
    });

    const item = normalizeAnalysisRecord(response);
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
