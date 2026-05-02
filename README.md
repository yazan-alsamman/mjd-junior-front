# Verisigil Frontend

React frontend for Verisigil logo authenticity checks and company brand-protection workflows. It talks only to the Node.js backend; the browser does not call the FastAPI AI service directly.

## Tech Stack

- React 19
- Vite
- React Router
- React Hook Form
- Zod
- Tailwind CSS
- Framer Motion
- Lucide React

## Setup

```powershell
cd C:\Users\mjd\Desktop\mjd-junior-front
npm install
Copy-Item .env.example .env
```

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_USE_MOCK_API=false
VITE_API_TIMEOUT_MS=20000
```

- `VITE_API_BASE_URL` points to the Node backend.
- `VITE_USE_MOCK_API=false` uses the real backend flow.
- `VITE_API_TIMEOUT_MS` controls frontend request timeout handling.

## Run Locally

```powershell
npm run dev
```

Open the Vite URL, usually `http://localhost:5173`.

## Important Backend Endpoints

- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/logout`
- `POST /logos/check`
- `GET /logos/history`
- `GET /logos/:id`
- `GET /company/dashboard`
- `POST /company/logos/upload`
- `POST /company/violations/report`

All paths above are relative to `VITE_API_BASE_URL`.

## Testing Steps

```powershell
npm run lint
npm run build
```

Manual checks:

- Login with a seeded company user.
- Upload an image from `/check`.
- Open `/history` and an analysis details page.
- Open `/dashboard`.
- Upload an authentic company logo.
- Submit a violation report.
- Logout.

## Current Limitations

- Auth tokens are stored in browser storage, not HttpOnly cookies.
- The AI result depends on the backend and FastAPI service being available.
- Mock API mode still exists for development, but real integration should use `VITE_USE_MOCK_API=false`.

## Future Improvements

- Move auth to HttpOnly cookies with refresh-token rotation.
- Add end-to-end tests for the critical user flows.
- Split large production chunks if bundle size becomes a user-facing performance issue.
- Add stronger observability for failed API requests.

See `FRONTEND_HANDOFF_GUIDE.md` for the current API contract expected by the frontend.
