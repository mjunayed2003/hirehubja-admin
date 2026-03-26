// src/routes/index.jsx
// ✅ Suspense wrap করা হয়েছে lazy loading এর জন্য

import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense } from "react";
import Main from "../layouts/Main/Main";
import Auth from "../layouts/Auth/Auth";
import SignIn from "../pages/Auth/SignIn";
import { routesGenerators } from "../utils/routesGenerators";
import { dashboardItems } from "../constants/router.constants";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import ResetPassword from "../pages/Auth/ResetPassword";
import AdminRoutes from "./AdminRoutes";
import NotFound from "../pages/NotFound/NotFound";

// Lazy loading এর জন্য fallback UI
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-4 border-[#44B12C] border-t-transparent rounded-full animate-spin" />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminRoutes>
        <Main />
      </AdminRoutes>
    ),
    children: routesGenerators(dashboardItems).map((route) => ({
      ...route,
      element: <Suspense fallback={<PageLoader />}>{route.element}</Suspense>,
    })),
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Navigate to="/auth/sign-in" />,
      },
      {
        path: "/auth/sign-in",
        element: <SignIn />,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/auth/verify-email/:id",
        element: <VerifyEmail />,
      },
      {
        path: "/auth/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;