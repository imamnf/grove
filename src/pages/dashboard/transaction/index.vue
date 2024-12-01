<script setup lang="ts">
// Add Transaction
// State
const isAddTransaction = ref(false)
</script>

<template>
  <ViewsTransactionList @update:is-add-transaction="isAddTransaction = $event" />

  <ViewsTransactionAdd v-model="isAddTransaction" />
</template>

<route lang="json">
{
  "meta": {
    "layout": "AppLayoutDashboard",
    "title": "Transaction"
  }
}
</route>
