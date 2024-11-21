<script setup lang="ts">
import type { FormSubmitEvent } from '@primevue/forms';
import type { SignInPayload } from '@tpStr/auth.types';

import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';

import { useAuthStore } from '@str/auth.store';

// Store
const authStore = useAuthStore();

/********
 * Form *
 ********/
/**
 * Schema
 */
const resolver = ref(zodResolver(z.object({
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
  password: z.string({ required_error: 'Password is required' }).min(6, { message: 'Password must be at least 6 characters' })
})))
/**
 * Action
 */
const onSubmitSignIn = (e: FormSubmitEvent) => {
  authStore.signIn(<SignInPayload>e.values)
}
</script>

<template>
  <div class="h-[calc(100vh-4rem)] px-52 relative">
    <div class="pt-24">
      <h1 class="text-6xl font-semibold text-slate-800">Sign in</h1>

      <div class="mt-12 space-y-4">
        <h6 class="text-sm font-semibold text-slate-600">Sign in with account</h6>

        <div class="flex justify-between w-full gap-x-4">
          <Button label="Google" icon="pi pi-google" class="w-full" severity="secondary" outlined />
          <Button label="Apple" icon="pi pi-apple" class="w-full" severity="secondary" outlined />
        </div>
      </div>
    </div>

    <div class="my-8">
      <Divider />
    </div>

    <div class="space-y-4">
      <h6 class="text-sm font-semibold text-slate-600">Or continue with email address</h6>

      <Form class="space-y-6" :resolver @submit="onSubmitSignIn">
        <FormField v-slot="$field" name="email" class="flex flex-col gap-y-2">
          <IconField>
            <InputIcon class="pi pi-user" />

            <InputText variant="filled" placeholder="email@example.com" fluid />
          </IconField>

          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>

        </FormField>

        <FormField v-slot="$field" name="password" class="flex flex-col gap-y-2">
          <IconField>
            <InputIcon class="pi pi-key" />

            <InputText name="password" type="password" variant="filled" placeholder="••••••••" fluid />
          </IconField>

          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
            {{ $field.error?.message }}
          </Message>
        </FormField>

        <Button type="submit" class="w-full" icon="pi pi-sign-in" rounded
          :label="authStore.signInState.loading ? 'Signing in...' : 'Sign in'" :loading="authStore.signInState.loading"
          :disabled="authStore.signInState.loading" />
      </Form>
    </div>
  </div>
</template>

<route lang="json">{
  "alias": [
    "/sign-in",
    "/login",
    "/signin"
  ],
  "meta": {
    "layout": "AppLayoutAuth",
    "title": "Sign In"
  }
}</route>
