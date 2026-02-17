import axiosInstance from "@/lib/axiosinstance";
import { type response } from "@/types/response";
import { type LocalCompanySubmission } from "@/types/submission";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import Loading from "@/components/loading";
import ShowFile from "@/components/showfile";

type LocalCompanyDetailProps = {
    entry_id: number;
}

const DetailItem = ({ label, value, icon: Icon }: { label: string; value: any; icon?: any }) => (
    <div className="flex flex-col space-y-1 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 transition-all hover:bg-white hover:shadow-sm">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
            {Icon && <Icon className="w-3 h-3" />}
            {label}
        </span>
        <span className="text-sm font-bold text-slate-700 leading-relaxed">
            {value || <em className="text-slate-300 font-medium">Not provided</em>}
        </span>
    </div>
);

const LocalCompanyDetail: FC<LocalCompanyDetailProps> = ({ entry_id }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['localcompany', entry_id],
        queryFn: async () => {
            const res = await axiosInstance.get<response<LocalCompanySubmission[]>>('/register/submission/localcompany/' + entry_id)
            return res.data.data?.pop();
        },

    })

    if (isLoading) return <div className="p-20 flex justify-center"><Loading /></div>;

    const isManual = (data as any)?.isManual;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailItem label="Full Name" value={data?.fullName} />
                <DetailItem label="Company Name" value={data?.companyName} />
                <DetailItem label="Email" value={data?.email} />
                <DetailItem label="Phone Number" value={data?.phoneNo} />
                <DetailItem label="Position" value={data?.position} />
                <DetailItem label="Registered Date" value={data?.registeredDate ? new Date(data.registeredDate).toDateString() : null} />

                {!isManual && (
                    <>
                        <DetailItem label="Registered As" value={data?.registerAs} />
                        <DetailItem label="Number of Attendees" value={data?.numberOfAttendee} />
                        <DetailItem label="Directory List" value={data?.directoryList} />
                        <DetailItem label="Areas of Interest" value={data?.areaOfInterest} />
                        <DetailItem label="Sponsorship" value={data?.sponserShip} />
                    </>
                )}

                {isManual && (
                    <>
                        <DetailItem label="LinkedIn / Social" value={(data as any).socialLinks} />
                        <DetailItem label="Source" value="Manual Registration" />
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ShowFile file={data?.companyLicense} name="Company License" />
                <ShowFile file={data?.companyProfile} name="Company Profile" />
                <ShowFile file={data?.companyWebsite} name="Company Website" />
            </div>
        </div>
    )
}

export default LocalCompanyDetail;
