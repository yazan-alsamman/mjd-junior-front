import { env } from '../config/env';
import { normalizeDashboard } from './adapters';
import { apiRequest } from './client';
import { API_ENDPOINTS } from './endpoints';
import * as mockApi from './mockApi';

export async function getCompanyDashboard() {
  if (env.useMockApi) {
    return mockApi.getCompanyDashboard();
  }

  const response = await apiRequest(API_ENDPOINTS.COMPANY_DASHBOARD);
  return normalizeDashboard(response);
}

export async function uploadAuthenticLogos(files, brandName = 'Default Brand') {
  if (env.useMockApi) {
    return mockApi.uploadAuthenticLogos(files);
  }

  const normalizedFiles = Array.from(files || []);
  if (!normalizedFiles.length) {
    throw new Error('At least one image is required');
  }

  const uploadedItems = [];

  for (const file of normalizedFiles) {
    const formData = new FormData();
    formData.append('brandName', brandName);
    formData.append('image', file);

    const response = await apiRequest(API_ENDPOINTS.UPLOAD_AUTHENTIC_LOGOS, {
      method: 'POST',
      body: formData,
    });

    uploadedItems.push(response.item ?? response);
  }

  return { items: uploadedItems };
}

export async function reportViolation(payload) {
  if (env.useMockApi) {
    return mockApi.reportViolation(payload);
  }

  return apiRequest(API_ENDPOINTS.REPORT_VIOLATION, {
    method: 'POST',
    body: payload,
  });
}