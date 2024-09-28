"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export type Type = {
  id: string;
  username: string;
  title: string;
  obtained: number
  total: number;
  percentage: number;
}

export const columns: ColumnDef<Type>[] = [
  {
    accessorKey: "title",
    header: "Quiz Title",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "obtained",
    header: "Obtained Mark",
  },
  {
    accessorKey: "total",
    header: "Total Mark",
  },
  {
    accessorKey: "percentage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Percentage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
]
