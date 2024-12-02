<script setup lang="ts">
import type { Data } from '@tpStr/transaction.types'

import { FilterMatchMode } from '@primevue/core/api'

import { useTransactionStore } from '@str/transaction.store'

// Emits
const emits = defineEmits<{ (e: 'update:isAddTransaction', value: boolean): void }>()
// Store
const transactionStore = useTransactionStore()
// State
const filters = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } })
// Action
const { formatCurr } = useCurrency()
type TransactionType = 'revenue' | 'expense' | 'transfer'

function checkSeverity(type: TransactionType): string {
  const severityMap: Record<TransactionType, string> = {
    revenue: 'success',
    expense: 'danger',
    transfer: 'info',
  }
  return severityMap[type.toLowerCase() as TransactionType] ?? 'secondary'
}
// Hooks
onBeforeMount(() => {
  transactionStore.getAllTransaction()
})
/**
 * Update Doalog
 */
// State
const isOpenUpdate = ref(false)
// Action
async function openUpdateDialog(slode: string) {
  isOpenUpdate.value = true

  await transactionStore.getSingleTransaction(slode)
}
</script>

<template>
  <div class="card">
    <DataTable
      state-storage="session"
      state-key="dt-state-wallet-transaction-session"
      filter-display="menu"
      class="w-full"
      paginator
      :rows="10"
      :global-filter-fields="['name', 'status']"
      :value="transactionStore.state.data"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters.global.value" placeholder="Global Search" />
          </IconField>

          <Button
            label="Add New"
            icon="pi pi-plus"
            @click="emits('update:isAddTransaction', true)"
          />
        </div>
      </template>

      <Column field="name" header="Name" sortable style="width: 25%" />

      <Column field="type" header="Type" sortable style="width: 25%">
        <template #body="{ data }: {data: Data}">
          <Tag
            :severity="checkSeverity(data.type.name as TransactionType)"
            :value="data.type.name"
          />
        </template>
      </Column>

      <Column field="amount" header="Amount" sortable style="width: 25%">
        <template #body="{ data }: {data: Data}">
          {{ formatCurr(data.amount) }}
        </template>
      </Column>

      <Column field="category.name" header="Category" sortable style="width: 25%" />

      <Column field="wallet.name" header="Wallet" sortable style="width: 25%">
        <template #body="{ data }: {data: Data}">
          <RouterLink
            class="text-sky-500 hover:underline cursor-pointer"
            :to="`/dashboard/wallet/${data.wallet.slug}_${data.wallet.code}`"
          >
            {{ data.wallet.name }}
          </RouterLink>
        </template>
      </Column>

      <Column field="date" header="Date" sortable style="width: 25%" />

      <Column header="Action" style="width: 25%">
        <template #body="{ data }: {data: Data}">
          <Button icon="pi pi-pencil" rounded @click="openUpdateDialog(`${data.slug}_${data.code}`)" />
        </template>
      </Column>

      <template #empty>
        <div class="text-center">
          No transaction found.
        </div>
      </template>
    </DataTable>
  </div>

  <ViewsTransactionDetail v-model="isOpenUpdate" />
</template>
