import axiosInstance from "@/lib/axiosinstance";
import { useQuery } from "@tanstack/react-query";
import type { MetaArgs } from "react-router";

export function meta({}:MetaArgs){
    return[
    { title: 'Messages - Future Tech Addis' },
    { name: 'description', content: 'Message sent' },
  ];
}

export function clientLoader(){

}

const Index = ()=>{
    const {data, isLoading} = useQuery({
        queryKey: ['messages'],
        queryFn: async()=>{
            const res = await axiosInstance.get('mail/messages');
            return res.data;
        }
    });
    console.log(data);
    return(
        <div>

        </div>
    )
}

export default Index;