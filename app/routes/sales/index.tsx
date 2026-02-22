import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/components/authprovider';
import axiosInstance from '@/lib/axiosinstance';
import Loading from '@/components/loading';
import type { response } from '@/types/response';
import type { UserResponse } from '@/types/user';
import UsersTable from '@/components/userstable';
import { columns } from '@/components/tablecolumns/usercolumn';
import { cn } from "@/lib/utils";
import { Users, Globe, MapPin, BadgeDollarSign, LayoutGrid } from "lucide-react";
import type { FC } from "react";

const SalesOverview: FC = () => {
    const auth = useAuth();
    const [selectedRole, setSelectedRole] = useState<'local' | 'international' | null>(null);

    const { data, isLoading } = useQuery({
        queryKey: ['users', 'sales'],
        queryFn: async () => {
            const res = await axiosInstance.get<response<UserResponse[]>>(
                `/user/getAllUsers`,
                {
                    headers: {
                        Authorization: `Bearer ` + auth?.token,
                    },
                }
            );
            return res.data;
        },
    });

    const filteredUsers = data?.data?.filter(user => {
        if (!selectedRole) return false;
        const roleName = user.Role?.name.toLowerCase() || "";
        if (selectedRole === 'local') return roleName.includes('local sales');
        if (selectedRole === 'international') return roleName.includes('international sales');
        return false;
    });

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header section with specialized Admin view */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className="p-4 rounded-[1.5rem] bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                        <BadgeDollarSign className="w-10 h-10" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">Sales Management</h1>
                        <p className="text-slate-500 font-medium">
                            Profile management and classification of sales representatives
                        </p>
                    </div>
                </div>

                {selectedRole && (
                    <button
                        onClick={() => setSelectedRole(null)}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors font-bold text-sm"
                    >
                        <LayoutGrid className="w-4 h-4" />
                        Show All Categories
                    </button>
                )}
            </div>

            {/* Classification View */}
            {!selectedRole ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <button
                        onClick={() => setSelectedRole('local')}
                        className="p-10 rounded-[3rem] border-2 border-slate-100 bg-white hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 group text-left relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                            <MapPin className="w-40 h-40 rotate-12" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-500 shadow-inner">
                                <MapPin className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 mb-2">Local Sales Team</h3>
                                <p className="text-slate-500 font-medium leading-relaxed max-w-xs">
                                    Manage representatives covering the Ethiopian market and local company registrations.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:translate-x-2 transition-transform">
                                <span>View Members</span>
                                <Users className="w-4 h-4" />
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedRole('international')}
                        className="p-10 rounded-[3rem] border-2 border-slate-100 bg-white hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 group text-left relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                            <Globe className="w-40 h-40 -rotate-12" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-500 shadow-inner">
                                <Globe className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 mb-2">International Sales Team</h3>
                                <p className="text-slate-500 font-medium leading-relaxed max-w-xs">
                                    Monitor global market representatives and international company partnerships.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
                                <span>View Members</span>
                                <Users className="w-4 h-4" />
                            </div>
                        </div>
                    </button>
                </div>
            ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-6 duration-700">
                    <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center",
                                selectedRole === 'local' ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"
                            )}>
                                {selectedRole === 'local' ? <MapPin className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-800">
                                    {selectedRole === 'local' ? "Local Sales Representatives" : "International Sales Representatives"}
                                </h2>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{filteredUsers?.length || 0} Total Active Users</p>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="p-20 flex justify-center"><Loading /></div>
                    ) : (
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden p-6 animate-in zoom-in-95 duration-500">
                            <UsersTable columns={columns} userData={filteredUsers} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SalesOverview;
