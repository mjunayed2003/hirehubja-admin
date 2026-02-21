import { CiUser } from "react-icons/ci";
import { RiDashboardHorizontalFill, RiListSettingsLine, RiSettings5Fill } from "react-icons/ri";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import Users from "../pages/Main/Users/Users";
import MyProfile from "../pages/Profile/MyProfile";
import EditMyProfile from "../pages/Profile/EditMyProfile";
import TermsConditions from "../pages/Settings/TermsConditions";
import EditTermsConditions from "../pages/Settings/EditTermsConditions";
import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
import EditPrivacyPolicy from "../pages/Settings/EditPrivacyPolicy";
import EditAboutUs from "../pages/Settings/EditAboutUs";
import AboutUs from "../pages/Settings/AboutUs";
import Notifications from "../pages/Main/Notifications/Notifications";
import TowTypes from "../pages/Main/TowTypes/TowTypes";
import Earnings from "../pages/Main/Earnings/Earnings";
import Withdraw from "../pages/Main/Earnings/Withdraw";
import GeneralSettings from "../pages/Settings/GeneralSettings";
import Transactions from "../pages/Main/Earnings/Transactions";
import RefundDetails from "../pages/Main/Earnings/RefundDetails";
import Providers from "../pages/Main/Users/Providers";
import Admins from "../pages/Main/Users/Admins";
import ProviderDetails from "../pages/Main/Users/ProviderDetails";
import Reports from "../pages/Main/Reports/Reports";

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
      { name: "Job Seekers", subName: "Job Seekers", subPath: "/user-approvals/job-seekers" },
      { name: "Employers", subName: "Employers", subPath: "/user-approvals/employers" },
      { name: "Companies", subName: "Companies", subPath: "/user-approvals/companies" },
    ],
  },
  {
    name: "User",
    path: "/user",
  },
  {
    name: "Job Posts",
    path: "/job-posts",
  },
  {
    name: "Interviews",
    path: "/interviews",
  },
  {
    name: "Payments & Escrow",
    path: "/payments",
  },
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "Subscriptions",
    path: "/subscriptions",
  },
  {
    name: "Reviews & Reports",
    path: "/reviews",
  },
  {
    name: "Settings",
    rootPath: "settings",
    children: [
      { name: "Profile", subName: "Profile", subPath: "/settings/profile" },
      { name: "Terms & Condition", subName: "Terms & Condition", subPath: "/settings/terms-condition" },
      { name: "Privacy Policy", subName: "Privacy Policy", subPath: "/settings/privacy-policy" },
      { name: "About Us", subName: "About Us", subPath: "/settings/about-us" },
    ],
  },

  
  // Hidden Route
  {
    path: "/provider-details",
    element: <ProviderDetails />,
  },

  {
    name: "User",
    path: "/user",
    element: <Users />,
  },

  {
    name: "Job Posts",
    path: "/job-posts",
    element: <div>Job Posts Component</div>, // নতুন পেজ তৈরি করে এখানে বসাবেন
  },

  {
    name: "Interviews",
    path: "/interviews",
    element: <div>Interviews Component</div>, // নতুন পেজ তৈরি করে এখানে বসাবেন
  },

  {
    name: "Payments & Escrow",
    path: "/payments",
    element: <Earnings />, 
  },

  {
    name: "Categories",
    path: "/categories",
    element: <TowTypes />, 
  },

  {
    name: "Subscriptions",
    path: "/subscriptions",
    element: <Transactions />, 
  },

  {
    name: "Reviews & Reports",
    path: "/reports",
    element: <Reports />,
  },

  {
    name: "Settings",
    path: "/settings",
    element: <GeneralSettings />, // ইমেজে Settings এর কোনো ড্রপডাউন নেই, তাই সরাসরি লিংক
  },

  // ==========================================
  // Hidden Routes (এগুলো সাইডবারে দেখাবে না, কিন্তু লিংক কাজ করবে)
  // ==========================================
  {
    path: "settings/profile",
    element: <MyProfile />,
  },
  {
    path: "settings/profile/edit",
    element: <EditMyProfile />,
  },
  {
    path: "settings/terms-conditions",
    element: <TermsConditions />,
  },
  {
    path: "settings/terms-conditions/edit",
    element: <EditTermsConditions />,
  },
  {
    path: "settings/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "settings/privacy-policy/edit",
    element: <EditPrivacyPolicy />,
  },
  {
    path: "settings/about-us",
    element: <AboutUs />,
  },
  {
    path: "settings/about-us/edit",
    element: <EditAboutUs />,
  },
  {
    path: "refund-details/:id",
    element: <RefundDetails />,
  },
  {
    path: "withdraw",
    element: <Withdraw />,
  },
];