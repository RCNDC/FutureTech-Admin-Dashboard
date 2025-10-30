import { useAuth } from "@/components/authprovider";
import axiosInstance from "@/lib/axiosinstance";
import { useMutation } from "@tanstack/react-query";

const exportToExcel = (endPoint: string, fileName: string)=>{
    const auth = useAuth();
    const {mutate, isPending} = useMutation({
        mutationFn: async () => {
            const res = await axiosInstance.get(`/export/${endPoint}`, {
                headers: {
                    'Authorization': 'Bearer ' + auth?.token
                },
                responseType: 'blob'
            });
            return res.data;
        },
        onSuccess: (data) => {
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileName}.xlsx`);
            document.body.appendChild(link);
            link.click();
        },
        onError: (error: any) => {
            alert(error.response?.data?.message || 'Error exporting data');
        }
    });

    return {mutate, isPending};
}

export default exportToExcel;