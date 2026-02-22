import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosinstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./authprovider";

const companySchema = z.object({
    companyName: z.string().min(1, "Company Name is required"),
    fullName: z.string().optional(),
    position: z.string().optional(),
    primaryEmail: z.string().email("Invalid email").min(1, "Primary Email is required"),
    secondaryEmail: z.string().email("Invalid email").min(1, "Secondary Email is required"),
    phoneNumber: z.string().optional(),
    sector: z.string().optional(),
    companyWebsite: z.string().url("Invalid URL").or(z.literal("")).optional(),
    socialLinks: z.string().url("Invalid URL").or(z.literal("")).optional(),
});

type CompanyFormData = z.infer<typeof companySchema>;

export const AddCompanyDialog = ({ type }: { type: 'local' | 'international' }) => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const auth = useAuth();
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CompanyFormData>({
        resolver: zodResolver(companySchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: CompanyFormData) => {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value) formData.append(key, value);
            });
            if (file) {
                formData.append('uploadLicense', file);
            }
            formData.append('type', type);

            const res = await axiosInstance.post('/company/create', formData, {
                headers: {
                    'Authorization': 'Bearer ' + auth?.token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            return res.data;
        },
        onSuccess: () => {
            toast.success("Company added successfully");
            queryClient.invalidateQueries({ queryKey: ['submissions', type === 'local' ? 'localcompany' : 'internationalcompany'] });
            setOpen(false);
            reset();
            setFile(null);
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to add company");
        }
    });

    const onSubmit: SubmitHandler<CompanyFormData> = (data) => {
        mutate(data);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                    <Plus className="w-5 h-5" />
                    <span>Add Company</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] border-none shadow-2xl">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight">Register New Company</DialogTitle>
                    <p className="text-slate-500 font-medium">Please fill in the details below to add a new {type} company.</p>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Company Name *</Label>
                            <Input {...register('companyName')} className="rounded-2xl border-none bg-slate-50 h-14 font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="e.g. Future Tech Addis" />
                            {errors.companyName && <p className="text-rose-500 text-[10px] font-black uppercase ml-1 tracking-wider">{errors.companyName.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Sector</Label>
                            <Input {...register('sector')} className="rounded-2xl border-none bg-slate-50 h-14 font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="e.g. Technology" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Contact Full Name</Label>
                            <Input {...register('fullName')} className="rounded-2xl border-none bg-slate-50 h-14 font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Position</Label>
                            <Input {...register('position')} className="rounded-2xl border-none bg-slate-50 h-14 font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="e.g. CEO" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Primary Email *</Label>
                            <Input {...register('primaryEmail')} className="rounded-2xl border-none bg-slate-50 h-14 font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="primary@company.com" />
                            {errors.primaryEmail && <p className="text-rose-500 text-[10px] font-black uppercase ml-1 tracking-wider">{errors.primaryEmail.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Secondary Email *</Label>
                            <Input {...register('secondaryEmail')} className="rounded-2xl border-none bg-slate-50 h-14 font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="secondary@company.com" />
                            {errors.secondaryEmail && <p className="text-rose-500 text-[10px] font-black uppercase ml-1 tracking-wider">{errors.secondaryEmail.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Phone Number</Label>
                            <Input {...register('phoneNumber')} className="rounded-2xl border-none bg-slate-50 h-14 font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="+251..." />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Company Website</Label>
                            <Input {...register('companyWebsite')} className="rounded-2xl border-none bg-slate-50 h-14 font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="https://..." />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">LinkedIn Profile (URL)</Label>
                        <Input {...register('socialLinks')} className="rounded-2xl border-none bg-slate-50 h-14 font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all" placeholder="https://linkedin.com/company/..." />
                    </div>

                    <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Upload License (PDF or Image)</Label>
                        <div className="relative">
                            <input
                                type="file"
                                id="manual-license"
                                className="hidden"
                                accept="image/*,application/pdf"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                            <label
                                htmlFor="manual-license"
                                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-100 rounded-[2rem] cursor-pointer hover:bg-slate-50 hover:border-emerald-500/30 transition-all group"
                            >
                                {file ? (
                                    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-emerald-100 animate-in fade-in zoom-in duration-300">
                                        <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-black text-slate-800 truncate max-w-[250px]">{file.name}</p>
                                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-0.5">Ready for upload</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-3 group-hover:scale-110 transition-transform">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <p className="text-sm font-black text-slate-600">Select business license</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">PNG, JPG or PDF (Max 10MB)</p>
                                    </>
                                )}
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-slate-100 px-6 h-14">Cancel</Button>
                        <Button type="submit" disabled={isPending} className="bg-slate-900 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest px-10 h-14 hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 disabled:opacity-50">
                            {isPending ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Processing...</span>
                                </div>
                            ) : "Confirm & Register"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
