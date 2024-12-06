<script setup lang="ts">
import { useMenuStore } from '@str/menu.store'
import { toTypedSchema } from '@vee-validate/zod'
import { useConfirm } from 'primevue/useconfirm'

import { z } from 'zod'

// Emits
const emits = defineEmits<{
  (e: 'update:isEditing', value: boolean): void
}>()
// Store
const menuStore = useMenuStore()
// State
const id = useId()
const confirm = useConfirm()
/********
 * Form *
 ********/
/**
 * Schema
 */
const schema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  slug: z.string(),
  to: z.string({ required_error: 'Redirect is required' }),
  icon: z.string({ required_error: 'Icon is required' }),
})
type Schema = z.infer<typeof schema>
/**
 * Validation
 */
const { errors, handleSubmit, resetForm, setValues, values } = useForm({ validationSchema: toTypedSchema(schema) })
/**
 * Model
 */
const { value: Name } = useField<Schema['name']>('name')
const { value: Redirect } = useField<Schema['to']>('to')
const { value: Icon } = useField<Schema['icon']>('icon')
/**
 * Action
 */
const onSubmit = handleSubmit(async (values) => {
  const payload = {
    name: values.name,
    to: values.to === 'dashboard' ? '/dashboard' : `/dashboard/${values.to}`,
    icon: `pi ${values.icon}`,
  }

  await menuStore.updateMenu(payload, values.slug)

  if (menuStore.addState.show) {
    emits('update:isEditing', false)

    resetForm()
  }
})

async function deleteMenu(slug: string) {
  confirm.require({
    message: 'Do you want to delete this menu?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    async accept() {
      await menuStore.deleteMenu(slug)

      if (menuStore.deleteState.show) {
        emits('update:isEditing', false)

        resetForm()
      }
    },

  })
}
// Hooks
watch(() => menuStore.menuSingleList, (newValue) => {
  if (newValue) {
    setValues({
      name: newValue.name,
      slug: newValue.slug,
      to: newValue.to,
      icon: newValue.icon,
    })
  }
})
</script>

<template>
  <Card class="col-span-6">
    <template #title>
      <div class="flex justify-between items-center">
        <h3 class="text-2xl font-semibold">
          Edit Menu
        </h3>

        <Button
          label="Add menu"
          variant="link"
          @click="emits('update:isEditing', false), resetForm()"
        />
      </div>
    </template>
    <template #content>
      <form class="space-y-6" @submit="onSubmit">
        <div class="flex flex-col gap-y-2">
          <label :for="id">Name</label>

          <IconField :id>
            <InputIcon class="pi pi-pencil" />

            <InputText
              v-model="Name"
              variant="filled"
              placeholder="Product"
              fluid
              :invalid="!!errors.name"
            />
          </IconField>

          <Message v-if="errors.name" severity="error" size="small" variant="simple">
            {{ errors.name }}
          </Message>
        </div>

        <div class="flex flex-col gap-y-2">
          <label :for="id">Redirect</label>

          <InputGroup :id>
            <InputGroupAddon>/dashboard/</InputGroupAddon>

            <InputText
              v-model="Redirect"
              variant="filled"
              placeholder="product"
              fluid
              :disabled="values.to === 'dashboard'"
              :invalid="!!errors.to"
            />
          </InputGroup>

          <Message v-if="errors.to" severity="error" size="small" variant="simple">
            {{ errors.to }}
          </Message>
        </div>

        <div class="grid grid-cols-12 gap-x-4">
          <div class="col-span-9">
            <div class="flex flex-col gap-y-2">
              <label :for="id">Icon</label>

              <IconField :id>
                <InputIcon class="pi pi-sparkles" />

                <InputText
                  v-model="Icon"
                  variant="filled"
                  placeholder="pi-box"
                  fluid
                  :invalid="!!errors.icon"
                />
              </IconField>

              <Message v-if="errors.icon" severity="error" size="small" variant="simple">
                {{ errors.icon }}
              </Message>

              <Message severity="secondary" size="small" variant="simple">
                Check icon here:
                <a
                  href="https://primevue.org/icons/"
                  class="hover:underline text-sky-500 cursor-pointer"
                  target="_blank"
                >
                  https://primevue.org/icons
                </a>
              </Message>
            </div>
          </div>

          <div class="col-span-3">
            <div class="flex flex-col justify-center items-center gap-y-2">
              <label :for="id">Preview</label>

              <i :class="`pi ${values.icon}`" style="font-size: 2.5rem" />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-x-4">
          <Button
            type="button"
            icon="pi pi-trash"
            severity="danger"
            variant="outlined"
            rounded
            :label="menuStore.deleteState.loading ? 'Deleting...' : 'Delete menu'"
            :loading="menuStore.deleteState.loading"
            :disabled="menuStore.deleteState.loading"
            @click="values.slug && deleteMenu(values.slug)"
          />

          <Button
            type="submit"
            icon="pi pi-pencil"
            rounded
            :label="menuStore.updateState.loading ? 'Editing...' : 'Edit menu'"
            :loading="menuStore.updateState.loading"
            :disabled="menuStore.updateState.loading"
          />
        </div>
      </form>
    </template>
  </Card>
</template>
