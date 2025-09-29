import type { personalDetail } from "@/types/submission";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";

export const BaseColumns:ColumnDef<personalDetail>[] = [
    {
        accessorKey: 'entry_id',
        header: ({column})=>{
            return(
                <Button variant='ghost' className='cursor-pointer' onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                    ID
                    <ArrowUpDown className='w-5 h-5'/>
                </Button>
            )
        },
    },
    {
        accessorKey: 'fullName',
        header: ({column})=>{
            return(
                <Button variant='ghost' className='cursor-pointer' onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                    Full Name
                    <ArrowUpDown className='w-5 h-5'/>
                </Button>
            )
        }
    },
    {
        accessorKey: 'email',
        header: ({column})=>{
            return(
                <Button variant='ghost' className='cursor-pointer' onClick={()=>column.toggleSorting(column.getIsSorted() === "asc")}>
                    Email
                    <ArrowUpDown className='w-5 h-5'/>
                </Button>
            )
        }
    },
    {
        accessorKey: 'phoneNo',
        header: 'Phone Number'
    }
]