

import { lazy } from "react";

export const DashboardHome = lazy(() => import("../pages/Main/DashboardHome/DashboardHome"));
export const JobSeekerApprovals = lazy(() => import("../pages/Main/UserApprovels/JobSeekerApprovals"));
export const EmployeeApprovals = lazy(() => import("../pages/Main/UserApprovels/EmployeeApprovals"));
export const CompanyApprovals = lazy(() => import("../pages/Main/UserApprovels/CompanyApprovals"));
export const UserManagement = lazy(() => import("../pages/Main/Users/UserManagement"));
export const JobPosts = lazy(() => import("../pages/Main/JobPosts/JobPosts"));
export const Interviews = lazy(() => import("../pages/Main/Interviews/Interviews"));
export const PaymentsEscrow = lazy(() => import("../pages/Main/PaymentsEscrow/PaymentsEscrow"));
export const CategoriesPage = lazy(() => import("../pages/Main/CategoriesPage/CategoriesPage"));
export const Subscriptions = lazy(() => import("../pages/Main/Subscriptions/Subscriptions"));
export const Reports = lazy(() => import("../pages/Main/Reports"));
export const ProfilePage = lazy(() => import("../pages/Main/Setting/ProfilePage"));
export const TermsAndCondition = lazy(() => import("../pages/Main/Setting/TermsAndCondition"));
export const PrivacyPolicy = lazy(() => import("../pages/Main/Setting/PrivacyPolicy"));
export const AboutUs = lazy(() => import("../pages/Main/Setting/AboutUs"));

// ─── Route Config ─────────────────────────────────────────────────────────────
export const dashboardItems = [
  { name: "Dashboard", path: "/", component: "DashboardHome" },
  {
    name: "User Approvals",
    rootPath: "user-approvals",
    children: [
      { name: "Job Seekers", path: "/user-approvals/job-seekers", component: "JobSeekerApprovals" },
      { name: "Employers", path: "/user-approvals/employers", component: "EmployeeApprovals" },
      { name: "Companies", path: "/user-approvals/companies", component: "CompanyApprovals" },
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
      { name: "Profile", path: "/settings/profile", element: <ProfilePage /> },
      { name: "Terms & Condition", path: "/settings/terms-condition", element: <TermsAndCondition /> },
      { name: "Privacy Policy", path: "/settings/privacy-policy", element: <PrivacyPolicy /> },
      { name: "About Us", path: "/settings/about-us", element: <AboutUs /> },
    ],
  },
];