<script setup lang="ts">
import type { FormSubmitEvent } from '@primevue/forms';
import type { Payload } from '@tpStr/menu.types';

import { zodResolver } from "@primevue/forms/resolvers/zod"
import { z } from "zod"


import { useMenuStore } from '@str/menu.store';

// Store
const menuStore = useMenuStore()

/********
 * Form *
 ********/
/**
 * Schema
 */
const resolver = ref(zodResolver(z.object({
  name: z.string({ required_error: 'Name is required' }),
  to: z.string({ required_error: "Redirect is required" }),
  icon: z.string({ required_error: 'Icon is required' })
})))
/**
 * Action
 */
const onSubmit = async ({ valid, values }: FormSubmitEvent<Payload>) => {
  if (valid) {
    const payload = {
      name: values.name,
      to: '/dashboard/' + values.to,
      icon: 'pi ' + values.icon
    }

    menuStore.addMenu(payload)
  }
}
</script>

<template>
  <Card class="col-span-6">
    <template #title>
      <h3 class="text-2xl font-semibold">Add Menu</h3>
    </template>
    <template #content>
      <Form class="space-y-6" :resolver @submit="onSubmit">
        <FormField v-slot="$field" name="name" initialValue="" class="flex flex-col gap-y-2">
          <label :for="useId()">Name</label>

          <IconField :id="useId()">
            <InputIcon class="pi pi-pencil" />
            <InputText variant="filled" placeholder="Product" fluid />
          </IconField>

          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <FormField v-slot="$field" name="to" initialValue="" class="flex flex-col gap-y-2">
          <label :for="useId()">Redirect</label>

          <InputGroup :id="useId()">
            <InputGroupAddon>/dashboard/</InputGroupAddon>
            <InputText variant="filled" placeholder="product" fluid />
          </InputGroup>

          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <FormField v-slot="$field" name="icon" initialValue="" class="flex flex-col gap-y-2">
          <label :for="useId()">Icon</label>

          <IconField :id="useId()">
            <InputIcon class="pi pi-sparkles" />
            <InputText variant="filled" placeholder="pi-box" fluid />
          </IconField>

          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>

          <Message severity="secondary" size="small" variant="simple">
            Check icon here: <a href="https://primevue.org/icons/" class="hover:underline text-sky-500 cursor-pointer"
              target="_blank">https://primevue.org/icons
            </a>
          </Message>
        </FormField>


        <Button type="submit" class="w-full" icon="pi pi-plus" rounded
          :label="menuStore.addState.loading ? 'Adding...' : 'Add menu'" :loading="menuStore.addState.loading"
          :disabled="menuStore.addState.loading" />

      </Form>
    </template>
  </Card>
</template>