<script setup lang="ts">
import { useAuthStore } from '@str/auth.store'

import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

// Store
const authStore = useAuthStore()
/********
 * Form *
 ********/
/**
 * Schema
 */
const schema = z.object({
  email: z.string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z.string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
})
type Schema = z.infer<typeof schema>
/**
 * Validation
 */
const { errors, handleSubmit, resetForm } = useForm({ validationSchema: toTypedSchema(schema) })
/**
 * Model
 */
const { value: Email } = useField<Schema['email']>('email')
const { value: Password } = useField<Schema['password']>('password')
/**
 * Action
 */
const onSubmit = handleSubmit(async (values) => {
  await authStore.signIn(values)

  if (authStore.signInState.show) {
    resetForm()
  }
})
</script>

<template>
  <div class="h-[calc(100vh-4rem)] px-52 relative">
    <div class="pt-24">
      <h1 class="text-6xl font-semibold text-slate-800">
        Sign in
      </h1>

      <div class="mt-12 space-y-4">
        <h6 class="text-sm font-semibold text-slate-600">
          Sign in with account
        </h6>

        <div class="flex justify-between w-full gap-x-4">
          <Button
            label="Google"
            icon="pi pi-google"
            class="w-full"
            severity="secondary"
            outlined
          />

          <Button
            label="Apple"
            icon="pi pi-apple"
            class="w-full"
            severity="secondary"
            outlined
          />
        </div>
      </div>
    </div>

    <div class="my-8">
      <Divider />
    </div>

    <div class="space-y-4">
      <h6 class="text-sm font-semibold text-slate-600">
        Or continue with email address
      </h6>

      <form class="space-y-6" @submit="onSubmit">
        <div class="flex flex-col gap-y-2">
          <IconField>
            <InputIcon class="pi pi-user" />

            <InputText
              v-model="Email"
              variant="filled"
              placeholder="email@example.com"
              fluid
              :invalid="!!errors.email"
            />
          </IconField>

          <Message v-if="errors.email" severity="error" size="small" variant="simple">
            {{ errors.email }}
          </Message>
        </div>

        <div class="flex flex-col gap-y-2">
          <IconField>
            <InputIcon class="pi pi-key" />

            <InputText
              v-model="Password"
              type="password"
              variant="filled"
              placeholder="••••••••"
              fluid
              :invalid="!!errors.password"
            />
          </IconField>

          <Message v-if="errors.password" severity="error" size="small" variant="simple">
            {{ errors.password }}
          </Message>
        </div>

        <Button
          type="submit"
          class="w-full"
          icon="pi pi-sign-in"
          rounded
          :label="authStore.signInState.loading ? 'Signing in...' : 'Sign in'"
          :loading="authStore.signInState.loading"
          :disabled="authStore.signInState.loading"
        />
      </form>
    </div>
  </div>
</template>

<route lang="json">
{
  "alias": [
    "/sign-in",
    "/login",
    "/signin"
  ],
  "meta": {
    "layout": "AppLayoutAuth",
    "title": "Sign In"
  }
}
</route>
