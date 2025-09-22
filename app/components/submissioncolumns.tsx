import type { SubmissionResponse } from "@/types/submission";
import type { ColumnDef } from "@tanstack/react-table";
import { Button, buttonVariants } from "./ui/button";
import { ArrowUpDown, BoxSelectIcon, MoreVertical, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import FollowUp from "./followup";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { response } from "@/types/response";
import axiosInstance from "@/lib/axiosinstance";
import type { FollowUpListType } from "@/types/followup";
import { useAuth } from "./authprovider";
import Loading from "./loading";
import { Badge } from "./ui/badge";
import SubmissionDetail from "./submissionDetails";

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
        accessorKey: 'companyName',
        header: ({ column }) => {
            return (
                <Button variant='ghost' className='cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Company Name
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
        cell: ({row})=>{
            return(
                <SubmissionDetail entry_id={row.getValue('entry_id')} submissionType="embassy"/>
            )
        }
    },

    {
        header: 'Actions ',
        cell: ({ row }) => {
            const [open, setOpen] = useState(false)

            const auth = useAuth()
            const {data, isLoading, refetch} = useQuery({
        queryKey:['followup', row.getValue('entry_id')],
        queryFn: async ()=>{
            const res = await axiosInstance.get<response<FollowUpListType>>(`/submission/followup?entry_id=${row.getValue('entry_id')}`,{
                headers:{
                    'Authorization': 'Bearer '+auth?.token 
                }
            });
            return res.data;
        },
        retry: 3
        
    });
            return(
                <>
            <Dialog onOpenChange={(open)=>setOpen(open)} open={open}>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex items-center">
                            {isLoading?<Loading/>: <MoreVertical />}                        
                            {
                                data?.data?.status === 'Completed' && <Badge variant="outline" className="bg-green-500 text-white">C</Badge>
                            }
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <DialogTrigger>
                                <Button variant='ghost'>
                                    <Plus className="w-5 h-5"/>    
                                    Followup

                                </Button>
                            </DialogTrigger>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                
                {!isLoading && <FollowUp entryId={row.getValue('entry_id')} clientName={row.getValue('fullName')} open={open} followUp={data?.data}/>}
            </Dialog>
                </>
        )}
    }


]