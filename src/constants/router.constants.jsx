import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";

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
      { name: "Job Seekers", path: "/user-approvals/job-seekers", element: <div>Job Seekers Page</div> },
      { name: "Employers", path: "/user-approvals/employers", element: <div>Employers Page</div> },
      { name: "Companies", path: "/user-approvals/companies", element: <div>Companies Page</div> },
    ],
  },
  {
    name: "User",
    path: "/user",
    element: <div>User Page</div>,
  },
  {
    name: "Job Posts",
    path: "/job-posts",
    element: <div>Job Posts Page</div>,
  },
  {
    name: "Interviews",
    path: "/interviews",
    element: <div>Interviews Page</div>,
  },
  {
    name: "Payments & Escrow",
    path: "/payments",
    element: <div>Payments Page</div>,
  },
  {
    name: "Categories",
    path: "/categories",
    element: <div>Categories Page</div>,
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
      { name: "Profile", path: "/settings/profile", element: <div>Profile Page</div> },
      { name: "Terms & Condition", path: "/settings/terms-condition", element: <div>Terms Page</div> },
      { name: "Privacy Policy", path: "/settings/privacy-policy", element: <div>Privacy Page</div> },
      { name: "About Us", path: "/settings/about-us", element: <div>About Us Page</div> },
    ],
  },
];