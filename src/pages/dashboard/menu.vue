<script setup lang="ts">
// State
const isEditing = ref(false)
</script>

<template>
  <div class="grid grid-cols-12 gap-x-8">
    <ViewsMenuAdd v-if="!isEditing" />

    <ViewsMenuEdit v-else @update:is-editing="isEditing = $event" />

    <ViewsMenuList :is-editing @update:is-editing="isEditing = $event" />
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
