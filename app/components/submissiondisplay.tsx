import type { FC } from "react";
import Loading from "./loading";
import { DataTable } from "./datatable";
import { Button } from "./ui/button";
import exportToExcel from "@/hooks/useExport";
import { Download } from "lucide-react";

type SubmissionDetailProps = {
    name: string;
    exportEndPoint?: string;
    fileName?: string;
    isLoading: boolean;
    data: any;
    columns: ColumnDef<any>[];
    type: string;
}
const SubmissionDetail:FC<SubmissionDetailProps> = ({isLoading, exportEndPoint, fileName, name, data, columns})=>{
    const {mutate, isPending} = exportToExcel(exportEndPoint || '', fileName || 'exported_data');
    const handleExport = () => {
        mutate();
    }
    return(
        <div>
            <div className="space-y-3">
                <div className="flex justify-between items-center flex-wrap">
                    <h3 className="font-semibold md:text-2xl text-center md:text-left">{name}</h3>
                    {
                        exportEndPoint &&
                        <Button onClick={handleExport} disabled={isPending}>Export {isPending ? <Loading/>: <Download className="w-5 h-5"/>} </Button>
                    }
                </div>

                {
                    isLoading && <Loading/>
                }
                {
                    data && <DataTable data={data} columns={columns} showActions={true} type={type}/>
                }
            </div>

        </div>
    )
}

export default SubmissionDetail
