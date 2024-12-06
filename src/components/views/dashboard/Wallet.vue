<script setup lang="ts">
import { useDashboardStore } from '@str/dashboard.store'
import { capitalize } from 'vue'

// Store
const dashboardStore = useDashboardStore()
// State
const severity: Record<string, 'success' | 'danger'> = {
  active: 'success',
  inactive: 'danger',
}
const checkSeverity = useSeverity(severity)
// Action
function checkIcon(status: 'active' | 'inactive') {
  return status === 'active' ? 'pi-play' : 'pi-pause'
}
</script>

<template>
  <div class="col-span-6">
    <div class="card mb-0">
      <div class="flex justify-between">
        <div>
          <h3 class="text-surface-900 dark:text-surface-0 font-medium text-2xl">
            Wallet
          </h3>
          <div class="flex items-center gap-x-8 mt-8">
            <div
              v-for="(value, key) in dashboardStore.dashboard?.wallet"
              :key
              v-tooltip.top="capitalize(key)"
              class="flex items-center gap-x-2"
            >
              <div
                class="flex items-center justify-center rounded-border size-8"
                :class="checkSeverity[key][0]"
              >
                <i
                  class="pi !text-xl"
                  :class="[checkSeverity[key][1], checkIcon(key)]"
                />
              </div>
              <h3 class="text-surface-900 dark:text-surface-0 font-medium text-2xl">
                {{ value }}
              </h3>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center rounded-border size-10 bg-emerald-100">
          <i class="!text-xl pi pi-wallet text-emerald-500" />
        </div>
      </div>
    </div>
  </div>
</template>
