import type { FC } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Delete, Trash } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { useFollowUpNoteStore } from "store/store";
import type { CheckedState } from "@radix-ui/react-checkbox";

type FollowUpPost = {
    title:string;
    description:string;
    noteId:string;
    followUpDate: string;
    isCompleted: number;
    clientName:string
}
const FollowUpList:FC<FollowUpPost> = ({title, description, noteId, followUpDate, isCompleted, clientName})=>{
    const {markCompleted, deleteNote} = useFollowUpNoteStore()
    const onCheck = (checked:CheckedState)=>{
        if(checked){
            markCompleted(noteId, 1);
        }else{
            markCompleted(noteId, 0)
        }
    }

    return(
        <div className="flex items-center justify-between">
            <div className="">
                <h3 className={cn("font-medium text-purple-500", {"line-through": isCompleted===1})}>{clientName}: <span className="font-semibold text-black">{title}</span></h3>
                <span className={cn("text-gray-600 text-sm ",{"line-through": isCompleted===1})}>Follow up date: {new Date(followUpDate).toDateString()}</span>
                <p className={cn("ml-1 text-sm my-1", {"line-through": isCompleted===1})}>{description}</p>
            </div>
            <div className="flex items-center gap-2">
                <Trash className="w-4 h-4 text-red-500" onClick={()=>deleteNote(noteId)}/>
                <Checkbox onCheckedChange={onCheck}  />
            </div>
            
        </div>
    );
}

export default FollowUpList;