import AddDivision from "@/pages/Admin/AddDivision";
import AddTour from "@/pages/Admin/AddTour";
import AddTourType from "@/pages/Admin/AddTourType";
import Analytics from "@/pages/Admin/Analytics";
import type { ISidebarItems } from "@/types";

 


export const adminSidebarItems : ISidebarItems[]   = 
    [
        {
            title: "Dashboard",
            items: [
                {
                    title: "Analytics",
                    url: "/admin/analytics",
                    Component: Analytics

                }


            ],
        },
        {
            title: "Tour Management",
         
            items: [
                {
                    title: "Add Tour",
                    url: "/admin/add-tour",
                    Component: AddTour
                },
                {
                    title: "Add Division",
                    url: "/admin/division",
                    Component: AddDivision
                },
                {
                    title: "Add Tour Type",
                    url: "/admin/add-tour-type",
                    Component: AddTourType
                },

            ],
        },



    
]