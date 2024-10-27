<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import { widgets } from '@/components/widgets'

const emits = defineEmits(['selected'])
const props = defineProps({
  widgetType: { type: String, required: true }
})
</script>

<template>
  <div class="widget-preview" @click="(e) => $emit('selected', widgetType)">
    <component :is="widgets[widgetType]" />
  </div>
</template>
