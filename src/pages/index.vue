<script setup lang="ts">
import { useRouter } from 'vue-router/auto'

// State
const router = useRouter()
// Hooks
onBeforeMount(() => router.push('/auth/sign-in'))
</script>

<template>
  <div>
    <RouterLink to="/sign-in">
      Sign in
    </RouterLink>
  </div>
</template>

<route lang="json">
{
  "meta": {
    "layout": false
  }
}
</route>
