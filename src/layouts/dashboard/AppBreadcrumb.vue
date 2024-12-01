<script setup lang="ts">
import { useRoute } from 'vue-router/auto'

// State
const route = useRoute()

const home = ref({
  icon: 'pi pi-home',
  route: '/dashboard',
})

const items = ref<{ label: string, route: string }[]>()

watch(route.meta.crumb as { label: string, route: string }[], (newValue) => {
  if (newValue) {
    items.value = newValue
  }
})
</script>

<template>
  <Breadcrumb
    :home="home"
    :model="items"
    :pt="{
      root: '!bg-transparent !p-0',
    }"
  >
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span class="font-semibold text-primary">{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
        <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
      </a>
    </template>
  </Breadcrumb>
</template>
