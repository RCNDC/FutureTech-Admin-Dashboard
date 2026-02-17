import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidationSchema, type LoginFormData } from "../types/auth";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosinstance";
import Loading from "./loading";
import { AxiosError } from "axios";
import { toastError } from "@/lib/toast";
import { ShieldCheck, Mail, MoveRight } from "lucide-react";

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(LoginValidationSchema),
    });
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: LoginFormData) => {
            const response = await axiosInstance.post('/auth/login', data);
            return response.data;
        },
        onSuccess: () => {
            navigate('/dashboard/home')
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                toastError(error.response?.data.message || "Authorization failed.");
            } else {
                toastError("System error occurred.");
            }
        }
    })

    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        mutate(data)
    }

    return (
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="space-y-3">
                <Label htmlFor="email" className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 ml-0.5">
                    Account Email
                </Label>
                <div className="relative group">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                        <Mail className="w-5 h-5" />
                    </div>
                    <Input
                        type="email"
                        placeholder="identity@futuretech.com"
                        className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold text-slate-800 placeholder:text-slate-300"
                        {...register('email')}
                    />
                </div>
                {errors.email && <p className="text-rose-500 text-[11px] font-black uppercase tracking-wider ml-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-3">
                <div className="flex items-center justify-between px-0.5">
                    <Label htmlFor="password" className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
                        Security Key
                    </Label>
                    <Link to="/forgot-password" className="text-[11px] font-black uppercase tracking-wider text-emerald-600 hover:text-emerald-700 transition-colors">
                        Reset Access
                    </Link>
                </div>
                <div className="relative group">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <Input
                        type="password"
                        placeholder="••••••••••••"
                        className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold text-slate-800 placeholder:text-slate-300 tracking-widest"
                        {...register('password')}
                    />
                </div>
                {errors.password && <p className="text-rose-500 text-[11px] font-black uppercase tracking-wider ml-1">{errors.password.message}</p>}
            </div>

            {/* Action Button */}
            <div className="pt-4">
                <Button
                    className="w-full h-16 bg-slate-900 text-white font-black rounded-2xl hover:bg-emerald-600 hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98] group flex items-center justify-center gap-3 text-lg tracking-tight"
                    disabled={isPending}
                >
                    {isPending ? (
                        <div className="flex items-center gap-3">
                            <Loading />
                            <span className="opacity-70">Authenticating...</span>
                        </div>
                    ) : (
                        <>
                            <span>Authorize Entry</span>
                            <MoveRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                        </>
                    )}
                </Button>
            </div>
        </form>
    )
}

export default LoginForm;