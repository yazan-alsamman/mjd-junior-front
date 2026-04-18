import { env } from '../config/env';
import { getGuestToken } from '../lib/guest';

let accessToken = '';
let unauthorizedHandler = null;

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

function buildUrl(endpoint, query) {
  const baseUrl = env.apiBaseUrl.replace(/\/$/, '');
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = new URL(`${baseUrl}${normalizedEndpoint}`);

  if (query && typeof query === 'object') {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;
      url.searchParams.set(key, value);
    });
  }

  return url.toString();
}

function extractMessage(payload) {
  if (!payload) return 'Request failed.';
  if (typeof payload === 'string') return payload;

  return (
    payload.message ||
    payload.error ||
    payload.details ||
    payload.data?.message ||
    'Request failed.'
  );
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
}

export function setAccessToken(token) {
  accessToken = token || '';
}

export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler;
}

export async function apiRequest(
  endpoint,
  { method = 'GET', headers = {}, body, query, timeoutMs = env.apiTimeoutMs, auth = true } = {},
) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  const requestHeaders = new Headers(headers);
  const requestBodyIsFormData = body instanceof FormData;

  requestHeaders.set('Accept', 'application/json');
  requestHeaders.set('X-Guest-Token', getGuestToken());

  if (auth && accessToken) {
    requestHeaders.set('Authorization', `Bearer ${accessToken}`);
  }

  if (body && !requestBodyIsFormData && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  try {
    const response = await fetch(buildUrl(endpoint, query), {
      method,
      headers: requestHeaders,
      body: body
        ? requestBodyIsFormData
          ? body
          : JSON.stringify(body)
        : undefined,
      signal: controller.signal,
      credentials: 'include',
    });

    const data = await parseResponse(response);

    if (!response.ok) {
      if (response.status === 401 && typeof unauthorizedHandler === 'function') {
        unauthorizedHandler();
      }

      throw new ApiError(extractMessage(data), response.status, data);
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new ApiError('The request timed out. Please try again.', 408, null);
    }

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(error.message || 'A network error occurred.', 0, null);
  } finally {
    window.clearTimeout(timeoutId);
  }
}
