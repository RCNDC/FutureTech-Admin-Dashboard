import { cn } from "@/lib/utils";
import {
    MenuIcon,
    LayoutDashboard,
    FileText,
    Settings,
    Shield,
    UserSquare,
    ChevronRight,
    Users,
    Bell,
    Briefcase,
    Calendar,
    Globe,
    Lock,
    PieChart,
    Star,
    BadgeDollarSign,
    Check,
    GaugeCircle,
    FormInput
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useSelectedEmailStore } from "store/selectedemailstore";
import { Badge } from "./ui/badge";
import { useUserStore } from "store/userstore";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosinstance";
import { useAuth } from "./authprovider";
import Loading from "./loading";
import Logout from "./logout";

const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('dashboard')) return <GaugeCircle className="w-5 h-5" />;
    if (n.includes('user')) return <Users className="w-5 h-5" />;
    if (n.includes('role') || n.includes('permission')) return <Shield className="w-5 h-5" />;
    if (n.includes('setting')) return <Settings className="w-5 h-5" />;
    if (n.includes('submission')) return <FormInput className="w-5 h-5" />;
    if (n.includes('event') || n.includes('ticket')) return <Calendar className="w-5 h-5" />;
    if (n.includes('attendee')) return <UserSquare className="w-5 h-5" />;
    if (n.includes('message') || n.includes('notification')) return <Bell className="w-5 h-5" />;
    if (n.includes('job') || n.includes('career')) return <Briefcase className="w-5 h-5" />;
    if (n.includes('report') || n.includes('stat')) return <PieChart className="w-5 h-5" />;
    if (n.includes('menu')) return <MenuIcon className="w-5 h-5" />;
    if (n.includes('sales')) return <BadgeDollarSign className="w-5 h-5" />;
    if (n.includes('checkin') || n.includes('check-in')) return <Check className="w-5 h-5" />;
    return <ChevronRight className="w-4 h-4" />;
};

export const MobileSideMenu = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { selectedUserEmails } = useSelectedEmailStore()
    const { user } = useUserStore();
    const auth = useAuth();
    const location = useLocation();

    const role =
        typeof window !== "undefined"
            ? Number(localStorage.getItem("userRole"))
            : 0;

    const { data, isLoading } = useQuery({
        queryKey: ['user-menus-mobile', role],
        queryFn: async () => {
            const res = await axiosInstance.get('permission/getmenutreebyrole/' + role, {
                headers: {
                    'Authorization': 'Bearer ' + auth?.token
                }
            });
            return res.data;
        },
        enabled: !!role && !!auth?.token
    })

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    }

    return (
        <>
            <style>
                {`
                .sidebar-nav::-webkit-scrollbar {
                    width: 5px;
                }
                .sidebar-nav::-webkit-scrollbar-track {
                    background: transparent;
                }
                .sidebar-nav::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.15);
                    border-radius: 20px;
                }
                `}
            </style>

            {/* Mobile Overlay */}
            <div
                className={cn("fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300", {
                    'opacity-0 pointer-events-none': !isSidebarOpen,
                    'opacity-100': isSidebarOpen
                })}
                onClick={toggleSidebar}
            />

            <aside
                className={cn(
                    "fixed inset-y-0 left-0 w-72 bg-[#1e1b4b] text-white flex flex-col shadow-[10px_0_50px_-15px_rgba(0,0,0,0.5)] transform transition-all duration-500 ease-in-out z-50 border-r border-white/5",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <div className="p-8 flex flex-col items-center">
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                        <img
                            src="/images/logo-future-2.png"
                            alt="FutureTech Logo"
                            className="relative object-contain w-36 h-auto brightness-0 invert transition-transform hover:scale-105 duration-500 ease-out"
                        />
                    </div>
                </div>

                <nav className="flex-1 px-5 pb-6 space-y-6 overflow-y-auto sidebar-nav scroll-smooth">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center p-12 space-y-4">
                            <Loading />
                            <p className="text-xs text-purple-300/50 animate-pulse font-medium tracking-widest uppercase">Syncing Workspace</p>
                        </div>
                    )}

                    {!isLoading && data?.data?.map((menuItem: any) => (
                        <div key={menuItem.id || menuItem.menuName} className="space-y-2">
                            {menuItem.children && menuItem.children.length > 0 && (
                                <>
                                    <div className="flex items-center px-4 py-2">
                                        <span className="text-[10px] font-black uppercase text-purple-300/40 tracking-[0.3em] font-mono">
                                            {menuItem.menuName}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        {menuItem.children.map((childItem: any) => {
                                            const active = isActive(childItem.route);
                                            return (
                                                <Link
                                                    key={childItem.id || childItem.route}
                                                    to={childItem.route}
                                                    onClick={() => setIsSidebarOpen(false)}
                                                    className={cn(
                                                        "group flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300",
                                                        active
                                                            ? "bg-gradient-to-r from-white to-purple-50 text-indigo-950 shadow-[0_10px_20px_-5px_rgba(255,255,255,0.1)] font-bold scale-[1.03]"
                                                            : "text-purple-100/70 hover:bg-white/5 hover:text-white hover:translate-x-1"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={cn(
                                                            "p-2 rounded-xl transition-all duration-300",
                                                            active
                                                                ? "bg-indigo-100 text-indigo-700 shadow-inner"
                                                                : "bg-white/5 text-purple-200 group-hover:bg-purple-500/20 group-hover:text-white"
                                                        )}>
                                                            {getIcon(childItem.menuName)}
                                                        </div>
                                                        <span className="text-sm tracking-wide font-medium">{childItem.menuName}</span>
                                                    </div>

                                                    {active && (
                                                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
                                                    )}

                                                    {childItem.route === '/dashboard/messages' && selectedUserEmails.length > 0 && (
                                                        <Badge variant='destructive' className="h-5 min-w-5 flex items-center justify-center p-0 px-1 text-[10px] rounded-full border-2 border-indigo-950 shadow-lg">
                                                            {selectedUserEmails.length}
                                                        </Badge>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="p-6 bg-black/20 border-t border-white/5 backdrop-blur-sm">
                    <Logout />
                </div>
            </aside>

            {/* Float Menu Button for Mobile */}
            <button
                id="menu-button"
                className="lg:hidden fixed bottom-8 right-8 z-50 h-16 w-16 rounded-full bg-indigo-600 text-white shadow-[0_15px_30px_-5px_rgba(79,70,229,0.5)] flex items-center justify-center hover:bg-indigo-700 transition-all active:scale-90 border border-white/20 group"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? (
                    <svg className="h-7 w-7 transition-all duration-300 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                    <MenuIcon className="h-7 w-7 group-hover:scale-110 transition-transform" />
                )}
            </button>
        </>
    )
}

export default MobileSideMenu;
