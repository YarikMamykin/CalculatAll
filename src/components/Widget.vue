<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { widgets } from '@/components/widgets'
import { useWorkFieldStore } from '@/store/work_field'

const props = defineProps({
  widgetType: { type: String, required: true }
})

const widgetRef = ref<HTMLElement>()
const workFieldStore = useWorkFieldStore()
function focus(_: unknown) {
  widgetRef.value.focus({ preventScroll: true })
  workFieldStore.$patch({ focused: widgetRef.value })
  console.log(widgetRef.value)
}
</script>

<template>
  <div ref="widgetRef" class="widget" @click="(e) => focus(e)" tabindex="1">
    <component :is="widgets[widgetType]" />
  </div>
</template>
