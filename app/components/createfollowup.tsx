import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import axiosInstance from "@/lib/axiosinstance";
import { useMutation } from "@tanstack/react-query";
import type { FC } from "react";
import { useAuth } from "./authprovider";
import useFollowUpStore from "store/store";
import Loading from "./loading";
import { Plus } from "lucide-react";

type CreateFollowUpProps = {
    entryId:number
}
const CreateFollowUp:FC<CreateFollowUpProps> = ({entryId})=>{
    const auth = useAuth();
     const { initialFollowUp} = useFollowUpStore()
    const { mutate: createFollowUp, isPending: waitingFollowUp } = useMutation({
        mutationFn: async () => {
            const res = await axiosInstance.post('/submission/followup/create', { entry_id: entryId }, {
                headers: {
                    'Authorization': 'Bearer ' + auth?.token
                }
            });
            
            return res.data;
        },
        onSuccess(data) {
            initialFollowUp(data.data, entryId);
        },

    }

    )
    return(
        <span className={cn(buttonVariants({ variant: 'default' }), { 'bg-gray-700': waitingFollowUp })} onClick={() => createFollowUp()} >
                                    {waitingFollowUp ? <Loading /> : <Plus className="w-5 h-5" />}
                                    Create Follow up
                                </span>
    )
}

export default CreateFollowUp;