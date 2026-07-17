import { Routes, Route, Navigate } from "react-router-dom";

import UserPage from "./pages/user/UserPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminLogin from "./pages/admin/AdminLogin";

import ProtectedRoute from "./utils/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* User */}

      <Route
        path="/"
        element={<UserPage />}
      />

      {/* Admin Login */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* Protected Admin */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      {/* 404 */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}