<script setup lang="ts">
import { useWalletStore } from '@str/wallet.store'

import { useRoute } from 'vue-router/auto'

// Lazy Components
const LazyViewsWalletEdit = defineAsyncComponent(() => import('@views/wallet/Edit.vue'))
// Store
const walletStore = useWalletStore()
// State
const route = useRoute('dashboard-wallet-slode')
const slodeParams = route.params.slode
const isEditWallet = ref(false)
// Action
const { checkStatus, checkType } = useWallet()
const { formatCurr, formatCurrShort } = useCurrency()

type Transaction = 'revenue' | 'expense' | 'transfer'
function checkTransaction(transaction: string) {
  const transactionMap: Record<Transaction, string[]> = {
    revenue: ['bg-emerald-100', 'dark:bg-emerald-400/10', 'text-emerald-500', 'pi-arrow-up'],
    expense: ['bg-rose-100', 'dark:bg-rose-400/10', 'text-rose-500', 'pi-arrow-down'],
    transfer: ['bg-sky-100', 'dark:bg-sky-400/10', 'text-sky-500', 'pi-arrows-v'],
  }

  return transactionMap[transaction as Transaction] ?? ['bg-fuchsia-100', 'dark:bg-fuchsia-400/10', 'text-fuchsia-500']
}
// Hooks
onBeforeMount(() => {
  walletStore.getSingleWallet(slodeParams)
})
/**
 * Change Wallet Status
 */
function onChangeWalletStatus(status: boolean) {
  const payload = {
    status,
  }

  walletStore.updateWalletStatus(payload, slodeParams)
}
</script>

<template>
  <div class="grid grid-cols-12 gap-4">
    <template v-for="wallet in walletStore.walletState.data" :key="wallet.id">
      <div class="col-span-4">
        <div class="card mb-0">
          <div class="flex justify-between">
            <div>
              <span class="block text-muted-color font-medium mb-4">
                {{ wallet.type.name }}
              </span>

              <h3
                v-tooltip.top="!wallet.status && 'Activate the wallet before editing the wallet'"
                class="text-surface-900 dark:text-surface-0 font-medium text-2xl cursor-pointer hover:underline"
                @click="wallet.status && (isEditWallet = true)"
              >
                {{ wallet.name }}
              </h3>
            </div>

            <div
              v-tooltip.top="wallet.status ? 'Active' : 'Inactive'"
              class="flex items-center justify-center rounded-border size-10 cursor-pointer"
              :class="[checkStatus(wallet.status, wallet.balance)[0], checkStatus(wallet.status, wallet.balance)[1]]"
              @click="onChangeWalletStatus(!wallet.status)"
            >
              <i
                class="!text-xl"
                :class="[checkType(wallet.type.slug), checkStatus(wallet.status, wallet.balance)[2]]"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-4">
        <div class="card mb-0">
          <div class="flex justify-between">
            <div>
              <span class="block text-muted-color font-medium mb-4">
                Balance
              </span>

              <h3
                v-tooltip.top="formatCurr(wallet.balance)"
                class="text-surface-900 dark:text-surface-0 font-medium text-2xl"
              >
                {{ formatCurrShort(wallet.balance) }}
              </h3>
            </div>

            <div class="flex items-center justify-center rounded-border size-10 bg-sky-100 dark:bg-sky-400/10">
              <i class="pi pi-dollar text-sky-500 !text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-4">
        <div class="card mb-0">
          <div class="flex justify-between">
            <div>
              <span class="block text-muted-color font-medium mb-4">
                Transaction
              </span>

              <div class="flex items-center gap-x-8">
                <div
                  v-for="(value, key) in wallet.transaction"
                  :key
                  class="flex items-center gap-x-2"
                >
                  <div
                    class="flex items-center justify-center rounded-border size-8 "
                    :class="[checkTransaction(key)?.[0], checkTransaction(key)?.[1]]"
                  >
                    <i
                      class="pi !text-xl"
                      :class="[checkTransaction(key)?.[2], checkTransaction(key)?.[3]]"
                    />
                  </div>

                  <h3 class="text-surface-900 dark:text-surface-0 font-medium text-2xl">
                    {{ value }}
                  </h3>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-center rounded-border size-10 bg-fuchsia-100 dark:bg-fuchsia-400/10">
              <i class="pi pi-receipt text-fuchsia-500 !text-xl" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="col-span-12">
      <ViewsWalletTransaction :slode="slodeParams" />
    </div>
  </div>

  <LazyViewsWalletEdit v-model="isEditWallet" :slode="slodeParams" />
</template>

<route lang="json">
{
  "meta": {
    "layout": "AppLayoutDashboard",
    "title": "Wallet"
  }
}
</route>
