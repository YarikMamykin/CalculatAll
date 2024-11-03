<script setup lang="ts">
import { defineProps } from 'vue'
import { widgets } from '@/components/widgets'
import { useWorkFieldStore } from '@/store/work_field'

const props = defineProps({
  id: { type: Number, required: true },
  widgetType: { type: String, required: true }
})

const workFieldStore = useWorkFieldStore()
</script>

<template>
  <div
    :class="'widget ' + (workFieldStore.focused === props.id ? 'widget-selected' : '')"
    @click="workFieldStore.$patch({ focused: props.id })"
    tabindex="1"
  >
    <component :is="widgets[widgetType]" />
  </div>
</template>
