import axiosInstance from "@/lib/axiosinstance"
import { type AttendeeResponse } from "@/types/attendee"
import { type response } from "@/types/response"
import { useQuery } from "@tanstack/react-query"
import { DataTable } from "./datatable"
import { columns } from "./attendeecolumns"
import Loading from "./loading"
import type { FC } from "react"



const AttendeeTable:FC<{attendeeData: AttendeeResponse[]}> = ({attendeeData})=>{
    
    return(
        <div>
            
            {attendeeData && <DataTable columns={columns} data={attendeeData}/> }
            
        </div>
    )
}

export default AttendeeTable;