import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Column } from "src/types/Table";

interface Props {
  columns: Column[];
  rows: object[];
  isLoading?: boolean;
  noDataText: string;
}

export default function Table({ rows, columns, isLoading, noDataText }: Props) {
  const table = useReactTable({
    data: rows,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full !mt-0 border border-grey-1">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="border border-grey-1 p-2">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-grey-1 p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length}
              className="p-4 text-gray-500 text-center"
            >
              {isLoading ? "Loading..." : noDataText}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
