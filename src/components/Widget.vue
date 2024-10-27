<script setup lang="ts">
import { defineProps } from 'vue'
import { widgets } from '@/components/widgets'

const props = defineProps({
  widgetType: { type: String, required: true }
})
</script>

<template>
  <div class="widget"><component :is="widgets[widgetType]" /></div>
</template>
