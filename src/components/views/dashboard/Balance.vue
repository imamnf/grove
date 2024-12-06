<script setup lang="ts">
import { useDashboardStore } from '@str/dashboard.store'
import { capitalize } from 'vue'

// Store
const dashboardStore = useDashboardStore()
// State
const severity: Record<string, 'success' | 'danger' | 'info'> = {
  total: 'info',
  revenue: 'success',
  expense: 'danger',
}
const checkSeverity = useSeverity(severity)
// Action
const { formatCurr, formatCurrShort } = useCurrency()
</script>

<template>
  <div class="col-span-12">
    <div class="card mb-0">
      <div class="flex justify-between">
        <div>
          <h3 class="text-surface-900 dark:text-surface-0 font-medium text-2xl">
            Balance
          </h3>
          <div class="flex items-center gap-x-8 mt-8">
            <div
              v-for="(value, key) in dashboardStore.dashboard?.balance"
              :key
              v-tooltip.top="`${capitalize(key)}: ${formatCurr(value)}`"
              class="flex items-center gap-x-2"
            >
              <div
                class="flex items-center justify-center rounded-border size-8"
                :class="checkSeverity[key][0]"
              >
                <i
                  class="pi pi-dollar !text-xl"
                  :class="checkSeverity[key][1]"
                />
              </div>
              <h3 class="text-surface-900 dark:text-surface-0 font-medium text-2xl">
                {{ formatCurrShort(value) }}
              </h3>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center rounded-border size-10 bg-sky-100">
          <i class="!text-xl pi pi-dollar text-sky-500" />
        </div>
      </div>
    </div>
  </div>
</template>
