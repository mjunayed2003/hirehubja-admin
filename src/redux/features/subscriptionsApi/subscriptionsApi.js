import { baseApi } from "../../api/baseApi";

export const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => `/admin/subscriptions`,
      providesTags: ["subscriptions"],
    }),

    createPlan: builder.mutation({
      query: (data) => ({
        url: `/admin/subscriptions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subscriptions"],
    }),

    updatePlan: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/subscriptions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["subscriptions"],
    }),

    deletePlan: builder.mutation({
      query: (id) => ({
        url: `/admin/subscriptions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subscriptions"],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = subscriptionsApi;