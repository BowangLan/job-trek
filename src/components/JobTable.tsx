"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
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

const colHelper = createColumnHelper<Job>();

const columns = [
  colHelper.accessor("company", {
    header: "Company",
    cell: (info) => (
      <SimpleLinkCell
        name={info.getValue().name}
        href={info.getValue().jobUrl}
      />
    ),
  }),
  colHelper.accessor("jobs", {
    header: "Jobs",
    cell: (info) => {
      return (
        <div className="flex flex-col">
          {info.getValue().map((j) => (
            <SimpleLinkCell key={j.title} href={j.url} name={j.title} />
          ))}
        </div>
      );
    },
  }),
  colHelper.accessor("note", {
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
  const table = useReactTable({
    data: jobData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
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
