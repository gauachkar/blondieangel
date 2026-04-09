// INTEGRATION SPECIALIST AGENT — Route config
// Added: /auth, /portal (protected), /admin
// All existing routes preserved intact

import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import AuthPage from "../pages/auth/page";
import PortalPage from "../pages/portal/page";
import AdminPage from "../pages/admin/page";
import ProtectedRoute from "../components/ProtectedRoute";

const routes: RouteObject[] = [
  // ── Public ──
  { path: "/", element: <Home /> },
  { path: "/auth", element: <AuthPage /> },

  // ── Protected: member portal (requires login) ──
  {
    path: "/portal",
    element: (
      <ProtectedRoute>
        <PortalPage />
      </ProtectedRoute>
    ),
  },

  // ── Admin panel (manages its own auth + admin-email check internally) ──
  { path: "/admin", element: <AdminPage /> },

  // ── Fallback ──
  { path: "*", element: <NotFound /> },
];

export default routes;
