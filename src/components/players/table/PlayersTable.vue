<template>
  <Table
    :columns="Columns"
    :data="
      playersStore.players.map((player) => {
        return {
          id: player.id,
          full_name: player.first_name + ' ' + player.last_name,
          first_name: player.first_name,
          last_name: player.last_name,
          jersey_number: player.jersey_number,
          position: player.position,
          team_name: player.team.name,
        };
      })
    "
    filterColumn="full_name"
    sortColumn="full_name"
    :initialSortDesc="false"
  />
</template>

<script setup lang="ts">
import { Columns } from "./columns";
import { Table } from "@/components/ui/table";
import { usePlayersStore } from "@/stores/players/usePlayersStore";

const playersStore = usePlayersStore();
await playersStore.dispatchGetPlayers();
</script>
