import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivisions: builder.mutation({
      query: (divisonData) => ({
        url: "/division/create",
        method: "POST",
        data: divisonData,
      }),
      invalidatesTags: ["Division"],
    }),

    getDivisions: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Division"],
    }),

    removeDivision: builder.mutation({
      query: (divisionId) => ({
        url: `division/${divisionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Division"],
    }),
  }),
});

export const { useAddDivisionsMutation,useGetDivisionsQuery, useRemoveDivisionMutation} = divisionApi;
