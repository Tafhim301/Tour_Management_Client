export { type ISendOTP, type ILogin, type IVerifyOTP } from "./auth.type";
export type { ISidebarItems } from "./sidebar.type";
interface TMeta {
  page?: number;
  limit?: number;
  totalPage?: number;
  total?: number;
}

export interface TResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: TMeta;
}

export type TRole = "ADMIN" | "USER" | "GUIDE" | "SUPER_ADMIN";
