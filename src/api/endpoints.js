export const API_ENDPOINTS = {
  AUTH_LOGIN: '/auth/login',
  AUTH_ME: '/auth/me',
  AUTH_LOGOUT: '/auth/logout',
  CHECK_LOGO: '/logos/check',
  ANALYSIS_HISTORY: '/logos/history',
  ANALYSIS_DETAILS: (id) => `/logos/${id}`,
  COMPANY_DASHBOARD: '/company/dashboard',
  UPLOAD_AUTHENTIC_LOGOS: '/company/logos/upload',
  REPORT_VIOLATION: '/company/violations/report',
};
