"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  EllipsisVertical,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableRowDataBase } from "@/types/custom";
import { useDispatch } from "react-redux";
import { selectedAppeals } from "@/Slicers/appeal-slicer";

interface tbData {
  tableData: TableRowDataBase[];
}

const columns: ColumnDef<TableRowDataBase>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className="data-[state=checked]:bg-[var(--tertiary-color)] data-[state=checked]:border-[var(--tertiary-color)]"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        className="data-[state=checked]:bg-[var(--tertiary-color)] data-[state=checked]:border-[var(--tertiary-color)]"
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tax_year",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-[#ECF3F9]"
      >
        Tax Year
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("tax_year")}</div>,
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-[#ECF3F9]"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Company
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("company")}</div>,
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <Button
        className="hover:bg-[#ECF3F9]"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        State
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("state")}</div>,
  },
  {
    accessorKey: "assessor",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-[#ECF3F9]"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Assessor
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("assessor")}</div>,
  },
  {
    accessorKey: "account",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-[#ECF3F9]"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Account
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("account")}</div>,
  },
  {
    accessorKey: "appealed_del",
    header: "Appealed deadline",
    cell: ({ row }) => <div>{row.getValue("appealed_del")}</div>,
  },
];

export function TableView({ tableData }: tbData) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  // dispatch
  const dispatch = useDispatch();

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: (updater) => {
      // First calculate the new selection state
      const newSelection =
        typeof updater === "function" ? updater(rowSelection) : updater;

      // Then get the corresponding rows
      const selectedRows = Object.keys(newSelection)
        .map((rowId) => table.getRow(rowId).original)
        .filter(Boolean);

      // Update both states
      setRowSelection(newSelection);
      dispatch(selectedAppeals(selectedRows));
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-end items-center">
        <div className="flex justify-end gap-3 items-center my-3">
          <div className="border border-slate-300 flex gap-2 rounded-lg items-center">
            <span className="pl-3">
              <Search />
            </span>
            <Input
              placeholder="Filter company..."
              value={
                (table.getColumn("company")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("company")?.setFilterValue(event.target.value)
              }
              className="max-w-lg w-56 outline-0 border-none"
            />
          </div>
          <button className="w-7 h-7  flex justify-center items-center border border-green-500 text-green-500 rounded-md">
            <SlidersHorizontal size={15} />
          </button>
          <button className="w-7 h-7 bg-gray-300 rounded-full flex justify-center items-center">
            <EllipsisVertical size={15} />
          </button>
        </div>
      </div>
      <div className="rounded-md">
        <Table className="bg-white">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-[#ECF3F9] hover:bg-[#ECF3F9] border-none"
              >
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
                  className="even:bg-[#F6F7F9] border-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {`${
            table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
            1
          }-${Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )} of ${table.getFilteredRowModel().rows.length}`}
        </div>
        <div className="space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span>
              <ArrowLeft />
            </span>
            Previous
          </Button>
          {Array.from({ length: table.getPageCount() }).map((_, index) => {
            const page = index + 1;
            return (
              <Button
                key={page}
                onClick={() => table.setPageIndex(index)}
                variant={"ghost"}
                className={`${
                  table.getState().pagination.pageIndex === index
                    ? "text-[#2D2E34]"
                    : "text-[#A5A8AF]"
                } cursor-pointer`}
              >
                {page}
              </Button>
            );
          })}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <span>
              <ArrowRight />
            </span>
          </Button>
        </div>
        <div className="flex-1 text-sm text-muted-foreground"></div>
      </div>
    </div>
  );
}
