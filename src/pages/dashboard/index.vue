<script setup lang="ts">
import { useDashboardStore } from '@str/dashboard.store'

// Store
const dashboardStore = useDashboardStore()
// Hooks
onBeforeMount(() => dashboardStore.getDashboard())
</script>

<template>
  <div class="grid grid-cols-12 gap-4">
    <!-- Balance -->
    <ViewsDashboardBalance />

    <!-- Wallet -->
    <ViewsDashboardWallet />

    <!-- Transaction -->
    <ViewsDashboardTransaction />
  </div>
</template>

<route lang="json">
{
  "meta": {
    "layout": "AppLayoutDashboard",
    "title": "Dashboard"
  }
}
</route>
