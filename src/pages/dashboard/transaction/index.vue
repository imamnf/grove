<script setup lang="ts">
// Component
const LazyViesTransactionAdd = defineAsyncComponent(() => import('@views/transaction/Add.vue'))
const LazyViesTransactionList = defineAsyncComponent(() => import('@views/transaction/List.vue'))
/**
 * Add Transaction
 */
// State
const isAddTransaction = ref(false)
</script>

<template>
  <LazyViesTransactionList @update:is-add-transaction="isAddTransaction = $event" />

  <LazyViesTransactionAdd v-model="isAddTransaction" />
</template>

<route lang="json">
{
  "meta": {
    "layout": "AppLayoutDashboard",
    "title": "Transaction"
  }
}
</route>
