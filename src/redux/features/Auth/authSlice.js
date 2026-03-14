import { createSlice } from "@reduxjs/toolkit";
import { baseApi } from "../../api/baseApi";

// ─── localStorage থেকে safe করে initial state নাও ──────────────
const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined" || user === "null") return null;
    return JSON.parse(user);
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

const token = localStorage.getItem("token") || null;
const user = getUserFromStorage();

// ─── Slice ──────────────────────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState: { user, token },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setLogin, logout } = authSlice.actions;
export default authSlice.reducer;

// ─── Selectors ──────────────────────────────────────────────────
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;

// ─── Auth API (RTK Query) ────────────────────────────────────────
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // POST /admin/auth/login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/admin/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // GET /admin/profile
    getProfile: builder.query({
      query: () => "/admin/profile",
      providesTags: ["profile"],
    }),

    // PUT /admin/profile
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/admin/profile",
        method: "PUT",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["profile"],
    }),

    // POST /admin/auth/change-password
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/admin/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),

    // POST /auth/forgot-password  → email পাঠালে OTP আসবে
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // POST /auth/reset-password  → email + otp + newPassword
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;