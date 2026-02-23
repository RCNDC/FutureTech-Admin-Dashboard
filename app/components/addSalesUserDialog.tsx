import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import CreateUserForm from "./createUserForm";

interface AddSalesUserDialogProps {
    type: 'local' | 'international';
}

export const AddSalesUserDialog = ({ type }: AddSalesUserDialogProps) => {
    const [open, setOpen] = useState(false);

    const title = type === 'local' ? "Add Local Sales" : "Add International Sales";
    const targetRole = type === 'local' ? "Local Sales" : "International Sales";

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-2 h-11 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 border-slate-200 text-slate-700 transition-all active:scale-95 shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Plus className="w-4 h-4" />
                    <span>{title}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-[2rem] border-none shadow-2xl p-8">
                <DialogHeader className="mb-6">
                    <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">
                        {title}
                    </DialogTitle>
                    <p className="text-slate-500 font-medium">
                        Create a new profile for {type} sales representative.
                    </p>
                </DialogHeader>
                <CreateUserForm
                    targetRoleName={targetRole}
                    onSuccess={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
};
