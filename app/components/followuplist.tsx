import type { FC } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Delete, Trash } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

type FollowUpPost = {
    title:string;
    description:string;
    noteId:string;
    followUpDate: string;
    isCompleted: number;
    clientName:string
}
const FollowUpList:FC<FollowUpPost> = ({title, description, noteId, followUpDate, isCompleted, clientName})=>{
    return(
        <div className="flex items-center justify-between">
            <div className="">
                <h3 className="font-medium text-purple-500">{clientName}</h3>
                <span className="text-gray-600 text-sm ">Follow up date: {new Date(followUpDate).toDateString()}</span>
                <p className="ml-1 text-sm my-1">{description}</p>
            </div>
            <div className="flex items-center gap-2">
                <Trash className="w-4 h-4 text-red-500"/>
                <Checkbox/>
            </div>
            
        </div>
    );
}

export default FollowUpList;