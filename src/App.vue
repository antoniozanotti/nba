<template>
  <Suspense>
    <main>
      <PlayersPage />
      <Toaster />
    </main>
  </Suspense>
</template>

<script setup lang="ts">
import PlayersPage from "@/components/players/page/PlayersPage.vue";
import { Toaster } from "./components/ui/toast";
</script>
