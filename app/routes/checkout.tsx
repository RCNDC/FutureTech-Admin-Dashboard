import { useNavigate, type ClientLoaderFunctionArgs } from "react-router";
import type { Route } from "../+types/root";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AttendeeValidationSchema, type AttendeeValidationType } from "@/types/attendee";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosinstance";
import type { response } from "@/types/response";
import { toastError, toastSuccess } from "@/lib/toast";
import { AxiosError } from "axios";
import Loading from "@/components/loading";
import { Check, Ticket } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Checkout - Future Tech Addis" },
    { name: "description", content: "Checkout page for tickets" },
  ];
}

export async function clientLoader({request}:ClientLoaderFunctionArgs){
    const url = new URL(request.url);
    const fullname = url.searchParams.get('fullname');
    const email = url.searchParams.get('email');
    const phone = url.searchParams.get('phone');
    const attendeType = url.searchParams.get('attendeType');
    console.log(attendeType);
    return {
        fullname,
        email,
        phone,
        attendeType
    }

}



const CheckOut = ({loaderData}: Route.ComponentProps)=>{
    const navigate = useNavigate();
    const {mutate, isPending} = useMutation({
        mutationFn: async(data:AttendeeValidationType)=>{
            const res = await axiosInstance.post<response<any>>('/attendee/checkout', data);
            return res.data;
        },
        onSuccess: (data)=>{
            if(data.data){
                toastSuccess('Order Created Successfull');
                navigate('/checkout/completed')
            }
        },
        onError:(error)=>{
            if(error instanceof AxiosError){
                toastError('Something went wrong. Please try again!');
            }
        }
    })
    const {register, handleSubmit, formState:{errors}} = useForm<AttendeeValidationType>({
        resolver: zodResolver(AttendeeValidationSchema),
        defaultValues:{
            email: loaderData.email,
            fullname: loaderData.fullname,
            phone: loaderData.phone,

        }
    });
    const submit:SubmitHandler<AttendeeValidationType> = (data)=>{
        mutate(data)
    }
    return(
        <div>
            {
                loaderData && loaderData?.attendeType === 'Event' &&
            <form className="space-y-4 md:w-[60%] mx-auto" onSubmit={handleSubmit(submit)}>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                    <div className="space-y-2">
                        <Label htmlFor="fullname">Full Name</Label>
                        <Input type="text" {...register('fullname')}/>
                        {errors.fullname && <span className="text-red-500 text-sm font-semibold">{errors.fullname?.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" {...register('email')}/>
                        {errors.email && <span className="text-red-500 text-sm font-semibold">{errors.email?.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input type="tel" {...register('phone')}/>
                        {errors.phone && <span className="text-red-500 text-sm font-semibold">{errors.phone?.message}</span>}
                    </div>
                </div>
                <Button className="w-full bg-purple-500 text-white font-medium" disabled={isPending}>
                    Order
                    {!isPending && <Ticket className="w-5 h-5"/>}
                    {isPending && <Loading/>}
                </Button>
            </form>
            }
            {
                loaderData && loaderData?.attendeType === 'Conference' &&
                <div className="w-60 h-60 shadow-md rounded-md text-center">
                    <Check className="w-32 h-32 fill-green-500 text-white"/>
                    <h4>Email has been sent. Please check your email</h4>
                </div>
            }

        </div>
    )
}

export default CheckOut;