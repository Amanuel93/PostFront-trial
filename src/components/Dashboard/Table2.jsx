"use client"
import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"  // Import useNavigate
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data= [
  { id: "1", name: "John Doe", email: "john@gmail.com", department: "HR", position: "Manager" },
  { id: "2", name: "Jane Smith", email: "jane@gmail.com", department: "IT", position: "Developer" },
  { id: "3", name: "Alice Johnson", email: "alice@gmail.com", department: "Finance", position: "Analyst" },
  { id: "4", name: "Bob Lee", email: "bob@gmail.com", department: "Sales", position: "Executive" },
  { id: "5", name: "Charlie Kim", email: "charlie@gmail.com", department: "Marketing", position: "Coordinator" },
  { id: "6", name: "John Doe", email: "john@gmail.com", department: "HR", position: "Manager" },
  { id: "7", name: "Jane Smith", email: "jane@gmail.com", department: "IT", position: "Developer" },
  { id: "8", name: "Alice Johnson", email: "alice@gmail.com", department: "Finance", position: "Analyst" },
  { id: "9", name: "Bob Lee", email: "bob@gmail.com", department: "Sales", position: "Executive" },
  { id: "10", name: "Charlie Kim", email: "charlie@gmail.com", department: "Marketing", position: "Coordinator" },
  { id: "11", name: "John Doe", email: "john@gmail.com", department: "HR", position: "Manager" },
  { id: "12", name: "Jane Smith", email: "jane@gmail.com", department: "IT", position: "Developer" },
  { id: "13", name: "Alice Johnson", email: "alice@gmail.com", department: "Finance", position: "Analyst" },
  { id: "14", name: "Bob Lee", email: "bob@gmail.com", department: "Sales", position: "Executive" },
  { id: "15", name: "Charlie Kim", email: "charlie@gmail.com", department: "Marketing", position: "Coordinator" },
  { id: "16", name: "John Doe", email: "john@gmail.com", department: "HR", position: "Manager" },
  { id: "17", name: "Jane Smith", email: "jane@gmail.com", department: "IT", position: "Developer" },
  { id: "18", name: "Alice Johnson", email: "alice@gmail.com", department: "Finance", position: "Analyst" },
  { id: "19", name: "Bob Lee", email: "bob@gmail.com", department: "Sales", position: "Executive" },
  { id: "20", name: "Charlie Kim", email: "charlie@gmail.com", department: "Marketing", position: "Coordinator" },
  // Add more data as needed
]

export const columns= [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <div>{row.getValue("department")}</div>,
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => <div>{row.getValue("position")}</div>,
  },
]

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [searchInput, setSearchInput] = React.useState('')
  
  const navigate = useNavigate();  // Initialize useNavigate

  const filteredData = React.useMemo(() => {
    return data.filter(user =>
      user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.name.toLowerCase().includes(searchInput.toLowerCase())
    )
  }, [searchInput])

  const table = useReactTable({
    data: filteredData,
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
          pageSize: 10, 
        },
      },
  })

  return (
    <div className="w-full px-4 py-4">
      {/* Search Input */}
      <div className="flex items-center py-4 space-x-2">
        <Input
          placeholder="Search by email or name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="max-w-sm bg-gray-200"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader className="bg-indigo-950 text-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead 
                    key={header.id}
                    className="px-4 py-2 text-center text-black text-[16px]"
                    style={{ flexBasis: `${100 / columns.length}%` }}
                    >
                    {header.isPlaceholder ? null : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
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
                  onClick={() => navigate(`/Dashboard/trainee/${row.getValue("id")}`)} // Handle row click
                  style={{ cursor: 'pointer' }}  // Make rows clickable
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
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
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
  )
}
