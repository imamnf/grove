<script setup lang="ts">
import { useMenuStore } from '@str/menu.store'

import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

// Store
const menuStore = useMenuStore()
// State
const id = useId()
/********
 * Form *
 ********/
/**
 * Schema
 */
const schema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  to: z.string({ required_error: 'Redirect is required' }),
  icon: z.string({ required_error: 'Icon is required' }),
})
type Schema = z.infer<typeof schema>
/**
 * Validation
 */
const { errors, handleSubmit, resetForm, values } = useForm({ validationSchema: toTypedSchema(schema) })
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
    to: `/dashboard/${values.to}`,
    icon: `pi ${values.icon}`,
  }

  await menuStore.addMenu(payload)

  if (menuStore.addState.show) {
    resetForm()
  }
})
</script>

<template>
  <Card class="col-span-6">
    <template #title>
      <h3 class="text-2xl font-semibold">
        Add Menu
      </h3>
    </template>
    <template #content>
      <form class="space-y-6 grid" @submit="onSubmit">
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

          <Message
            v-if="errors.name"
            severity="error"
            size="small"
            variant="simple"
          >
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
              :invalid="!!errors.to"
            />
          </InputGroup>

          <Message
            v-if="errors.to"
            severity="error"
            size="small"
            variant="simple"
          >
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

              <Message
                v-if="errors.icon"
                severity="error"
                size="small"
                variant="simple"
              >
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

        <Button
          type="submit"
          class="self-end"
          icon="pi pi-plus"
          rounded
          :label="menuStore.addState.loading ? 'Adding...' : 'Add menu'"
          :loading="menuStore.addState.loading"
          :disabled="menuStore.addState.loading"
        />
      </form>
    </template>
  </Card>
</template>
