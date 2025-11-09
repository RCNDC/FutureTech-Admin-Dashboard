import { Button } from "./ui/button";
import { useRef } from "react";
import * as XLSX from 'xlsx';
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./authprovider";
import axiosInstance from "@/lib/axiosinstance";
import { toast } from "sonner";

export const ImportButton = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const auth = useAuth();

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: any[]) => {
            const res = await axiosInstance.post('/register/submission/event/import', { data }, {
                headers: {
                    'Authorization': `Bearer ${auth?.token}`
                }
            });
            return res.data;
        },
        onSuccess: () => {
            toast.success("Data imported successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "An error occurred while importing data");
        }
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary', cellDates: true });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);

                const processedData = json.map((row: any) => ({
                    'Full Name': `${row['first name']} ${row['last name']}`,
                    'Email': row.email,
                    'Registered Date': row.Date,
                }));

                mutate(processedData);
            };
            reader.readAsBinaryString(file);
        }
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <Button onClick={handleImportClick} disabled={isPending}>
                {isPending ? "Importing..." : "Import"}
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".xlsx"
            />
        </>
    );
}