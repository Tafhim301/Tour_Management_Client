import { role } from "@/constant/role";
import { adminSidebarItems } from "@/routes/adminSidebar";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.superAdmin || role.admin:
      return [...adminSidebarItems];

    case role.user:
      return [...userSidebarItems];

    default:
      return []
  }
};
