import { useState, type FC } from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Plus } from "lucide-react"
import { Button, buttonVariants } from "./ui/button"
import FollowUpList from "./followuplist"
import FollowForm from "./followupForm"
import { useMutation, useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axiosinstance"
import { cn } from "@/lib/utils"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import Loading from "./loading"
import { useAuth } from "./authprovider"
import { toast } from "sonner"
import { toastSuccess } from "@/lib/toast"
import type { CheckedState } from "@radix-ui/react-checkbox"
import { type response } from "@/types/response"
import { type FollowUpNotes } from "@/types/followupnotes"
import { type FollowUpListType } from "@/types/followup"

type FollowUpProps = {
    entryId: number,
    clientName: string;
    followUp:FollowUpListType | undefined;
    open: boolean
}
const FollowUp: FC<FollowUpProps> = ({ entryId, clientName, open, followUp }) => {
    const auth = useAuth();
    
    
    

    const {mutate:createFollowUp, isPending:waitingFollowUp} = useMutation({
            mutationFn: async ()=>{
                const res = await axiosInstance.post('/submission/followup/create', {entry_id: entryId},{
                    headers:{
                        'Authorization': 'Bearer '+auth?.token
                    }
                });
                return res.data;
            },
            
        }
        
    )

    const {mutate:updateStatus, isPending:updating} = useMutation({
        mutationFn: async (status:string)=>{
            console.log()
            const res = await axiosInstance.post('/submission/followup/updatestatus', {status: status, followUpId:followUp?.id},{
                headers:{
                    'Authorization': 'Beare '+auth?.token
                }
            });
            return res.data;
        },
        onSuccess: ()=>{
            toastSuccess('Status Updated');
        }
    })
    const {data:followupNotes, isLoading:loadingNotes, refetch:fetchNotes} = useQuery({
        queryKey:['notes', followUp?.id],
        queryFn:async ()=>{
            const res = await axiosInstance.get<response<FollowUpNotes[]>>('/progress/followupnote/'+followUp?.id,{
                headers:{
                    'Authorization': 'Bearer '+auth?.token
                }
            });
            return res.data
        },
        enabled: open
    })
    const onChecked = (e:CheckedState)=>{
        if(e){
            updateStatus('Completed');
        }else{
            updateStatus('NotStarted');
        }
    }
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle >
                    Follow up

                </DialogTitle>
                <DialogDescription className="flex justify-between items-center">
                    Manage your followup
                    <div >
                        
                        
                        {
                            !followUp ?  (

                            <span className={cn(buttonVariants({variant: 'default'}),{'bg-gray-700': waitingFollowUp})} onClick={()=>createFollowUp()} >
                                {waitingFollowUp?<Loading/>: <Plus className="w-5 h-5"/>}
                                Create Follow up
                            </span>
                            ):(
                                <div className="flex items-center gap-2">
                                    <Label>Completed</Label>
                                    {!updating ? 
                                        <Checkbox onCheckedChange={(e)=>onChecked(e)} checked={followUp.status === 'Completed'}/>:<Loading/>
                                    
                                    }
                                </div>
                            )
                        }

                    </div>
                </DialogDescription>
            </DialogHeader>
            {
                followUp &&
            <div className="space-y-2">
                <FollowForm entry_id={entryId} clientName={clientName} followUpId={followUp.id} refetch={fetchNotes}/>
                <h1 className="text-lg text-gray-700 text-center underline">Notes</h1>
                <div className="max-h-56 overflow-y-scroll">
                    {
                        !followupNotes || followupNotes?.data?.length === 0 &&(
                            <span className="text-center text-sm text-gray-600">No notes found</span>
                        )
                    }
                    {
                        followupNotes?.data && followupNotes?.data.map((note:FollowUpNotes)=>(
                            <FollowUpList title={note?.title} description={note?.description} noteId={note?.Id} isCompleted={note?.isCompleted} followUpDate={note?.followUpDate} clientName={clientName}/>
                        ))
                    }
                </div>
            </div>
            }
            <DialogFooter>

            </DialogFooter>
        </DialogContent>
    )

}

export default FollowUp;