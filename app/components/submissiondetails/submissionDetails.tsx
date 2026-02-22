import { Expand } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { FC } from "react";
import EmbassyDetail from "./embassydetail";
import InternationalCompanyDetail from "./internationalcompanydetail";
import LocalCompanyDetail from "./localcompanydetail";
import NGODetail from "./NGOdetail";
import StartupDetail from "./startupdetail";

type SubmissionDetailProps = {
    entry_id: number,
    submissionType: string;
}
const SubmissionDetail: FC<SubmissionDetailProps> = ({ entry_id, submissionType }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className={cn(buttonVariants({ variant: 'default' }))}>
                    <Expand className="w-5 h-5" />
                    <span className="font-medium">View Detail</span>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-none shadow-2xl p-10 pt-16">
                <DialogHeader className="mb-8">
                    <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight">Submission Details</DialogTitle>
                    <DialogDescription className="text-slate-500 font-medium">
                        Comprehensive view of the registration data
                    </DialogDescription>
                </DialogHeader>
                {
                    submissionType === 'embassy' &&
                    <EmbassyDetail entry_id={entry_id} />
                }
                {
                    submissionType === 'internationalcompany' &&
                    <InternationalCompanyDetail entry_id={entry_id} />
                }
                {
                    submissionType === 'localcompany' &&
                    <LocalCompanyDetail entry_id={entry_id} />
                }
                {
                    submissionType === 'ngo' &&
                    <NGODetail entry_id={entry_id} />
                }
                {
                    submissionType === 'startup' &&
                    <StartupDetail entry_id={entry_id} />
                }
            </DialogContent>
        </Dialog>
    )
}

export default SubmissionDetail;
