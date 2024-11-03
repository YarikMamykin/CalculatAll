<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { widgets } from '@/components/widgets'
import { useWorkFieldStore } from '@/store/work_field'

const props = defineProps({
  id: { type: Number, required: true },
  widgetType: { type: String, required: true }
})

const workFieldStore = useWorkFieldStore()
const styleClass = computed(() => {
  return 'widget ' + (workFieldStore.focused === props.id ? 'widget-selected' : '')
})
</script>

<template>
  <div :class="styleClass" @click.stop="workFieldStore.$patch({ focused: props.id })" tabindex="1">
    <component :is="widgets[widgetType]" />
  </div>
</template>
