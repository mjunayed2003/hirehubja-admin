import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../layouts/Main/Main";
// import Auth from "../layouts/Auth/Auth";
import SignIn from "../pages/Auth/SignIn";
import { routesGenerators } from "../utils/routesGenerators";
import { dashboardItems } from "../constants/router.constants";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import ResetPassword from "../pages/Auth/ResetPassword";
import AdminRoutes from "./AdminRoutes";
import NotFound from "../pages/NotFound/NotFound";

const router = createBrowserRouter([
  // Dashboard / Admin routes
  {
    path: "/",
    element: (
      <AdminRoutes>
        <Main />
      </AdminRoutes>
    ),
    children: routesGenerators(dashboardItems),
  },

  // Auth routes as top-level paths
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-email/:id",
    element: <VerifyEmail />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },

  // Catch-all route
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;