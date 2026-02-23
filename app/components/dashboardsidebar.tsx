import {
    BadgeDollarSign,
    Check,
    FormInput,
    GaugeCircle,
    Ticket,
    User,
    Users,
    MenuIcon,
    ChevronRight,
    Settings,
    Shield,
    UserSquare,
    Bell,
    Briefcase,
    Calendar,
    Globe,
    Lock,
    PieChart,
    Star
} from "lucide-react";
import { Link, useLocation } from "react-router";
import Logout from "./logout";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosinstance";
import { useAuth } from "./authprovider";
import { useUserStore } from "store/userstore";
import Loading from "./loading";
import { cn } from "@/lib/utils";
import { useSelectedEmailStore } from "store/selectedemailstore";
import { Badge } from "./ui/badge";

const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('dashboard')) return <GaugeCircle className="w-4 h-4" />;
    if (n.includes('user')) return <Users className="w-4 h-4" />;
    if (n.includes('role') || n.includes('permission')) return <Shield className="w-4 h-4" />;
    if (n.includes('setting')) return <Settings className="w-4 h-4" />;
    if (n.includes('submission')) return <FormInput className="w-4 h-4" />;
    if (n.includes('event') || n.includes('ticket')) return <Calendar className="w-4 h-4" />;
    if (n.includes('attendee')) return <UserSquare className="w-4 h-4" />;
    if (n.includes('message') || n.includes('notification')) return <Bell className="w-4 h-4" />;
    if (n.includes('job') || n.includes('career')) return <Briefcase className="w-4 h-4" />;
    if (n.includes('report') || n.includes('stat')) return <PieChart className="w-4 h-4" />;
    if (n.includes('menu')) return <MenuIcon className="w-4 h-4" />;
    if (n.includes('sales')) return <BadgeDollarSign className="w-4 h-4" />;
    if (n.includes('checkin') || n.includes('check-in')) return <Check className="w-4 h-4" />;
    return <ChevronRight className="w-4 h-4" />;
};

const DashboardSideBar = () => {
    const { user } = useUserStore();
    const auth = useAuth();
    const location = useLocation();
    const { selectedUserEmails } = useSelectedEmailStore();

    const role =
        typeof window !== "undefined"
            ? Number(localStorage.getItem("userRole"))
            : 0;

    const { data, isLoading } = useQuery({
        queryKey: ['user-menus-desktop', role],
        queryFn: async () => {
            const res = await axiosInstance.get('permission/getmenutreebyrole/' + role, {
                headers: {
                    'Authorization': 'Bearer ' + auth?.token
                }
            });
            return res.data;
        },
        enabled: !!role && !!auth?.token
    });

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="md:w-64 space-y-4 max-w-56 bg-linear-150 from-purple-900 to-purple-500 border md:h-screen p-5 shadow-md relative md:block hidden animate-in slide-in-from-left duration-500 overflow-y-auto">
            <div className="mt-10 space-y-2">
                <div className="w-full flex items-center justify-center space-y-2 mb-6">
                    <img
                        src="/images/logo-future-2.png"
                        className="w-36 h-auto object-contain brightness-0 invert"
                        alt="Future Tech Addis Logo"
                    />
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-10 space-y-3">
                        <Loading />
                        <span className="text-[10px] text-purple-200/50 uppercase font-bold tracking-widest animate-pulse">Syncing Menus...</span>
                    </div>
                ) : (
                    data?.data?.map((menuItem: any) => (
                        <div key={menuItem.id || menuItem.menuName} className="pt-2 pb-2">
                            {menuItem.children && menuItem.children.length > 0 && (
                                <>
                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-purple-200/50 px-2 mb-2">
                                        {menuItem.menuName}
                                    </h5>
                                    <ul className="space-y-1">
                                        {menuItem.children.map((childItem: any) => {
                                            const active = isActive(childItem.route);
                                            return (
                                                <li key={childItem.id || childItem.route}>
                                                    <Link
                                                        to={childItem.route}
                                                        className={cn(
                                                            "flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-bold text-sm",
                                                            active
                                                                ? "bg-white/15 text-white shadow-inner"
                                                                : "text-white/70 hover:text-white hover:bg-white/5"
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {getIcon(childItem.menuName)}
                                                            {childItem.menuName}
                                                        </div>
                                                        {active && (
                                                            <div className="h-1 w-1 rounded-full bg-white animate-pulse" />
                                                        )}
                                                        {childItem.route === '/dashboard/messages' && selectedUserEmails.length > 0 && (
                                                            <Badge variant='destructive' className="h-4 min-w-4 flex items-center justify-center p-0 px-1 text-[9px] rounded-full border border-purple-900">
                                                                {selectedUserEmails.length}
                                                            </Badge>
                                                        )}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div className="sticky bottom-0 pt-6 mt-auto">
                <Logout />
            </div>
        </div>
    );
};

export default DashboardSideBar;
