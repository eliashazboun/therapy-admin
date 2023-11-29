"use client";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

//create client column type based on the client model in the schema.prisma

export type ClientColumn = {
  id: string;
  name: string;
  gender: string;
  birthday: string;
  phone: string;
};

export const columns: ColumnDef<ClientColumn>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },
  {
    header: "Birthday",
    accessorKey: "birthday",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
