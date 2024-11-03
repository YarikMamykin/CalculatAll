<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { widgets } from '@/components/widgets'

const props = defineProps({
  widgetType: { type: String, required: true }
})

const widgetRef = ref()
function focus(_: unknown) {
  widgetRef.value.focus({ preventScroll: true, focusVisible: true })
}
</script>

<template>
  <div ref="widgetRef" class="widget" @click="(e) => focus(e)" tabindex="1">
    <component :is="widgets[widgetType]" />
  </div>
</template>
