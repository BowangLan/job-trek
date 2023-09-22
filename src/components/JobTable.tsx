"use client";

import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Job } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import jobData from "@/../data/jobs.json";
import { Input } from "./ui/input";
import { compareItems, rankItem } from "@tanstack/match-sorter-utils";

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the ranking info
  addMeta(itemRank);

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const colHelper = createColumnHelper<Job>();

const columns = [
  colHelper.accessor("company", {
    id: "company",
    header: "Company",
    cell: (info) => (
      <div className="h-full">
        <SimpleLinkCell
          name={info.getValue().name}
          href={info.getValue().jobUrl}
        />
      </div>
    ),
    filterFn: "fuzzy",
  }),
  colHelper.accessor("jobs", {
    id: "jobs",
    header: "Jobs",
    cell: (info) => {
      return (
        <div className="flex flex-col">
          {info.getValue().map((j, i) => (
            <SimpleLinkCell key={i} href={j.url} name={j.title} />
          ))}
        </div>
      );
    },
    filterFn: "fuzzy",
  }),
  colHelper.accessor("note", {
    id: "note",
    header: "Note",
    cell: (info) => info.getValue(),
  }),
];

function SimpleLinkCell({ name, href }: { name: string; href: string }) {
  return (
    <a href={href} target="_blank" className="text-blue-600 hover:underline">
      {name}
    </a>
  );
}

export function JobTable() {
  const [columnFilters, setColumnFilters] = useState(
    [],
  );

  const table = useReactTable({
    data: jobData,
    columns,
    filterFns: {
      // fuzzy: fuzzyFilter,
      fuzzy: (row, columnId, value, addMeta) => {
        return (JSON.stringify(row.getValue(columnId)) as string).toLowerCase().includes(
          value,
        );
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <div className="p-4 w-full md:w-[800px]">
      <div className="flex items-center gap-4 mb-2">
        <Input
          placeholder="Search companies"
          value={(table.getColumn("company")?.getFilterValue() as string) ?? ""}
          onChange={(e) => {
            table.getColumn("company")?.setFilterValue(e.target.value);
          }}
          className="w-[240px]"
        />
        <Input
          placeholder="Search jobs"
          value={(table.getColumn("jobs")?.getFilterValue() as string) ?? ""}
          onChange={(e) => {
            table.getColumn("jobs")?.setFilterValue(e.target.value);
          }}
          className="w-[240px]"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup, i) => (
            <TableRow key={i}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
