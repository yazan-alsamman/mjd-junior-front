# Verisigil Frontend Handoff Guide

This frontend is now prepared to work in two modes without changing the source code again:

1. **Mock mode** for immediate local demos.
2. **Real backend mode** by changing environment variables only.

## What was fixed

- Fixed `npm run build` so it now builds successfully.
- Fixed ESLint configuration for a JavaScript/JSX React project.
- Replaced mock auth logic with a backend-ready auth flow.
- Added a robust fetch client with:
  - `Authorization: Bearer <token>` support
  - `X-Guest-Token` support for public history tracking
  - timeout handling
  - normalized API errors
- Added environment configuration:
  - `VITE_API_BASE_URL`
  - `VITE_USE_MOCK_API`
  - `VITE_API_TIMEOUT_MS`
- Unified all analysis data into one canonical frontend shape:
  - `status`
  - `statusLabel`
  - `brandName`
  - `confidence`
  - `createdAt`
  - `sourceType`
- Connected the flow:
  - `/check` -> analyze
  - analysis result cached
  - `/history` reflects new analyses
  - `/history/:id` opens details
- Replaced hardcoded dashboard counters with backend-ready dashboard loading.
- Replaced raw violation form handling with `react-hook-form + zod`.
- Added a full mock API adapter so the frontend keeps working before the backend is delivered.

## How to run locally now

```bash
npm install
cp .env.example .env
npm run dev
```

## How to switch to the real backend later

In `.env`:

```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_USE_MOCK_API=false
VITE_API_TIMEOUT_MS=20000
```

Then restart the dev server.

## Backend contract the frontend now expects

### Authentication
- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/logout`

`POST /auth/login` should return something compatible with:

```json
{
  "accessToken": "jwt-token",
  "refreshToken": "optional-refresh-token",
  "user": {
    "id": "user_1",
    "name": "Nora Ibrahim",
    "email": "demo@verisigil.com",
    "role": "Brand Integrity Lead"
  }
}
```

### Public analysis flow
- `POST /logos/check`
- `GET /logos/history`
- `GET /logos/:id`

The frontend sends `X-Guest-Token` on public requests so the backend can associate anonymous history with the same browser.

`POST /logos/check` should accept `multipart/form-data` with field name:
- `image`

A compatible analysis response shape is:

```json
{
  "id": "ANL-1001",
  "fileName": "nike-shoe.jpg",
  "status": "authentic",
  "confidence": 94,
  "brandName": "Nike",
  "notes": "The mark appears consistent with approved references.",
  "createdAt": "2026-04-17T15:30:00.000Z",
  "imageUrl": "",
  "sourceType": "user-upload"
}
```

### Dashboard
- `GET /company/dashboard`
- `POST /company/logos/upload`
- `POST /company/violations/report`

A compatible dashboard response shape is:

```json
{
  "stats": {
    "totalAnalyses": 1284,
    "authenticCount": 842,
    "suspiciousCount": 261,
    "counterfeitCount": 181,
    "violationReports": 52
  },
  "recentAnalyses": [
    {
      "id": "ANL-1001",
      "fileName": "nike-shoe.jpg",
      "status": "authentic",
      "confidence": 94,
      "brandName": "Nike",
      "notes": "...",
      "createdAt": "2026-04-17T15:30:00.000Z",
      "sourceType": "website"
    }
  ]
}
```

### Upload authentic logos
`POST /company/logos/upload` accepts `multipart/form-data` with:
- `brandName`
- `image`

### Report violation
`POST /company/violations/report` accepts JSON:

```json
{
  "analysisId": null,
  "reportType": "WEBSITE",
  "description": "Brand: Nike | URL: https://example.com/item/123 | Notes: Suspicious logo distortion"
}
```

## Important note

The frontend is now backend-ready **as long as the backend follows this contract**.
If the backend chooses different endpoint names or completely different response keys, the frontend would still need adapter changes.
