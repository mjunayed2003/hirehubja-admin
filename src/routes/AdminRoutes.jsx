// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectCurrentUser, selectCurrentToken } from "../redux/features/Auth/authSlice";

// const AdminRoutes = ({ children }) => {
//   const location = useLocation();
//   const user = useSelector(selectCurrentUser);
//   const token = useSelector(selectCurrentToken);

//   if (token && user) {
//     return children;
//   }

//   return <Navigate to="/auth/sign-in" state={{ from: location.pathname }} replace />;
// };

// export default AdminRoutes;