import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../components/layout/DashboardLayout.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { Landing } from "../pages/Landing.jsx";
import { Login } from "../pages/Login.jsx";
import { Register } from "../pages/Register.jsx";
import { ForgotPassword } from "../pages/ForgotPassword.jsx";
import { ResetPassword } from "../pages/ResetPassword.jsx";
import { Dashboard } from "../pages/Dashboard.jsx";
import { Upload } from "../pages/Upload.jsx";
import { FileHistory } from "../pages/FileHistory.jsx";
import { NotFound } from "../pages/NotFound.jsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<Upload />} />
          <Route path="history" element={<FileHistory />} />
        </Route>
      </Route>
      <Route path="/dashboard" element={<Navigate to="/app" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
