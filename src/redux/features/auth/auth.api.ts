import { baseApi } from "@/redux/baseApi";
import type { ISendOTP, IVerifyOTP, TResponse } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    sendOtp: builder.mutation<TResponse<null>, ISendOTP>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<TResponse<null>, IVerifyOTP>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
   
       
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useSendOtpMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useLogoutMutation
} = authApi;
