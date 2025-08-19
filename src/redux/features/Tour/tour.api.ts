import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation({
      query: (tourInfo) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourInfo,
      }),
      invalidatesTags: ["Tour"],
    }),

    getTourTypes: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Tour"],
    }),

    removeTourTypes: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-types/${tourTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tour"],
    }),

     addTour: builder.mutation({
      query: (tourInfo) => ({
        url: "/tour/create",
        method: "POST",
        data: tourInfo,
      }),
      invalidatesTags: ["Tour"],
    })
  }),
});

export const { useAddTourTypeMutation, useGetTourTypesQuery ,useRemoveTourTypesMutation ,useAddTourMutation} = tourApi;
