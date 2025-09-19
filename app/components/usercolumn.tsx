
"use client"

import type { UserResponse } from "@/types/user"
import type { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<UserResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isLocked",
    header: "Is Locked",
  },
  {
    accessorKey: "isNew",
    header: "Is New",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
]
