import axiosInstance from "@/lib/axiosinstance";
import { type response } from "@/types/response";
import { type InternationalCompaniesSubmission } from "@/types/submission";
import { useQuery } from "@tanstack/react-query";
import { useState, type FC } from "react";
import Loading from "@/components/loading";
import ShowFile from "@/components/showfile";

type InternationalCompanyDetailProps = {
    entry_id: number;
}

const DetailItem = ({ label, value, icon: Icon }: { label: string; value: any; icon?: any }) => (
    <div className="flex flex-col space-y-1 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 transition-all hover:bg-white hover:shadow-sm">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
            {Icon && <Icon className="w-3 h-3" />}
            {label}
        </span>
        <span className="text-sm font-bold text-slate-700 leading-relaxed break-all">
            {value || <em className="text-slate-300 font-medium">Not provided</em>}
        </span>
    </div>
);

const InternationalCompanyDetail: FC<InternationalCompanyDetailProps> = ({ entry_id }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['internationalcompany', entry_id],
        queryFn: async () => {
            const res = await axiosInstance.get<response<InternationalCompaniesSubmission[]>>('/register/submission/internationalcompany/' + entry_id);
            return res.data.data?.pop();
        },
    });

    if (isLoading) return <div className="p-20 flex justify-center"><Loading /></div>;

    const isManual = data?.isManual;
    const addressRegex = /country";s:\d+:"([^"]+)";/g;
    const country = data?.address ? addressRegex.exec(data.address)?.[1] : null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailItem label="Full Name" value={data?.fullName} />
                <DetailItem label="Company Name" value={data?.companyName} />
                <DetailItem label="Email" value={data?.email} />
                <DetailItem label="Secondary Email" value={data?.secondaryEmail} />
                <DetailItem label="Phone Number" value={data?.phoneNo} />
                <DetailItem label="Registered Date" value={data?.registeredDate ? new Date(data.registeredDate).toDateString() : null} />

                {!isManual && (
                    <>
                        <DetailItem label="Country" value={country} />
                        <DetailItem label="Pitch Product" value={data?.pitchProduct} />
                        <DetailItem label="Areas of Interest" value={data?.areaOfInterest} />
                        <DetailItem label="Schedule B2B" value={data?.b2Schedule} />
                        <DetailItem label="Sponsorship Tier" value={data?.sponsorshipTier} />
                    </>
                )}

                {isManual && (
                    <>
                        <DetailItem label="Sector" value={data?.sector} />
                        <div className="md:col-span-2">
                            <DetailItem label="LinkedIn / Social" value={data?.socialLinks} />
                        </div>
                        <DetailItem label="Source" value="Manual Registration" />
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ShowFile file={data?.passport || ""} name="Passport / ID" />
                <ShowFile file={data?.companyProfile || ""} name="Company Profile" />
                <ShowFile file={data?.companyWebsite || ""} name="Company Website" />
                {(data as any).upgradeLicense && <ShowFile file={(data as any).upgradeLicense || ""} name="License Document" />}
            </div>
        </div>
    )
}

export default InternationalCompanyDetail;
