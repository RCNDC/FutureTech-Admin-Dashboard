import type { LocalCompanySubmission, StartupSubmissions } from "@/types/submission"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "./ui/button"
import { ArrowUpDown, MoreVertical, Plus } from "lucide-react"
import SubmissionDetail from "./submissionDetails"
import { useState } from "react"
import useFollowUpStore from "store/store"
import { useAuth } from "./authprovider"
import { useQuery } from "@tanstack/react-query"
import type { response } from "@/types/response"
import type { FollowUpListType } from "@/types/followup"
import axiosInstance from "@/lib/axiosinstance"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Loading from "./loading"
import { Badge } from "./ui/badge"
import FollowUp from "./followup"

export const startupcolumns: ColumnDef<StartupSubmissions>[] = [
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
        accessorKey: 'startupName',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Startup name
                    <ArrowUpDown className='w-5 h-5' />
                </Button>
            )
        }
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
        cell: (props) => (
            <span className="text-gray-800">{new Date(props.getValue() as string).toDateString()}</span>
        )
    },
    
    {
        header: 'Detail',
        cell: ({ row }) => {
            return (
                <SubmissionDetail entry_id={parseInt(row.getValue('entry_id'))} submissionType="startup" />
            )
        }
    },

    {
        header: 'Actions ',
        cell: ({ row }) => {
            const [open, setOpen] = useState(false)
            const {followUp, initialFollowUp} = useFollowUpStore();
            const auth = useAuth()
            const { data, isLoading, refetch } = useQuery({
                queryKey: ['followup', row.getValue('entry_id')],
                queryFn: async () => {
                    const res = await axiosInstance.get<response<FollowUpListType>>(`/submission/followup?entry_id=${row.getValue('entry_id')}`, {
                        headers: {
                            'Authorization': 'Bearer ' + auth?.token
                        }
                    });
                   
                    return res.data;
                },
                retry: 3

            });
          
            
            return (
                <>
                    <Dialog onOpenChange={(open) => setOpen(open)} open={open}>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className="flex items-center">
                                    {isLoading ? <Loading /> : <MoreVertical />}
                                    {
                                        data?.data?.status === 'Completed' && <Badge variant="outline" className="bg-green-500 text-white">C</Badge>
                                    }
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <DialogTrigger>
                                        <Button variant='ghost'>
                                            <Plus className="w-5 h-5" />
                                            Followup

                                        </Button>
                                    </DialogTrigger>
                                </DropdownMenuItem>
                                <DropdownMenuItem>

                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {!isLoading && <FollowUp entryId={row.getValue('entry_id')} clientName={row.getValue('fullName')} open={open} initalFollowUp={data?.data}/>}
                    </Dialog>
                </>
            )
        }
    }
]