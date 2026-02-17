import { useQuery } from "@tanstack/react-query";
import StatCard from "./statcard"
import axiosInstance from "@/lib/axiosinstance";
import Loading from "./loading";
import { BarChart3, FileStack, Globe, LayoutGrid, Rocket, Users2 } from "lucide-react";
import { DateRangeColumnFilter } from "./filterui/datefilter";
import { useState } from "react";
import { useDashboardFilterStore } from "@/store/dashboardfilter";
import PieChartComponent from "./piechart";
import HistogramComponent from "./histogram";
import LineChartComponent from "./linechart";

const TotalStat = () => {
    const [date, setDate] = useState<[string, string] | undefined>(undefined);
    const { filter, setFilter } = useDashboardFilterStore();

    const { data, isLoading } = useQuery({
        queryKey: ['stat', date, filter],
        queryFn: async () => {
            const params: any = {};
            if (date?.[0]) {
                params.startDate = date[0];
            }
            if (date?.[1]) {
                params.endDate = date[1];
            }
            params.type = filter.toLowerCase();
            const res = await axiosInstance.get('/register/submission/stat', { params });
            return res.data;
        }
    })

    const { data: chartData, isLoading: isChartLoading } = useQuery({
        queryKey: ['chart', date, filter],
        queryFn: async () => {
            const params: any = {};
            if (date?.[0]) {
                params.startDate = date[0];
            }
            if (date?.[1]) {
                params.endDate = date[1];
            }
            params.type = filter.toLowerCase();
            const res = await axiosInstance.get('/register/submission/chart', { params });
            return res.data;
        }
    })

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value as 'Participants' | 'Attendees');
    }

    return (
        <>
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h3 className="text-3xl font-black text-slate-800 tracking-tight">System Insights</h3>
                    <p className="text-sm text-slate-500 font-medium">Monitoring global submission patterns and growth metrics</p>
                </div>
                <div className="flex items-center gap-3 glass p-2 rounded-2xl border-white/40 shadow-sm self-start md:self-auto">
                    <select
                        value={filter}
                        onChange={handleFilterChange}
                        className="bg-transparent border-none text-sm font-bold text-slate-600 focus:ring-0 cursor-pointer px-3"
                    >
                        <option value="Participants">Registration Stats</option>
                        <option value="Attendees">Attendance Flow</option>
                    </select>
                    <div className="h-4 w-px bg-slate-200 mx-1" />
                    <DateRangeColumnFilter column={{ getFilterValue: () => date, setFilterValue: setDate } as any} />
                </div>
            </div>

            {isLoading && (
                <div className="flex justify-center p-20">
                    <Loading />
                </div>
            )}

            {data && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {filter === 'Participants' ? (
                        <>
                            <StatCard title="Embassy" changes={data.data.embassyChange} totalCount={data.data.totalEmbassySubmission} icon={<Globe className="w-5 h-5" />} />
                            <StatCard title="Intl. Company" changes={data.data.internationCompanyChange} totalCount={data.data.totalInternationCompanySubmission} icon={<LayoutGrid className="w-5 h-5" />} />
                            <StatCard title="Local Company" changes={data.data.localCompanyChange} totalCount={data.data.totalLocalCompanySubmission} icon={<FileStack className="w-5 h-5" />} />
                            <StatCard title="NGOs" changes={data.data.ngoChange} totalCount={data.data.totalNgoSubmission} icon={<Users2 className="w-5 h-5" />} />
                            <StatCard title="Startups" changes={data.data.startupChange} totalCount={data.data.totalStartupSubmission} icon={<Rocket className="w-5 h-5" />} />
                        </>
                    ) : (
                        <>
                            <StatCard title="Event Flow" changes={data.data.eventAttendeeChange} totalCount={data.data.totalEventAttendeeSubmission} icon={<BarChart3 className="w-5 h-5" />} />
                            <StatCard title="Conferences" changes={data.data.conferenceAttendeeChange} totalCount={data.data.totalConferenceAttendeeSubmission} icon={<Users2 className="w-5 h-5" />} />
                        </>
                    )}
                </div>
            )}

            {isChartLoading && (
                <div className="flex justify-center p-20">
                    <Loading />
                </div>
            )}

            {chartData && (
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="premium-card p-8 group">
                        <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-500" />
                            Submission Breakdown
                        </h3>
                        <PieChartComponent data={chartData.data.pieChart} />
                    </div>
                    <div className="premium-card p-8 group">
                        <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            Trend Analysis
                        </h3>
                        <LineChartComponent data={chartData.data.lineChart} />
                    </div>
                    <div className="lg:col-span-2 premium-card p-8 group">
                        <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                            Geographical & Sector Distribution
                        </h3>
                        <HistogramComponent data={chartData.data.histogram} />
                    </div>
                </div>
            )}
        </>
    )
}

export default TotalStat;