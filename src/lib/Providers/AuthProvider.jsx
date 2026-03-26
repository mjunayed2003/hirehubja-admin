// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "../../redux/features/Auth/AuthSlice";
// import { useGetProfileQuery } from "../../redux/features/Auth/AuthSlice";
// import ThemeProvider from "./ThemeProvider";

// const AuthProvider = ({ children }) => {
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);

//   const { isLoading } = useGetProfileQuery(undefined, {
//     skip: !token,
//   });

//   useEffect(() => {

//     if (!token) {
//       dispatch(setLoading(false));
//     }
//   }, [token, dispatch]);

//   return <ThemeProvider>{children}</ThemeProvider>;
// };

// export default AuthProvider;
