import axiosInstance from "@/lib/axiosinstance";
import { type response } from "@/types/response";
import { type InternationalCompaniesSubmission } from "@/types/submission";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import Loading from "./loading";

type InternationalCompanyDetailProps = {
    entry_id:number
}
const InternationalCompanyDetail:FC<InternationalCompanyDetailProps> = ({entry_id})=>{
    const {data, isLoading} = useQuery({
        queryKey:['internationalcompany', entry_id],
        queryFn: async ()=>{
            const res = await axiosInstance.get<response<InternationalCompaniesSubmission[]>>('/register/submission/internationalcompany/'+entry_id);

            return res.data.data?.pop();
        },

    })
    return(
        <div className="grid grid-cols-2 min-w-[80%]">
            {isLoading && <Loading/>}
            {!isLoading && (
                <>
            <span>Full Name: {data?.fullName}</span>
            <span>Company Name: {data?.companyName}</span>
            <span>Email : {data?.email}</span>
            <span>Phone Number : {data?.phoneNo}</span>
            <span>Entry Id: {data?.entry_id}</span>
            <span>Passport : {data?.passport}</span>
            <span>Company Profile: {data?.companyProfile}</span>
            <span>Company Website: {data?.companyWebsite}</span>
            <span>Address: {data?.address}</span>
            <span>Registered Date : {data?.registeredDate.toString()}</span>
            <span>Pitch Product : {data?.pitchProduct}</span>
            <span>Areas of Interest: {data?.areaOfInterest}</span>
            <span>Interest Type: {data?.interestType}</span>
            <span>Business Schedule: {data?.b2Schedule}</span>
            <span>Sponsorship Tier : {data?.sponsorshipTier}</span>

                </>
            )}
        </div>
    )
}

export default InternationalCompanyDetail;
