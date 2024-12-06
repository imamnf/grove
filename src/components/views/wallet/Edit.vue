<script setup lang="ts">
import { useWalletStore } from '@str/wallet.store'

import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

// Props
const props = defineProps<{ slode: string }>()
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
  type: z.string(),
})
type Schema = z.infer<typeof schema>
/**
 * Validation
 */
const { errors, handleSubmit, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(
    schema.superRefine((val, ctx) => {
      const walletsData = walletStore.state.data
      const walletData = walletStore.walletState.data

      if (walletsData?.filter(wallet => wallet.name !== walletData?.[0].name)
        .find(wallet => wallet.name === val.name && wallet.code === val.type)) {
        ctx.addIssue({
          code: 'custom',
          path: ['name'],
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
/**
 * Action
 */
const onSubmit = handleSubmit(async (values) => {
  const payload = {
    name: values.name,
  }

  await walletStore.updateWallet(payload, props.slode)

  if (walletStore.updateState.show) {
    resetForm()
    visible.value = false
  }
})
/**
 * Hooks
 */
watch(
  [() => walletStore.walletState.data, () => walletStore.typeState.data],
  ([newWallet, newType]) => {
    if (newWallet && newType) {
      setValues({
        name: newWallet[0]?.name,
        type: newWallet[0]?.type.code,
      })
    }
  },
)
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Edit Wallet"
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

        <Message
          v-if="errors.name"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ errors.name }}
        </Message>
      </div>

      <div class="flex justify-end">
        <Button
          type="submit"
          icon="pi pi-pencil"
          :label="walletStore.updateState.loading ? 'Updating...' : 'Update wallet'"
          :loading="walletStore.updateState.loading"
          :disabled="walletStore.updateState.loading"
        />
      </div>
    </form>
  </Dialog>
</template>
