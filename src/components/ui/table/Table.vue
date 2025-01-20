<template>
  <div>
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm"
        placeholder="Filter by player name..."
        :model-value="table.getColumn(props.filterColumn)?.getFilterValue() as string"
        @update:model-value="
          table.getColumn(props.filterColumn)?.setFilterValue($event)
        "
      />
    </div>
    <div class="border rounded-md">
      <OriginalTable>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </OriginalTable>
    </div>
    <div class="flex items-center justify-end py-4 space-x-2">
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        Next
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/vue-table";

import {
  Table as OriginalTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../external/shadcn/table";

import { ref } from "vue";

import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useVueTable,
} from "@tanstack/vue-table";

import { valueUpdater } from "@/lib/utils";
import { Input } from "../input";
import { Button } from "../button";

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumn: string;
  sortColumn: string;
  initialSortDesc: boolean;
}>();

const columnFilters = ref<ColumnFiltersState>([]);
const sorting = ref<SortingState>([
  {
    id: props.sortColumn,
    desc: props.initialSortDesc,
  },
]);

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  getPaginationRowModel: getPaginationRowModel(),
  state: {
    get columnFilters() {
      return columnFilters.value;
    },
    get sorting() {
      return sorting.value;
    },
  },
  initialState: {
    pagination: {
      pageIndex: 0,
      pageSize: 5,
    },
  },
});
</script>
