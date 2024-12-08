<script setup lang="ts">
import { defineProps, defineExpose, computed, ref, onMounted } from 'vue'
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
const widgetRef = ref<HTMLElement>()
function setStyle(style: string) {
  widgetRef.value.style = style
}
defineExpose({
  setStyle
})
onMounted(() => {
  if (widgetRef.value) {
    workFieldStore.widgets.at(props.id).element = widgetRef.value
  }
})
</script>

<template>
  <div
    ref="widgetRef"
    :class="styleClass"
    @click.stop="workFieldStore.$patch({ focused: props.id })"
    tabindex="1"
  >
    <component :is="widgets[widgetType]" />
  </div>
</template>
