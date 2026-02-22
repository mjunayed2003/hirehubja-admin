import CategoriesPage from "../pages/Main/CategoriesPage/CategoriesPage";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import Interviews from "../pages/Main/Interviews/Interviews";
import JobPosts from "../pages/Main/JobPosts/JobPosts";
import PaymentsEscrow from "../pages/Main/PaymentsEscrow/PaymentsEscrow";
import AboutUs from "../pages/Main/Setting/AboutUs";
import PrivacyPolicy from "../pages/Main/Setting/PrivacyPolicy";
import ProfilePage from "../pages/Main/Setting/ProfilePage";
import TermsAndCondition from "../pages/Main/Setting/TermsAndCondition";
import CompanyApprovals from "../pages/Main/UserApprovels/CompanyApprovals";
import EmployeeApprovals from "../pages/Main/UserApprovels/EmployeeApprovals";
import JobSeekerApprovals from "../pages/Main/UserApprovels/JobSeekerApprovals";
import UserManagement from "../pages/Main/Users/UserManagement";

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
      { name: "Job Seekers", path: "/user-approvals/job-seekers", element: <JobSeekerApprovals />},
      { name: "Employers", path: "/user-approvals/employers", element: <EmployeeApprovals /> },
      { name: "Companies", path: "/user-approvals/companies", element: <CompanyApprovals /> },
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
    element: <div>Subscriptions Page</div>,
  },
  {
    name: "Reviews & Reports",
    path: "/reviews",
    element: <div>Reviews Page</div>,
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