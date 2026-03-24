import { baseApi } from "../../api/baseApi";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPage: builder.query({
      query: (pageName) => `/public/${pageName}`,
      providesTags: (result, error, pageName) => [{ type: "settings", id: pageName }],
    }),
    updatePage: builder.mutation({
      query: ({ pageName, data }) => ({
        url: `/public/${pageName}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { pageName }) => [{ type: "settings", id: pageName }],
    }),
  }),
});

export const { useGetPageQuery, useUpdatePageMutation } = settingsApi;