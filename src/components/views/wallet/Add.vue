<script setup lang="ts">
import { useWalletStore } from '@str/wallet.store'
import { toTypedSchema } from '@vee-validate/zod'

import { z } from 'zod'

// Model
const visible = defineModel<boolean>()
// Store
const walletStore = useWalletStore()
// State
const id = useId()
// Hooks
onMounted(() => walletStore.getAllWalletType())
/********
 * Form *
 ********/
/**
 * Schema
 */
const schema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  type: z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    code: z.string(),
  }, { required_error: 'Type is required' }),
})
type Schema = z.infer<typeof schema>
/**
 * Validation
 */
const { errors, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(
    schema.superRefine((val, ctx) => {
      const walletData = walletStore.state.data

      if (walletData?.find(wallet => wallet.name === val.name && wallet.type.code === val.type.code)) {
        ctx.addIssue({
          code: 'custom',
          path: ['name', 'type'],
          message: 'Wallet already exist',
        })
      }
    }),
  ),
})
/**
 * Model
 */
const { value: Name } = useField<Schema['name']>('name')
const { value: Type } = useField<Schema['type']>('type')
/**
 * Action
 */
const onSubmit = handleSubmit(async (values) => {
  const payload = {
    name: values.name,
    type_id: values.type.id,
  }

  await walletStore.addWallet(payload)

  if (walletStore.addState.show) {
    resetForm()
    visible.value = false
  }
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Add Wallet"
    :style="{ width: '30rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <form class="space-y-6" @submit="onSubmit">
      <div class="flex flex-col gap-y-2">
        <label :for="id">Name</label>

        <IconField :id>
          <InputIcon class="pi pi-pencil" />

          <InputText
            v-model="Name"
            variant="filled"
            placeholder="Wallet 2"
            fluid
            :invalid="!!errors.name"
          />
        </IconField>

        <Message v-if="errors.name" severity="error" size="small" variant="simple">
          {{ errors.name }}
        </Message>
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-x-4">
          <div
            v-for="type in walletStore.typeState.data"
            :key="type.id"
            class="flex items-center gap-x-2"
          >
            <RadioButton
              v-model="Type"
              :input-id="id"
              :value="type"
              :invalid="!!errors.type"
            />

            <label :for="id">{{ type.name }}</label>
          </div>
        </div>

        <Message v-if="errors.type" severity="error" size="small" variant="simple">
          {{ errors.type }}
        </Message>
      </div>

      <div class="flex justify-end">
        <Button
          type="submit"
          icon="pi pi-plus"
          :label="walletStore.addState.loading ? 'Adding...' : 'Add wallet'"
          :loading="walletStore.addState.loading"
          :disabled="walletStore.addState.loading"
        />
      </div>
    </form>
  </Dialog>
</template>
