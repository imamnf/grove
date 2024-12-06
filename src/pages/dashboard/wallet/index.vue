<script setup lang="ts">
import { useWalletStore } from '@str/wallet.store'

// Lazy Components
const LazyViewsWalletAdd = defineAsyncComponent(() => import('@views/wallet/Add.vue'))
// Store
const walletStore = useWalletStore()
// Action
const { checkStatus, checkType } = useWallet()
const { formatCurr, formatCurrShort } = useCurrency()
// Hooks
onBeforeMount(() => walletStore.getAllWallet())
/**
 * Add Wallet
 */
// State
const isAddWallet = ref(false)
</script>

<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-3">
      <div class="card cursor-pointer" @click="isAddWallet = true">
        <div class="flex justify-center items-center gap-x-4">
          <i class="pi pi-plus !text-2xl" />
          <span class="text-2xl font-medium">Add New</span>
        </div>
      </div>
    </div>
    <div
      v-for="wallet in walletStore.state.data"
      :key="wallet.id"
      class="col-span-3"
    >
      <div class="card mb-0">
        <div class="flex justify-between">
          <div>
            <span class="block text-muted-color font-medium mb-1">
              {{ wallet.type.name }}
            </span>

            <RouterLink
              class="text-surface-900 dark:text-surface-0 font-medium text-2xl hover:underline"
              :to="{
                name: 'dashboard-wallet-slode',
                params: { slode: `${wallet.slug}_${wallet.code}` },
              }"
            >
              {{ wallet.name }}
            </RouterLink>

            <h3 v-tooltip.top="formatCurr(wallet.balance)" class="text-4xl mt-4">
              {{ formatCurrShort(wallet.balance) }}
            </h3>
          </div>
          <div
            class="flex items-center justify-center rounded-border size-10"
            :class="checkStatus(wallet.status, wallet.balance)[0]"
          >
            <i
              class="!text-xl"
              :class="[
                checkType(wallet.type.slug),
                checkStatus(wallet.status, wallet.balance)[1],
              ]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <LazyViewsWalletAdd v-model="isAddWallet" />
</template>

<route lang="json">
{
  "meta": {
    "layout": "AppLayoutDashboard",
    "title": "Wallet"
  }
}
</route>
