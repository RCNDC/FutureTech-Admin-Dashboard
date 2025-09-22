import axiosInstance from "@/lib/axiosinstance";
import { type response } from "@/types/response";
import { type EmbassySubmission } from "@/types/submission";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import Loading from "./loading";

type EmbassyDetailProps = {
    entry_id:number
}
const EmbassyDetail:FC<EmbassyDetailProps> = ({entry_id})=>{
    const {data, isLoading} = useQuery({
        queryKey:['embassyc', entry_id],
        queryFn: async ()=>{
            const res = await axiosInstance.get<response<EmbassySubmission[]>>('/register/submission/embassy/'+entry_id);
            console.log(res.data.data?.pop());
            return res.data;
        },
 
    })
    return(
        <div className="grid grid-cols-2">
            {isLoading && <Loading/>}
            {!isLoading && (
                <>
            <span>Full Name: {data?.data[0]?.fullName}</span>
            <span>Email: {data?.data?.pop()?.email}</span>
            <span>Phone Number: {data?.data?.pop()?.phoneNo}</span>
            <span>Country: {data?.data?.pop()?.address}</span>
            <span>Embassy: {data?.data?.pop()?.emabassy}</span>
            <span>Passport: {data?.data?.pop()?.passport}</span>
            <span>Requested Bilateral : {data?.data?.pop()?.requestBilateral}</span>
            <span>Want to Attend Policy Meeting: {data?.data?.pop()?.attendPolicy}</span>
            <span>Has Delegation: {data?.data?.pop()?.anyDelegation}</span>
            <span>Number of Delegation: {data?.data?.pop()?.numDelegation}</span>
                </>
            )}
        </div>
    )
}

export default EmbassyDetail;