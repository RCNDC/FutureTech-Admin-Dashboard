import { useQuery } from "@tanstack/react-query";
import StatCard from "./statcard"
import axiosInstance from "@/lib/axiosinstance";
import Loading from "./loading";
import { ChartColumnIncreasing, FormInput, LucideVoicemail } from "lucide-react";
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
            if (date?.[0] && date?.[1]) {
                params.startDate = date[0];
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
            if (date?.[0] && date?.[1]) {
                params.startDate = date[0];
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
            <div className="my-4 flex items-center gap-4">
                <select value={filter} onChange={handleFilterChange} className="p-2 border rounded-md">
                    <option value="Participants">Participants</option>
                    <option value="Attendees">Attendees</option>
                </select>
                <DateRangeColumnFilter column={{ getFilterValue: () => date, setFilterValue: setDate } as any} />
            </div>
            {isLoading && <Loading />}
            {data && (
                <div className="w-full grid md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1  gap-2">
                    {filter === 'Participants' ? (
                        <>
                            <StatCard title="Embassy" changes={data.data.embassyChange} totalCount={data.data.totalEmbassySubmission} icon={<ChartColumnIncreasing className="w-10 h-10 border rounded-full p-2 bg-orange-500 text-white" />} />
                            <StatCard title="International Company" changes={data.data.internationCompanyChange} totalCount={data.data.totalInternationCompanySubmission} icon={<FormInput className="w-10 h-10 border rounded-full p-2 bg-blue-500 text-white" />} />
                            <StatCard title="Local Company" changes={data.data.localCompanyChange} totalCount={data.data.totalLocalCompanySubmission} icon={<LucideVoicemail className="w-10 h-10 border rounded-full p-2 bg-green-500 text-white" />} />
                            <StatCard title="NGO" changes={data.data.ngoChange} totalCount={data.data.totalNgoSubmission} icon={<LucideVoicemail className="w-10 h-10 border rounded-full p-2 bg-green-500 text-white" />} />
                            <StatCard title="Startup" changes={data.data.startupChange} totalCount={data.data.totalStartupSubmission} icon={<LucideVoicemail className="w-10 h-10 border rounded-full p-2 bg-green-500 text-white" />} />
                        </>
                    ) : (
                        <>
                            <StatCard title="Event Attendees" changes={data.data.eventAttendeeChange} totalCount={data.data.totalEventAttendeeSubmission} icon={<ChartColumnIncreasing className="w-10 h-10 border rounded-full p-2 bg-orange-500 text-white" />} />
                            <StatCard title="Conference Attendees" changes={data.data.conferenceAttendeeChange} totalCount={data.data.totalConferenceAttendeeSubmission} icon={<FormInput className="w-10 h-10 border rounded-full p-2 bg-blue-500 text-white" />} />
                        </>
                    )}
                </div>
            )}

            {isChartLoading && <Loading />}
            {chartData && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Submission Breakdown</h3>
                        <PieChartComponent data={chartData.data.pieChart} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Submissions Over Time</h3>
                        <LineChartComponent data={chartData.data.lineChart} />
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="font-semibold text-lg mb-4">Submission Distribution</h3>
                        <HistogramComponent data={chartData.data.histogram} />
                    </div>
                </div>
            )}
        </>
    )
}

export default TotalStat;