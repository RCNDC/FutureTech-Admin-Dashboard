import DashboardHeader from "@/components/dashboardheader";
import DashboardSideBar from "@/components/dashboardsidebar";
import { Outlet } from "react-router";
import AuthProvider from "../components/authprovider";

export default function DashboardLayout(){
    return(
         <AuthProvider>
        <div>
            <DashboardHeader/>
            <div className="flex gap-5">
                <DashboardSideBar/>
                <Outlet/>
            </div>      
        </div>
        </AuthProvider>
    )
}