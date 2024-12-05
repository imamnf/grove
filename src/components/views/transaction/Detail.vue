<script setup lang="ts">
import { useTransactionStore } from '@str/transaction.store'
import { useWalletStore } from '@str/wallet.store'

import { useConfirm } from 'primevue/useconfirm'
import { useRoute } from 'vue-router/auto'

// Model
const visible = defineModel<boolean>()
// Store
const transactionStore = useTransactionStore()
const walletStore = useWalletStore()
// State
const route = useRoute()
// Action
const { formatCurr } = useCurrency()
const { dateLong } = useDate()

type TransactionType = 'revenue' | 'expense' | 'transfer'
function checkSeverity(type: TransactionType): string {
  const severityMap: Record<TransactionType, string> = {
    revenue: 'success',
    expense: 'danger',
    transfer: 'info',
  }
  return severityMap[type as TransactionType] ?? 'secondary'
}
/**
 * Edit Transaction
 */
// State
const isEditing = ref(false)
/**
 * Delete Transaction
 */
// State
const confirm = useConfirm()
const walletSlode = inject<string>('slode')
// Action
function openDeleteTransactionDialog(slode: string) {
  confirm.require({
    message: 'Are you sure you want to delete?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      text: true,
    },
    acceptProps: {
      label: 'Confirm',
      severity: 'danger',
    },
    async accept() {
      const { status } = await transactionStore.deleteTransaction(slode)
      const path = route.path.split('/')[2]

      if (status === 200) {
        if (path === 'wallet' && walletSlode) {
          walletStore.getAllWalletTransaction(<string>walletSlode)
        }
        else if(path === 'transaction') {
          transactionStore.getAllTransaction()
        }

        visible.value = false
      }
    },
  })
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Detail Transaction"
    :style="{ width: '35rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div v-if="!isEditing">
      <div
        v-for="transaction in transactionStore.transactionState.data"
        :key="transaction.code"
        class="space-y-4 my-4"
      >
        <div class="flex justify-center">
          <div class="flex flex-col items-center gap-4">
            <h3 class="text-5xl font-semibold">
              {{ formatCurr(transaction.amount) }}
            </h3>

            <Tag
              :severity="checkSeverity(transaction.type.slug as TransactionType)"
              :value="transaction.type.name"
            />
          </div>
        </div>

        <div class="flex justify-between">
          <span>Name</span>
          <span>{{ transaction.name }}</span>
        </div>

        <div class="flex justify-between">
          <span>Category</span>
          <span>{{ transaction.category.name }}</span>
        </div>

        <div class="flex justify-between">
          <span>Wallet</span>
          <RouterLink
            class="text-sky-500 cursor-pointer hover:underline"
            :to="`/dashboard/wallet/${transaction.wallet.slug}_${transaction.wallet.code}`"
          >
            {{ transaction.wallet.name }}
          </RouterLink>
        </div>

        <div class="flex justify-between">
          <span>Date</span>
          <span>{{ dateLong(transaction.date) }}</span>
        </div>

        <div class="flex flex-col justify-between">
          <span>Description</span>
          <span>{{ transaction.description }}</span>
        </div>

        <div class="!mt-8 flex gap-x-4">
          <Button
            label="Edit"
            class="w-full"
            icon="pi pi-pencil"
            severity="info"
            variant="text"
            @click="isEditing = !isEditing"
          />

          <Button
            label="Delete"
            class="w-full"
            icon="pi pi-trash"
            severity="danger"
            variant="text"
            @click="openDeleteTransactionDialog(`${transaction.slug}_${transaction.code}`)"
          />
        </div>
      </div>
    </div>

    <div v-else>
      <div class="mt-4">
        <Button label="Cancel" class="w-full" @click="isEditing = !isEditing" />
      </div>
    </div>
  </Dialog>
</template>
