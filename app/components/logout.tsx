import { LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { useMutation } from "@tanstack/react-query"
import axiosInstance from "@/lib/axiosinstance"
import { toastError, toastSuccess } from "@/lib/toast"
import { useNavigate } from "react-router"
import Loading from "./loading"

const Logout = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const res = await axiosInstance.post('/auth/logout');
            return res.data;
        },
        onSuccess() {
            toastSuccess('Logged out');
            navigate('/login')
        },
        onError() {
            toastError('Something went wrong!');
        }
    })

    return (
        <button
            onClick={() => mutate()}
            disabled={isPending}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold group shadow-sm hover:shadow-red-500/20 active:scale-95"
        >
            {isPending ? <Loading /> : (
                <>
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="tracking-wide">Logout Session</span>
                </>
            )}
        </button>
    )
}

export default Logout;