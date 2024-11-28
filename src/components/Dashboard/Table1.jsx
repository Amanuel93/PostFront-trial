
// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchplannedTrainingsStart } from "../../redux/planSlice";
// import {
//   flexRender,
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   getFilteredRowModel,
// } from "@tanstack/react-table";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";

// // Define columns for the table
// const columns = [
//   { accessorKey: "id", header: "ID" },
//   { accessorKey: "name", header: "Name" },
//   { accessorKey: "email", header: "E-mail" },
//   { accessorKey: "training", header: "Training" },
// ];

// export default function DataTableDemo() {
//   const dispatch = useDispatch();
//   const { plannedTraining, loading, error } = useSelector(
//     (state) => state.planning
//   );
 

//   // Map data to match table columns
//   const transformedData = plannedTraining?.map((training) => ({
//     id: training?.id,
//     name: training?.username,
//     email: training?.email || "N/A",
//     training: training?.trainingName || "N/A",
//   }));

//   useEffect(() => {
//     dispatch(fetchplannedTrainingsStart());
//   }, [dispatch]);

//   const table = useReactTable({
//     data: transformedData || [],
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     initialState: {
//       pagination: { pageSize: 5 },
//     },
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="w-full overflow-x-auto">
//       <div className="rounded-md border min-w-[600px]">
//         <Table>
//           <TableHeader className="bg-indigo-950 text-white">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id} className="text-center">
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id}>
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length}>No results</TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex justify-between py-4">
//         <Button
//           variant="outline"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchplannedTrainingsStart } from "../../redux/planSlice";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Define columns for the table
const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "E-mail" },
  { accessorKey: "training", header: "Training" },
];

export default function DataTableDemo() {
  const dispatch = useDispatch();
  const { plannedTraining, loading, error } = useSelector(
    (state) => state.planning
  );

  // Map data to match table columns
  const transformedData = plannedTraining?.map((training) => ({
    id: training?.id,
    name: training?.username,
    email: training?.email || "N/A",
    training: training?.trainingName || "N/A",
  }));

  useEffect(() => {
    dispatch(fetchplannedTrainingsStart());
  }, [dispatch]);

  const table = useReactTable({
    data: transformedData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full overflow-x-auto">
      <div className="rounded-md border min-w-[600px]">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-indigo-950 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-center">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="p-3 text-center border border-gray-300"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="text-center hover:bg-gray-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="p-3 text-center border border-gray-300"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4"
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between py-4">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

