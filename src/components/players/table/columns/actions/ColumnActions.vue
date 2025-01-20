<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="openEditDialog()">Edit</DropdownMenuItem>
      <DropdownMenuItem @click="openDeleteDialog()">Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <EditDialog />
  <DeleteDialog />
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { DeleteDialog, EditDialog } from "@/components/players/dialogs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-vue-next";
import type { PlayerRowType } from "@/components/players/types/PlayerRowType";
import { provide, ref } from "vue";

const props = defineProps<{
  player: PlayerRowType;
}>();

const dialogEditIsOpen = ref(false);
const dialogDeleteIsOpen = ref(false);

provide("player", props.player);
provide("dialogDeleteIsOpen", dialogDeleteIsOpen);
provide("dialogEditIsOpen", dialogEditIsOpen);

function openEditDialog() {
  dialogEditIsOpen.value = true;
}

function openDeleteDialog() {
  dialogDeleteIsOpen.value = true;
}
</script>
