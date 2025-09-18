import type { SubmissionResponse } from "@/types/submission";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<SubmissionResponse>[] = [
    {
        accessorKey: 'entry_id',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    ID
                    <ArrowUpDown className='w-5 h-5' />
                </Button>
            )
        },

    },
    {
        accessorKey: 'fullName',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Full Name
                    <ArrowUpDown className='w-5 h-5' />
                </Button>
            )
        },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Email
                    <ArrowUpDown className='w-5 h-5' />
                </Button>
            )
        },
    },
    {
        accessorKey: 'phoneNo',
        header: 'Phone Number'
    },

    {
        accessorKey: 'registeredDate',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Registered Date
                    <ArrowUpDown className='w-5 h-5' />
                </Button>
            )
        },
        cell: (props)=>(
            <span className="text-gray-800">{new Date(props.getValue() as string).toDateString()}</span>
        )
    },
]