# Verisigil Frontend

Backend-ready React + Vite frontend for logo authenticity verification and company brand-protection workflows.

## Run

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment variables

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_USE_MOCK_API=true
VITE_API_TIMEOUT_MS=20000
```

- Keep `VITE_USE_MOCK_API=true` for local demo mode.
- Change it to `false` when the real backend is available.

## Build

```bash
npm run build
npm run preview
```

## Included backend-ready modules

- Authentication flow with session persistence
- Public logo analysis flow
- Public history + details flow
- Company dashboard loading
- Authentic logo upload flow
- Violation report flow
- API adapters and response normalizers
- Mock API mode for offline development

See `FRONTEND_HANDOFF_GUIDE.md` for the backend contract expected by the frontend.
