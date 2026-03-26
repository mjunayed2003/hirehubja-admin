

import { lazy } from "react";

// ─── Lazy Imports ─────────────────────────────────────────────────────────────
const DashboardHome    = lazy(() => import("../pages/Main/DashboardHome/DashboardHome"));
const JobSeekerApprovals = lazy(() => import("../pages/Main/UserApprovels/JobSeekerApprovals"));
const EmployeeApprovals  = lazy(() => import("../pages/Main/UserApprovels/EmployeeApprovals"));
const CompanyApprovals   = lazy(() => import("../pages/Main/UserApprovels/CompanyApprovals"));
const UserManagement   = lazy(() => import("../pages/Main/Users/UserManagement"));
const JobPosts         = lazy(() => import("../pages/Main/JobPosts/JobPosts"));
const Interviews       = lazy(() => import("../pages/Main/Interviews/Interviews"));
const PaymentsEscrow   = lazy(() => import("../pages/Main/PaymentsEscrow/PaymentsEscrow"));
const CategoriesPage   = lazy(() => import("../pages/Main/CategoriesPage/CategoriesPage"));
const Subscriptions    = lazy(() => import("../pages/Main/Subscriptions/Subscriptions"));
const Reports          = lazy(() => import("../pages/Main/Reports"));
const ProfilePage      = lazy(() => import("../pages/Main/Setting/ProfilePage"));
const TermsAndCondition = lazy(() => import("../pages/Main/Setting/TermsAndCondition"));
const PrivacyPolicy    = lazy(() => import("../pages/Main/Setting/PrivacyPolicy"));
const AboutUs          = lazy(() => import("../pages/Main/Setting/AboutUs"));

// ─── Route Config ─────────────────────────────────────────────────────────────
export const dashboardItems = [
  {
    name: "Dashboard",
    path: "/",
    element: <DashboardHome />,
  },
  {
    name: "User Approvals",
    rootPath: "user-approvals",
    children: [
      { name: "Job Seekers", path: "/user-approvals/job-seekers", element: <JobSeekerApprovals /> },
      { name: "Employers",   path: "/user-approvals/employers",   element: <EmployeeApprovals /> },
      { name: "Companies",   path: "/user-approvals/companies",   element: <CompanyApprovals /> },
    ],
  },
  {
    name: "User",
    path: "/user",
    element: <UserManagement />,
  },
  {
    name: "Job Posts",
    path: "/job-posts",
    element: <JobPosts />,
  },
  {
    name: "Interviews",
    path: "/interviews",
    element: <Interviews />,
  },
  {
    name: "Payments & Escrow",
    path: "/payments",
    element: <PaymentsEscrow />,
  },
  {
    name: "Categories",
    path: "/categories",
    element: <CategoriesPage />,
  },
  {
    name: "Subscriptions",
    path: "/subscriptions",
    element: <Subscriptions />,
  },
  {
    name: "Reviews & Reports",
    path: "/reviews",
    element: <Reports />,
  },
  {
    name: "Settings",
    rootPath: "settings",
    children: [
      { name: "Profile",           path: "/settings/profile",          element: <ProfilePage /> },
      { name: "Terms & Condition", path: "/settings/terms-condition",  element: <TermsAndCondition /> },
      { name: "Privacy Policy",    path: "/settings/privacy-policy",   element: <PrivacyPolicy /> },
      { name: "About Us",          path: "/settings/about-us",         element: <AboutUs /> },
    ],
  },
];