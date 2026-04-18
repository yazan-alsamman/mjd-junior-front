import { env } from '../config/env';
import { normalizeAuthSession, normalizeUser } from './adapters';
import { apiRequest } from './client';
import { API_ENDPOINTS } from './endpoints';
import * as mockApi from './mockApi';

export async function login(credentials) {
  if (env.useMockApi) {
    return mockApi.login(credentials);
  }

  const response = await apiRequest(API_ENDPOINTS.AUTH_LOGIN, {
    method: 'POST',
    body: {
      email: credentials.email,
      password: credentials.password,
    },
    auth: false,
  });

  return normalizeAuthSession(response, credentials.rememberMe);
}

export async function getCurrentUser() {
  if (env.useMockApi) {
    return mockApi.getCurrentUser();
  }

  const response = await apiRequest(API_ENDPOINTS.AUTH_ME);
  return normalizeUser(response);
}

export async function logout() {
  if (env.useMockApi) {
    return mockApi.logout();
  }

  try {
    return await apiRequest(API_ENDPOINTS.AUTH_LOGOUT, {
      method: 'POST',
    });
  } catch {
    return { success: true };
  }
}
