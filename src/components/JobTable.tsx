"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Job } from "@/types";
import jobData from "@/../data/jobs.json";

const colHelper = createColumnHelper<Job>();

const columns = [
  colHelper.accessor("company", {
    cell: (info) => (
      <SimpleLinkCell
        name={info.getValue().name}
        href={info.getValue().jobUrl}
      />
    ),
  }),
  colHelper.accessor("jobs", {
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
];

function SimpleLinkCell({ name, href }: { name: string; href: string }) {
  return <a href={href} target="_blank">{name}</a>;
}

export function JobTable() {
  const table = useReactTable({
    data: jobData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
