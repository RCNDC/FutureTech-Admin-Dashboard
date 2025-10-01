  import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    type ColumnFiltersState,
    getFilteredRowModel,
    useReactTable,
  } from "@tanstack/react-table"


  
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "./ui/button"
  import { useState } from "react"
  import { Input } from "./ui/input"
  import { Label } from "./ui/label"
  import { dateRangeFilter, interestFilter, professionFilter } from "@/filters/filter"
import { DateRangeColumnFilter } from "./datefilter"
import { EmailUI } from "./emailui"
  
  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }
  
  export function DataTable<TData, TValue>({
    columns,
    data,
  }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onColumnFiltersChange: setColumnFilters,
      onSortingChange: setSorting,
      
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      initialState:{
        pagination:{
          pageIndex: 0,
          pageSize: 8
        }
      },
      
      state:{
        sorting,
        columnFilters,

      },
      filterFns:{
        dateRange: dateRangeFilter,
        interest: interestFilter,
        profession: professionFilter,
      }

    });
    
  
    return (
      <div className="rounded-md border  w-full px-10">
        <div className="flex flex-wrap items-center justify-center-safe gap-1 my-5">
          <div>
            <Label>Search</Label>
            <Input placeholder="Search by email, Full name..." 
            onChange={(event)=>table.getColumn("fullName")?.setFilterValue(event.target.value)} className="w-full"/>
          </div>
          
            {table.getHeaderGroups().map((headerGroup)=>(
              <>
              {headerGroup.headers.map((header)=>(
                <div key={"filter"+header.id}>
                  {header.column.getCanFilter() ? (
                    <div>
                      {header.column.columnDef.meta?.filter ? (
                        <header.column.columnDef.meta.filter column={header.column} />
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ))}
              </>
            ))}
            <div>
              
              <EmailUI recepiantInfo={table.getSelectedRowModel().rows.map(row=>row.original)}/>
            </div>
          </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        <div className="flex items-center justify-center space-x-2 py-4 ">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }
