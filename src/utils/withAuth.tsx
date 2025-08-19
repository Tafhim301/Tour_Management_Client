import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import type { TRole } from "@/types";
import { Loader2 } from "lucide-react";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component : ComponentType, requiredRole ?: TRole) => {
    return function AuthWrapper() {
        const {data, isLoading} = useUserInfoQuery(undefined);

        if (isLoading) {
            return <Loader2></Loader2>

            
        }

        if(!isLoading && !data?.data?.email){
            return <Navigate to={'/login'}></Navigate>
        }

        if(requiredRole && !isLoading && requiredRole !== data?.data?.role){

            return <Navigate to={'/unauthorized'}></Navigate>
        }


        return <Component />
    }
}