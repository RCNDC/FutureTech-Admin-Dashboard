import DashboardHeader from "@/components/dashboardheader";
import DashboardSideBar from "@/components/dashboardsidebar";
import { Outlet } from "react-router";
import AuthProvider from "../components/authprovider";

export default function DashboardLayout() {
  return (
    <AuthProvider>
      <div className="">
       {/* header component goes hear */}
        <div className="flex md:gap-4  w-full">
          <div>
            <DashboardSideBar />
          </div>
          <div className="w-full mt-3 p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
