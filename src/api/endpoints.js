export const API_ENDPOINTS = {
  AUTH_LOGIN: '/auth/login',
  AUTH_ME: '/auth/me',
  AUTH_LOGOUT: '/auth/logout',
  CHECK_LOGO: '/logos/check',
  ANALYSIS_HISTORY: '/logos/history',
  ANALYSIS_DETAILS: (id) => `/logos/${id}`,
  COMPANY_DASHBOARD: '/company/dashboard',
  COMPANY_CRAWLER_RESULTS: '/company/results',
  COMPANY_CRAWLER_RESULT_DETAILS: (id) => `/company/results/${id}`,
  COMPANY_GOOGLE_SCAN: '/company/scans/google',
  UPLOAD_AUTHENTIC_LOGOS: '/company/logos/upload',
  REPORT_VIOLATION: '/company/violations/report',
};
