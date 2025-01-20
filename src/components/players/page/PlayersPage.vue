<template>
  <div class="container py-10 mx-auto">
    <h1 class="text-2xl">NBA Players</h1>
    <Suspense>
      <PlayersTable />
      <template #fallback>
        <div class="container">
          <div class="flex flex-col space-y-4">
            <Skeleton class="h-10 w-full" />
            <div class="space-y-1">
              <Skeleton class="h-10 w-full" />
              <Skeleton class="h-10 w-full" />
              <Skeleton class="h-10 w-full" />
              <Skeleton class="h-10 w-full" />
              <Skeleton class="h-10 w-full" />
              <Skeleton class="h-10 w-full" />
              <Skeleton class="h-10 w-full" />
              <Skeleton class="h-10 w-full" />
              <Skeleton class="h-10 w-full" />
              <Skeleton class="h-10 w-full" />
            </div>
          </div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import PlayersTable from "../table/PlayersTable.vue";
import { Skeleton } from "@/components/ui/skeleton";
</script>
