import axiosInstance from "@/lib/axiosinstance";
import type { Route } from "../+types/root";
import ResetPasswordForm from "@/components/newpasswordform";
import { redirect, useNavigate } from "react-router";
import type { response } from "@/types/response";
import Loading from "@/components/loading";

export async function clientLoader({params}:Route.ClientLoaderArgs){
        const res = await axiosInstance.post<response<any>>('/user/reset-password/'+params.param);
        return {message:res.data.message};
}

export function HydrateFallback(){
    return <div className="flex justify-center text-center ">
        <Loading/>
    </div>
}

export default function ResetPassword({
  loaderData,
  params
}: Route.ComponentProps){
    const navgate = useNavigate();
    if(loaderData && loaderData?.message !== 'success' && params)
    {
        navgate('/login')
    }
    
    return(
        <div className="flex justify-center items-center ">
        <div className="md:w-1/2 p-6  rounded-lg shadow-lg ">
        <h2 className="text-2xl font-semibold mb-4 text-center text-purple-900">Reset Passwword</h2>
            <ResetPasswordForm token={params?.param || ''}/>
        </div>
        </div>
    )
}