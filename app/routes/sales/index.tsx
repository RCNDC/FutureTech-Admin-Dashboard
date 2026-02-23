import { useState, type FC } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/components/authprovider';
import axiosInstance from '@/lib/axiosinstance';
import Loading from '@/components/loading';
import type { response } from '@/types/response';
import { type SalesResponse } from '@/components/tablecolumns/salescolumn';
import type { RoleResponse } from '@/types/role';
import { cn } from "@/lib/utils";
import {
    Users, Globe, MapPin, BadgeDollarSign, LayoutGrid, ChevronLeft,
    Mail, Trash2, Calendar, ShieldCheck
} from "lucide-react";
import { AddSalesUserDialog } from '@/components/addSalesUserDialog';
import { toastSuccess, toastError } from '@/lib/toast';
import { AxiosError } from 'axios';

const SalesOverview: FC = () => {
    const auth = useAuth();
    const queryClient = useQueryClient();
    const [selectedRole, setSelectedRole] = useState<'local' | 'international' | null>(null);

    const { mutate: deleteSales, isPending: isDeleting } = useMutation({
        mutationFn: async (id: number) => {
            const res = await axiosInstance.delete(`/sales-dashboard/delete/${id}`, {
                headers: { Authorization: `Bearer ${auth?.token}` }
            });
            return res.data;
        },
        onSuccess: () => {
            toastSuccess('Representative removed successfully');
            queryClient.invalidateQueries({ queryKey: ['users', 'sales'] });
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                toastError(error.response?.data.message);
            }
        }
    });

    const { data: roles } = useQuery<response<RoleResponse[]>>({
        queryKey: ['roles'],
        queryFn: async () => {
            const res = await axiosInstance.get('/role/getAllRoles', {
                headers: { Authorization: `Bearer ${auth?.token}` }
            });
            return res.data;
        }
    });

    const { data, isLoading } = useQuery({
        queryKey: ['users', 'sales'],
        queryFn: async () => {
            const res = await axiosInstance.get<response<SalesResponse[]>>(
                `/sales-dashboard/getAllSales`,
                {
                    headers: {
                        Authorization: `Bearer ` + auth?.token,
                    },
                }
            );
            return res.data;
        },
    });

    console.log('API Data:', data);
    console.log('Selected Role:', selectedRole);

    const filteredUsers = data?.data?.filter(user => {
        if (!selectedRole) return false;
        const targetId = selectedRole === 'local' ? 25 : 29;
        console.log(`Checking user ${user.salesPersonName}: roleId ${user.roleId} === ${targetId}`);
        return Number(user.roleId) === targetId;
    });

    console.log('Filtered Users:', filteredUsers);

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
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-bold text-sm shadow-sm active:scale-95 group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back</span>
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
                                <h3 className="text-2xl font-black text-slate-800 mb-2">Manage Local Sales Team</h3>
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
                                <h3 className="text-2xl font-black text-slate-800 mb-2">Manage International Sales Team</h3>
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
                        <AddSalesUserDialog type={selectedRole} />
                    </div>

                    {isLoading ? (
                        <div className="p-20 flex justify-center"><Loading /></div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredUsers && filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <div key={user.salesId} className="group bg-white rounded-[2.5rem] border border-slate-100 p-6 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 relative overflow-hidden flex flex-col h-full">
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                                            <Users className="w-24 h-24" />
                                        </div>

                                        <div className="relative z-10 space-y-4 flex flex-col h-full">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-lg ring-4 ring-slate-50">
                                                    {user.salesPersonName.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-black text-slate-800 truncate leading-tight">
                                                        {user.salesPersonName}
                                                    </h3>
                                                    <div className="flex items-center gap-1.5 text-slate-400">
                                                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Verified Representative</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 rounded-3xl bg-slate-50 space-y-3">
                                                <div className="flex items-center gap-3 text-slate-600">
                                                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm text-indigo-600">
                                                        <Mail className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm font-bold truncate">{user.email}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-slate-600">
                                                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm text-emerald-600">
                                                        <BadgeDollarSign className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-sm font-black whitespace-nowrap">ETB {Number(user.salaryAmount).toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2 pt-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                                            </div>

                                            <div className="pt-4 mt-auto">
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to remove this representative?')) {
                                                            deleteSales(user.salesId);
                                                        }
                                                    }}
                                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all font-bold text-xs"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Remove Member
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-20 bg-white rounded-[3rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                        <Users className="w-10 h-10" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black text-slate-800">No Representatives Found</h3>
                                        <p className="text-slate-500 font-medium max-w-xs mx-auto">
                                            There are no sales representatives registered under this category yet.
                                        </p>
                                    </div>
                                    <AddSalesUserDialog type={selectedRole} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SalesOverview;
