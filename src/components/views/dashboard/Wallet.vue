<script setup lang="ts">
import { useDashboardStore } from '@str/dashboard.store'
import { capitalize } from 'vue'

// Store
const dashboardStore = useDashboardStore()
// Action
type WalletType = 'active' | 'inactive'
function getWalletSeverity(type: string) {
  const walletMap: Record<WalletType, string[]> = {
    active: ['bg-emerald-100', 'text-emerald-500', 'pi-play'],
    inactive: ['bg-rose-100', 'text-rose-500', 'pi-pause'],
  }

  return walletMap[type as WalletType] ?? []
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
              v-for="(value, key) in dashboardStore.dashboard.wallet"
              :key
              v-tooltip.top="capitalize(key)"
              class="flex items-center gap-x-2"
            >
              <div
                class="flex items-center justify-center rounded-border size-8"
                :class="[getWalletSeverity(key)[0]]"
              >
                <i
                  class="pi !text-xl"
                  :class="[getWalletSeverity(key)[1], getWalletSeverity(key)[2]]"
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
