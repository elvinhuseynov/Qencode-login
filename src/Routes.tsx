import {
  LoginPage,
  HomePage,
  ForgotPasswordPage,
  PasswordSetPage,
} from "@pages";
import Cookies from "js-cookie";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  to?: string;
}

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" index element={<BaseRoute />} />
      <Route path="/login" index element={<LoginPage />} />
      <Route path="/forgot-password" index element={<ForgotPasswordPage />} />
      <Route path="/password-set" index element={<PasswordSetPage />} />
      <Route
        path="/home"
        index
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<BaseRoute />} />
    </Routes>
  </BrowserRouter>
);

const isAuthenticated = () => {
  const token = Cookies.get("accessToken");

  return !!token;
};

const BaseRoute = () => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;

  return <Navigate to="/home" replace />;
};

const ProtectedRoute = ({ children, to }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to={to || "/"} replace />;
  }

  return children;
};
