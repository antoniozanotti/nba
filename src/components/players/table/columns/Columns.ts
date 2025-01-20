import type { ColumnDef } from "@tanstack/vue-table";
import type { PlayerRowType } from "../../types/PlayerRowType";
import { h } from "vue";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-vue-next";
import { ColumnActions } from "./actions";

export const Columns: ColumnDef<PlayerRowType>[] = [
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Name", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => row.getValue("full_name"),
  },
  {
    accessorKey: "jersey_number",
    header: () => "Jersey Number",
    cell: ({ row }) => row.getValue("jersey_number"),
  },
  {
    accessorKey: "position",
    header: () => "Position",
    cell: ({ row }) => row.getValue("position"),
  },
  {
    accessorKey: "team_name",
    header: () => "Team Name",
    cell: ({ row }) => row.getValue("team_name"),
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => "Actions",
    cell: ({ row }) => {
      const player = row.original;
      return h("div", { class: "relative" }, h(ColumnActions, { player }));
    },
  },
];
