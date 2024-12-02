<script setup lang="ts">
import { useTransactionStore } from '@str/transaction.store'

// Model
const visible = defineModel<boolean>()
// Store
const transactionStore = useTransactionStore()
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Detail Transaction"
    :style="{ width: '40rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div v-for="transaction in transactionStore.transactionState.data" :key="transaction.code" class="space-y-4">
      <div class="flex justify-between">
        <span>Name</span>
        <span>{{ transaction.name }}</span>
      </div>

      <div class="flex justify-between">
        <span>Amount</span>
        <span>{{ transaction.amount }}</span>
      </div>

      <div class="flex justify-between">
        <span>Date</span>
        <span>{{ transaction.date }}</span>
      </div>

      <div class="flex `flex-col justify-between">
        <span>Description</span>
        <span>{{ transaction.description }}</span>
      </div>
    </div>
  </Dialog>
</template>
