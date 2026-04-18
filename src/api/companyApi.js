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

export async function uploadAuthenticLogos(files) {
  if (env.useMockApi) {
    return mockApi.uploadAuthenticLogos(files);
  }

  const formData = new FormData();

  Array.from(files || []).forEach((file) => {
    formData.append('logos', file);
  });

  return apiRequest(API_ENDPOINTS.UPLOAD_AUTHENTIC_LOGOS, {
    method: 'POST',
    body: formData,
  });
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
