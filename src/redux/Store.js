import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/BaseApi";
import authReducer from "./features/Auth/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});