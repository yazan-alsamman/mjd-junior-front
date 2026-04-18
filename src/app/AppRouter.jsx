import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/routes/ProtectedRoute';
import PublicOnlyRoute from '../components/routes/PublicOnlyRoute';
import DashboardPage from '../pages/DashboardPage';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import CheckLogoPage from '../pages/CheckLogoPage';
import HistoryPage from '../pages/HistoryPage';
import AnalysisDetailsPage from '../pages/AnalysisDetailsPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/check" element={<CheckLogoPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/history/:id" element={<AnalysisDetailsPage />} />

        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}