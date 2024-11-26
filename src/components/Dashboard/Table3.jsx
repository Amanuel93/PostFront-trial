// "use client";

// import * as React from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useSelector, useDispatch } from "react-redux";
// import { getAdminsStart, deleteAdminStart } from "../../redux/createAdminSlice";

// export const columns = [
//   {
//     accessorKey: "id",
//     header: "ID",
//     cell: ({ row }) => <div>{row.getValue("id")}</div>,
//   },
//   {
//     accessorKey: "name",
//     header: "Name",
//     cell: ({ row }) => <div>{row.getValue("name")}</div>,
//   },
//   {
//     accessorKey: "password",
//     header: "Password",
//     cell: ({ row }) => <div>{row.getValue("password")}</div>,
//   },
//   {
//     accessorKey: "email",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Email
//       </Button>
//     ),
//     cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
//   },
// ];

// export default function DataTableDemo() {
//   const dispatch = useDispatch();
//   const { admins, loading } = useSelector((state) => state.admin);
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     // Dispatch the action to fetch admins
//     dispatch(getAdminsStart());
//   }, [dispatch]);

//   const [sorting, setSorting] = React.useState([]);
//   const [columnFilters, setColumnFilters] = React.useState([]);
//   const [columnVisibility, setColumnVisibility] = React.useState({});
//   const [rowSelection, setRowSelection] = React.useState({});
//   const [searchInput, setSearchInput] = React.useState("");

//   const filteredData = React.useMemo(() => {
//     return admins.filter(
//       (user) =>
//         user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
//         user.name.toLowerCase().includes(searchInput.toLowerCase())
//     );
//   }, [searchInput, admins]);

//   const table = useReactTable({
//     data: filteredData,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//     initialState: {
//       pagination: {
//         pageSize: 10,
//       },
//     },
//   });

//   const handleDeleteAdmin = (id) => {
//     dispatch(deleteAdminStart({ id }));
//   };

//   return (
//     <div className="w-full px-4 py-4">
//       <div className="flex items-center py-4 space-x-2">
//         <Input
//           placeholder="Search by email or name..."
//           value={searchInput}
//           onChange={(e) => setSearchInput(e.target.value)}
//           className="max-w-sm bg-gray-200"
//         />
//       </div>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="rounded-md border overflow-x-auto">
//           <Table>
//             <TableHeader className="bg-indigo-950 text-black">
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <TableHead
//                       key={header.id}
//                       className="px-4 py-2 text-center text-black text-[16px]"
//                       style={{ flexBasis: `${100 / columns.length}%` }}
//                     >
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//               {table.getRowModel().rows?.length ? (
//                 table.getRowModel().rows.map((row) => (
//                   <TableRow
//                     key={row.id}
//                     data-state={row.getIsSelected() && "selected"}
//                     className="text-center even:bg-yellow-200 even:text-black hover:text-black"
//                   >
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id}>
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </TableCell>
//                     ))}
//                     <TableCell>
//                       <Button
//                         variant="destructive"
//                         onClick={() => handleDeleteAdmin(row.getValue("id"))}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} className="h-24 text-center">
//                     No results.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       )}
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//           className="bg-indigo-900 text-white"
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//           className="bg-indigo-900 text-white"
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }

import * as React from "react";
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSelector, useDispatch } from "react-redux";
import { getAdminsStart, deleteAdminStart,getAdminsSuccess } from "../../redux/createAdminSlice";

export const columns = [
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
    accessorKey: "password",
    header: "Password",
    cell: ({ row }) => <div>{row.getValue("password")}</div>,
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
];

export default function DataTableDemo() {
  const dispatch = useDispatch();
  const { admins, loading } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  // This will trigger re-render after state change
  React.useEffect(() => {
    dispatch(getAdminsStart());
  }, [dispatch]);

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [searchInput, setSearchInput] = React.useState("");

  const filteredData = React.useMemo(() => {
    return admins.filter(
      (user) =>
        user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [searchInput, admins]);

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
  });

  const handleDeleteAdmin = (id) => {
    const updatedAdmins = admins.filter((admin) => admin.id !== id);
    dispatch(getAdminsSuccess(updatedAdmins)); // Optimistically update the admin list in the state
    dispatch(deleteAdminStart({ id }));
  };

  return (
    <div className="w-full px-4 py-4">
      <div className="flex items-center py-4 space-x-2">
        <Input
          placeholder="Search by email or name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="max-w-sm bg-gray-200"
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
                      {header.isPlaceholder
                        ? null
                        : flexRender(
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
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteAdmin(row.getValue("id"))}
                      >
                       {loading ? "Loading" : "Delete"} 
                      </Button>
                    </TableCell>
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
      )}
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
  );
}

