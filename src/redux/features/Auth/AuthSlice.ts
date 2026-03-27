import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "../../api/BaseApi";
import type { RootState } from "../../Store";

export interface User {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

const getUserFromStorage = (): User | null => {
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
  initialState: { user, token } as AuthState,
  reducers: {
    setLogin: (state, action: PayloadAction<{ user: User; token: string }>) => {
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
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;

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
    getProfile: builder.query<any, void>({
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


    // POST /auth/forgot-password/verify-otp
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password/verify-otp",
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
  useVerifyOtpMutation,
} = authApi;