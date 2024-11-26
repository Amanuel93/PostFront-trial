import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample Data
const data = [
  {
    id: "1",
    name: 316,
    email: "ken99@yahoo.com",
    training:'HUMAN RESOURCE'
  },  {
    id: "2",
    name: 242,
    email: "Abe45@gmail.com",
    training:'HUMAN RESOURCE'
  },  {
    id:"3",
   name: 837,
   email: "Monserrat44@gmail.com",
    training:'HUMAN RESOURCE'
  },
  {

    id: "4",
   name: 874,
   email: "Silas22@gmail.com",
    training:'HUMAN RESOURCE'
  },
  {
    id: "5",
    name: 721,
    email: "carmella@hotmail.com",
    training:'HUMAN RESOURCE'
},
   
  {
    id: "6",
    name: 316,
    email: "ken99@yahoo.com",
    training:'HUMAN RESOURCE'
  },  {
    id: "7",
   name: 242,
   email: "Abe45@gmail.com",
  },  {
    id: "8",
    name: 837,
    email: "Monserrat44@gmail.com",
    training:'HUMAN RESOURCE'
  },
  {

    id: "g",
   name: 874,
   email: "Silas22@gmail.com",
    training:'HUMAN RESOURCE'
  },
  {
    
    id: "9",
   name: 721,
   email: "carmella@hotmail.comhkhfkhf",
    training:'HUMAN RESOURCE'
  }
  ,
  {
    id: "10",
    name: 316,
   email: "ken99@yahoo.com",
    training:'HUMAN RESOURCE'
  },  {
    id: "11",
   name: 242,
   email: "Abe45yj@gmail.com",
    training:'HUMAN RESOURCE'
  },
  {
    
    id: "12",
    name: 837,
    email: "Monserrat44@gmail.com",
    training:'HUMAN RESOURCE'
  },
  {

    id: "13",
    name: 874,
   email: "Silas22yjuyj@gmail.com",
    training:'HUMAN RESOURCE'
  },
  {

    id: "14",
    name: 721,
   email: "carmellajtyj@hotmail.comhkhfkhf",
    training:'HUMAN RESOURCE'
  },
];

export  const columns = [
  {
     accessorKey: "id",
     header: "Id",
     cell: ({ row }) => (
        <div className="capitalize">{row.getValue("id")}</div>
     ),
},
 {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "E-mail",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "training",
    header: "Training",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("training")}</div>
    ),
  },
];

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
        pagination: {
          pageSize: 5, // Default rows per page set to 5
        },
      },
  });

  return (
    <div className="w-full overflow-x-auto">
    <div className="rounded-md border min-w-[600px]">
      <Table>
        <TableHeader className="bg-indigo-950 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="px-4 py-2 text-center text-black text-[16px]"
                    style={{ flexBasis: `${100 / columns.length}%` }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
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
            className="text-center even:bg-yellow-200 even:text-black hover:text-black"
          >
          {row.getVisibleCells().map((cell) => (
           <TableCell key={cell.id} className="px-4 py-2">
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
    </div>

    {/* Pagination and Row Count Section */}
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="text-sm text-muted-foreground">
        {table.getFilteredRowModel().rows.length} of{" "}
        {table.getCoreRowModel().rows.length} row(s)
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-indigo-900 text-white"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-indigo-900 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
  
  );
}