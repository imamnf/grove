<script setup lang="ts">
// Component
const LazyViewsMenuAdd = defineAsyncComponent(() => import('@views/menu/Add.vue'))
const LazyViewsMenuEdit = defineAsyncComponent(() => import('@views/menu/Edit.vue'))
const LazyViewsMenuList = defineAsyncComponent(() => import('@views/menu/List.vue'))
// State
const isEditing = ref(false)
</script>

<template>
  <div class="grid grid-cols-12 gap-x-8">
    <LazyViewsMenuAdd v-if="!isEditing" />

    <LazyViewsMenuEdit v-else @update:is-editing="isEditing = $event" />

    <LazyViewsMenuList :is-editing @update:is-editing="isEditing = $event" />
  </div>
</template>

<route lang="json">
{
  "meta": {
    "layout": "AppLayoutDashboard",
    "title": "Menu"
  }
}
</route>
