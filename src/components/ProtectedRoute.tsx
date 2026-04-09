// INTEGRATION SPECIALIST AGENT — Route guard
// Usage: wrap any route element with <ProtectedRoute> or <ProtectedRoute adminOnly>
// Redirects → /auth if unauthenticated; → / if not admin (when adminOnly=true)

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  children: React.ReactNode;
  adminOnly?: boolean;
}

// Set VITE_ADMIN_EMAIL in .env to restrict admin access to one email
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL ?? "";

export default function ProtectedRoute({ children, adminOnly = false }: Props) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <span className="font-orbitron text-[#8B00FF] text-xs tracking-widest animate-pulse">LOADING...</span>
      </div>
    );
  }

  // Not logged in → /auth, preserving destination for redirect-back
  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />;

  // Logged in but not the admin email → back to home
  if (adminOnly && ADMIN_EMAIL && user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
