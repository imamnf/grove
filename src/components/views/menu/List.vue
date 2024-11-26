<script setup lang="ts">
import type { TreeNode } from 'primevue/treenode';

import { useMenuStore } from "@str/menu.store"

// Props
const props = defineProps<{
  isEditing: boolean
}>()
// Emits
const emits = defineEmits<{ (e: 'update:isEditing', value: boolean): void }>()
// Store
const menuStore = useMenuStore()
// State
const selectedKey = ref<Record<string, boolean>>()
// Action
async function onNodeSelect(e: TreeNode) {
  menuStore.getSingleMenu(e.data)

  emits('update:isEditing', true)
}
// Hooks
watch(props, (newValue) => {
  if (!newValue.isEditing) {
    selectedKey.value = undefined
  }
})
</script>

<template>
  <Card class="col-span-6">
    <template #title>
      <h3 class="text-2xl font-semibold">List Menu</h3>
    </template>
    <template #content>
      <Tree v-model:selectionKeys="selectedKey" selectionMode="single" class="w-full" :value="menuStore.menuList"
        @nodeSelect="onNodeSelect" />
    </template>
  </Card>
</template>