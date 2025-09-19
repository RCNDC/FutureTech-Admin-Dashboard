import { type UserResponse } from "@/types/user"
import { DataTable } from "./datatable"
import type { FC } from "react"
import type { ColumnDef } from "@tanstack/react-table"



const UsersTable:FC<{userData: UserResponse[], columns:ColumnDef<UserResponse>[]}> = ({userData, columns})=>{
    
    return(
        <div>
            
            {userData && <DataTable columns={columns} data={userData}/> }
            
        </div>
    )
}

export default UsersTable;