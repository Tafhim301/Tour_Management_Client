import Bookings from "@/pages/User/Bookings";
import type { ISidebarItems } from "@/types";
 


export const userSidebarItems : ISidebarItems[]   = 
    [
        {
            title: "Bookings",
            items: [
                {
                    title: "Bookings",
                    url: "/user/bookings",
                    Component: Bookings

                }


            ],
        },
      


    
]