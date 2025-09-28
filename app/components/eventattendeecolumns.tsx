import type { EventAttendeeSubmission } from "@/types/submission";
import type { ColumnDef } from "@tanstack/react-table";
import { BaseColumns } from "./basecolumns";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";

export const EventAttendeeColumns: ColumnDef<EventAttendeeSubmission>[] = [
    ...(BaseColumns as ColumnDef<EventAttendeeSubmission>[]),
    {
        accessorKey: 'sectorOfInterest',
        header: ({column})=>{
            return(
                <Button variant='ghost' className='cursor-pointer' onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                    Sector of Interest
                    <ArrowUpDown className='w-5 h-5'/>
                </Button>
            )
        }
    },
    {
        accessorKey: 'ticketType',
        header: ({column})=>{
            return(
                <Button variant='ghost' className='cursor-pointer' onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                    Ticket Type
                    <ArrowUpDown className='w-5 h-5'/>
                </Button>
            )
        }
    }
]