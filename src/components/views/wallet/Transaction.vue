<script setup lang="ts">
import type { WalletTransactionData } from '@tpStr/wallet.types'

import { FilterMatchMode } from '@primevue/core/api'

import { useTransactionStore } from '@str/transaction.store'
import { useWalletStore } from '@str/wallet.store'

// Props
const props = defineProps<{ slode: string }>()
// Store
const transactionStore = useTransactionStore()
const walletStore = useWalletStore()
// State
const filters = ref({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } })
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
  return severityMap[type.toLowerCase() as TransactionType] ?? 'secondary'
}
// Hooks
onBeforeMount(() => walletStore.getAllWalletTransaction(props.slode))
/**
 * Detail Dialog
 */
// State
const isOpenDetail = ref(false)
// Action
async function openDetailDialog(slode: string) {
  isOpenDetail.value = true

  await transactionStore.getSingleTransaction(slode)
}
</script>

<template>
  <div class="card">
    <DataTable
      state-storage="session"
      state-key="dt-state-transaction-session"
      filter-display="menu"
      data-key="id"
      class="w-full"
      paginator
      :rows="10"
      :global-filter-fields="['name', 'status']"
      :value="walletStore.transactionState.data"
    >
      <template #header>
        <IconField>
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>

          <InputText v-model="filters.global.value" placeholder="Global Search" />
        </IconField>
      </template>

      <Column field="name" header="Name" sortable style="width: 25%" />

      <Column field="type" header="Type" sortable style="width: 25%">
        <template #body="{ data }: {data: WalletTransactionData}">
          <Tag :severity="checkSeverity(data.type as TransactionType)" :value="data.type" />
        </template>
      </Column>

      <Column field="amount" header="Amount" sortable style="width: 25%">
        <template #body="{ data }: {data: WalletTransactionData}">
          {{ formatCurr(data.amount) }}
        </template>
      </Column>

      <Column field="date" header="Date" sortable style="width: 25%">
        <template #body="{ data }: {data: WalletTransactionData}">
          {{ dateLong(data.date) }}
        </template>
      </Column>

      <Column header="Action" style="width: 25%">
        <template #body="{ data }: {data: WalletTransactionData}">
          <Button icon="pi pi-pencil" rounded @click="openDetailDialog(`${data.slug}_${data.code}`)" />
        </template>
      </Column>

      <template #empty>
        No customers found.
      </template>
    </DataTable>
  </div>

  <ViewsTransactionDetail v-model="isOpenDetail" />
</template>
