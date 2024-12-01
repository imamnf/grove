<script setup lang="ts">
import type { TypeData } from '@tpStr/transaction.types'

import { useCategoryStore } from '@str/category.store'
import { useTransactionStore } from '@str/transaction.store'
import { useWalletStore } from '@str/wallet.store'

import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

// Model
const visible = defineModel<boolean>()
// Store
const categoryStore = useCategoryStore()
const transactionStore = useTransactionStore()
const walletStore = useWalletStore()
// State
const id = useId()
// Action
type TransactionType = 'revenue' | 'expense' | 'transfer'

function checkSeverity(type: TransactionType): string {
  const severityMap: Record<TransactionType, string> = {
    revenue: 'text-emerald-500',
    expense: 'text-rose-500',
    transfer: 'text-sky-500',
  }
  return severityMap[type] ?? 'text-slate-500'
}
// Hooks
onBeforeMount(async () => {
  try {
    await Promise.all([
      walletStore.getAllWallet(),
      transactionStore.getAllTransactionType(),
      categoryStore.getAllCategory(),
    ])
  }
  catch (error) {
    console.error('Failed to load initial data:', error)
    // Handle error appropriately (show error message, etc)
  }
})
/********
 * Form *
 ********/
/**
 * Schema
 */
const schema = z.object({
  wallet: z.number({ required_error: 'Wallet is required' }),
  name: z.string({ required_error: 'Name is required' }),
  type: z.number({ required_error: 'Type is required' }),
  amount: z.string({ required_error: 'Amount is required' })
    .refine(val => !(+val <= 0), { message: 'Amount must be more than 0' }),
  category: z.number({ required_error: 'Category is required' }),
  description: z.string({ required_error: 'Description is required' }),
})
type Schema = z.infer<typeof schema>
/**
 * Validation
 */
const { errors, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(schema),
})
/**
 * Model
 */
const { value: Wallet } = useField<Schema['wallet']>('wallet')
const { value: Name } = useField<Schema['name']>('name')
const { value: Type } = useField<Schema['type']>('type')
const { value: Amount } = useField<Schema['amount']>('amount')
const { value: Category } = useField<Schema['category']>('category')
const { value: Description } = useField<Schema['description']>('description')
/**
 * Action
 */
const onSubmit = handleSubmit(async (values) => {
  const payload = {
    name: values.name,
    amount: +values.amount,
    description: values.description,
    type_id: values.type,
    category_id: values.category,
    wallet_id: values.wallet,
  }

  await transactionStore.addTransaction(payload)

  if (transactionStore.addState.show) {
    resetForm()
    visible.value = false
  }
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Add Transaction"
    :style="{ width: '40rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <form class="space-y-6" @submit="onSubmit">
      <!-- Wallet -->
      <div class="flex flex-col gap-y-2">
        <label :for="id">Wallet</label>

        <Select
          v-model="Wallet"
          option-label="name"
          option-value="id"
          placeholder="Select a wallet"
          fluid
          :invalid="!!errors.wallet"
          :options="walletStore.state.data"
        />

        <Message v-if="errors.wallet" severity="error" size="small" variant="simple">
          {{ errors.wallet }}
        </Message>
      </div>

      <!-- Name -->
      <div class="flex flex-col gap-y-2">
        <label :for="id">Name</label>

        <IconField :id>
          <InputIcon class="pi pi-pencil" />

          <InputText
            v-model="Name"
            variant="filled"
            placeholder="Transaction ..."
            fluid
            :invalid="!!errors.name"
          />
        </IconField>

        <Message v-if="errors.name" severity="error" size="small" variant="simple">
          {{ errors.name }}
        </Message>
      </div>

      <!-- Type -->
      <div class="flex flex-col gap-y-2 items-center">
        <SelectButton
          v-model="Type"
          option-label="name"
          option-value="id"
          data-key="id"
          aria-labelledby="custom"
          :invalid="!!errors.type"
          :options="transactionStore.typeState.data"
        >
          <template #option="{ option }: {option: TypeData}">
            <i :class="[`pi ${option.icon}`, checkSeverity(option.slug)]" />

            <span>{{ option.name }}</span>
          </template>
        </SelectButton>

        <Message v-if="errors.type" severity="error" size="small" variant="simple">
          {{ errors.type }}
        </Message>
      </div>

      <!-- Amount -->
      <div class="flex flex-col gap-y-2">
        <label :for="id">Amount</label>

        <IconField :id>
          <InputIcon class="pi pi-pencil" />

          <InputText
            v-model="Amount"
            v-keyfilter.num
            variant="filled"
            placeholder="100000"
            fluid
            :invalid="!!errors.amount"
          />
        </IconField>

        <Message v-if="errors.amount" severity="error" size="small" variant="simple">
          {{ errors.amount }}
        </Message>
      </div>

      <!-- Category -->
      <div class="flex flex-col gap-y-2">
        <label :for="id">Category</label>

        <Select
          v-model="Category"
          option-label="name"
          option-value="id"
          placeholder="Select a category"
          fluid
          :invalid="!!errors.category"
          :options="categoryStore.state.data"
        />

        <Message v-if="errors.category" severity="error" size="small" variant="simple">
          {{ errors.category }}
        </Message>
      </div>

      <!-- Description -->
      <div class="flex flex-col gap-y-2">
        <label :for="id">Description</label>

        <Textarea
          v-model="Description"
          rows="5"
          cols="30"
          :invalid="!!errors.description"
        />

        <Message v-if="errors.description" severity="error" size="small" variant="simple">
          {{ errors.description }}
        </Message>
      </div>

      <Button
        type="submit"
        class="self-end"
        icon="pi pi-plus"
        rounded
        :label="transactionStore.addState.loading ? 'Adding...' : 'Add transaction'"
        :loading="transactionStore.addState.loading"
        :disabled="transactionStore.addState.loading"
      />
    </form>
  </Dialog>
</template>
