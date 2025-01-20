<template>
  <Dialog v-model:open="isOpen">
    <Form
      v-slot="{ handleSubmit }"
      as=""
      keep-values
      :validation-schema="formSchema"
    >
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit player</DialogTitle>
          <DialogDescription> Click save when you're done. </DialogDescription>
        </DialogHeader>
        <form id="dialogForm" @submit="handleSubmit($event, handleEdit)">
          <FormField
            v-slot="{ componentField }"
            name="first_name"
            :model-value="defaultPlayer.first_name"
          >
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="last_name"
            :model-value="defaultPlayer.last_name"
          >
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="jersey_number"
            :model-value="defaultPlayer.jersey_number"
          >
            <FormItem>
              <FormLabel>Jersey Number</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="position"
            :model-value="defaultPlayer.position"
          >
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="team_name"
            :model-value="defaultPlayer.team_name"
          >
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
        <DialogFooter>
          <Button v-if="isLoading" disabled>
            <Loader2 className="animate-spin" /> Saving
          </Button>
          <Button v-else type="submit" form="dialogForm">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Form>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { usePlayersStore } from "@/stores/players/usePlayersStore";
import { inject, ref, type Ref } from "vue";
import type { PlayerRowType } from "@/components/players/types/PlayerRowType";
import type { PlayerType } from "@/services/players/types/PlayerType";
import { showMessage } from "@/components/messages/helpers/showMessage";

const formSchema = toTypedSchema(
  z.object({
    first_name: z.string().min(2).max(50),
    last_name: z.string().min(2).max(50),
    jersey_number: z.string().min(1).max(3),
    position: z.string().min(1).max(50),
    team_name: z.string().min(2).max(50),
  })
);

const playersStore = usePlayersStore();
const player = inject("player") as PlayerRowType;
const defaultPlayer = ref<PlayerRowType>(player);
const isOpen = inject("dialogEditIsOpen") as Ref<boolean>;
const isLoading = ref(false);

async function handleEdit(formValues: any) {
  isLoading.value = true;
  const { data } = await playersStore.getPlayerById(player.id);
  defaultPlayer.value = { id: player.id, ...formValues };
  let updatedPlayer: PlayerType = data;
  updatedPlayer.first_name = formValues.first_name;
  updatedPlayer.last_name = formValues.last_name;
  updatedPlayer.jersey_number = formValues.jersey_number;
  updatedPlayer.position = formValues.position;
  updatedPlayer.team.name = formValues.team_name;
  const { success, statusCode, errorMessage } =
    await playersStore.dispatchUpdatePlayer(updatedPlayer);
  showMessage(
    success,
    "The player has been updated successfully.",
    statusCode,
    errorMessage
  );
  isOpen.value = false;
  isLoading.value = false;
}
</script>
