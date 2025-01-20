<template>
  <AlertDialog v-model:open="isOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This will permanently delete the player data.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="handleDelete">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { usePlayersStore } from "@/stores/players/usePlayersStore";
import { inject, type Ref } from "vue";
import type { PlayerRowType } from "@/components/players/types/PlayerRowType";
import { showMessage } from "@/components/messages/helpers/showMessage";

const playersStore = usePlayersStore();
const player = inject("player") as PlayerRowType;
const isOpen = inject("dialogDeleteIsOpen") as Ref<boolean>;

async function handleDelete() {
  const { success, statusCode, errorMessage } =
    await playersStore.dispatchDeletePlayer(player.id);
  showMessage(success, "The player has been deleted successfully.", statusCode, errorMessage);
}
</script>
