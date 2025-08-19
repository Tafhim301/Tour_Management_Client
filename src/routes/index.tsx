import App from "@/App";
import DashBoardLayout from "@/components/layout/DashBoardLayout";
import About from "@/pages/About";
import Login from "@/pages/login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebar";
import { generateRoutes } from "@/utils/generateRoutes";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constant/role";
import type { TRole } from "@/types";

export const router = createBrowserRouter([
    {
        Component: App,
        path: '/',
        children: [
            {
                Component: withAuth(About),
                path: 'about'
            },

        ]

    },
    {
        Component: withAuth(DashBoardLayout, role.superAdmin as TRole),
        path: '/admin',

        children: [{index : true, element : <Navigate to={'/admin/analytics'}>
            
        </Navigate>},...generateRoutes(adminSidebarItems)]

    },
    {
        Component: withAuth(DashBoardLayout, role.user as TRole),
        path: '/user',
        children: [
            ...generateRoutes(userSidebarItems)


        ]

    },

    {
        Component: Login,
        path: 'login'
    },
    {
        Component: Register,
        path: 'register'
    },
    {
        Component: Verify,
        path: 'verify'
    },
    {
        Component: Unauthorized,
        path: 'unauthorized'
    },


]);

export default router;
