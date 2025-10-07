import type { LocalCompanySubmission } from "@/types/submission";
import type { ColumnDef } from "@tanstack/react-table";
import { BaseColumns } from "./basecolumns";
import { Button } from "./ui/button";
import { ArrowDownUp } from "lucide-react";

export const partnerColumn: ColumnDef<LocalCompanySubmission>[] = [
    ...(BaseColumns as ColumnDef<LocalCompanySubmission>[]),
    {
        accessorKey: 'companyName',
        header:({column})=>{
            return(
                <Button variant='ghost' onClick={()=>column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Company Name
                    <ArrowDownUp className="w-5 h-5"/>
                </Button>
            )
        }
    },
    
]