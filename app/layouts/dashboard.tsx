import DashboardHeader from "@/components/dashboardheader";
import DashboardSideBar from "@/components/dashboardsidebar";
import { Outlet, useLocation } from "react-router";
import AuthProvider from "../components/authprovider";
import { MobileSideMenu } from "@/components/mobilesidemenu";

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <AuthProvider>
      <div className="">
        {/* header component goes hear */}
        <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
          <MobileSideMenu />

          <main
            key={location.pathname}
            className="flex-1 overflow-y-auto lg:pl-72 animate-fade-in scroll-smooth"
          >
            <div className="min-h-full py-10 px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
