import axiosInstance from "@/lib/axiosinstance";
import { type response } from "@/types/response";
import { type StartupSubmissions } from "@/types/submission";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import Loading from "./loading";

type StartupDetailProps = {
    entry_id:number
}
const StartupDetail:FC<StartupDetailProps> = ({entry_id})=>{
    const {data, isLoading} = useQuery({
        queryKey:['startup', entry_id],
        queryFn: async ()=>{
            const res = await axiosInstance.get<response<StartupSubmissions[]>>('/register/submission/startup/'+entry_id);

            return res.data.data?.pop();
        },

    })
    return(
        <div className="grid grid-cols-2 min-w-[80%]">
            {isLoading && <Loading/>}
            {!isLoading && (
                <>
            <span>Startup Name : {data?.startupName}</span>
            <span>Full Name : {data?.fullName}</span>
            <span>Phone Number : {data?.phoneNo}</span>
            <span>Email : {data?.email}</span>
            <span>Governemnt ID : {data?.govId}</span>
            <span>Entry ID : {data?.entry_id}</span>
            <span>Industry : {data?.industry}</span>
            <span>Stage : {data?.stage}</span>
            <span>Pitch Deck : {data?.pitchdeck}</span>
            <span>Registered Date : {data?.registeredDate.toString()}</span>
            <span>Social Website : {data?.socialWebsite}</span>
            <span>Pegasus Application : {data?.appliedPegasus}</span>
            <span>Do you need booth? : {data?.booth}</span>
            <span>Do you require mentorship? : {data?.reqMentorship}</span>


                </>
            )}
        </div>
    )
}

export default StartupDetail;
