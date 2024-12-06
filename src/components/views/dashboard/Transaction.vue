<script setup lang="ts">
import { useDashboardStore } from '@str/dashboard.store'
import { capitalize } from 'vue'

// Store
const dashboardStore = useDashboardStore()
// State
const severity: Record<string, 'success' | 'danger' | 'info'> = {
  revenue: 'success',
  expense: 'danger',
  transfer: 'info',
}
const checkSeverity = useSeverity(severity)
// Action
type TransactionType = 'revenue' | 'expense' | 'transfer'
function checkIcon(type: string) {
  const iconMap: Record<TransactionType, string> = {
    revenue: 'pi-arrow-up',
    expense: 'pi-arrow-down',
    transfer: 'pi-arrows-v',
  }

  return iconMap[type as TransactionType] ?? []
}
</script>

<template>
  <div class="col-span-6">
    <div class="card mb-0">
      <div class="flex justify-between">
        <div>
          <h3 class="text-surface-900 dark:text-surface-0 font-medium text-2xl">
            Transaction
          </h3>
          <div class="flex items-center gap-x-8 mt-8">
            <div
              v-for="(value, key) in dashboardStore.dashboard?.transaction"
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
        <div class="flex items-center justify-center rounded-border size-10 bg-fuchsia-100">
          <i class="!text-xl pi pi-receipt text-fuchsia-500" />
        </div>
      </div>
    </div>
  </div>
</template>
