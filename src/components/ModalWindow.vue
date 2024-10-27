<script setup lang="ts">
import CancelButton from '@/components/CancelButton.vue'
import { defineEmits, defineProps, defineExpose } from 'vue'

const emits = defineEmits(['cancel'])
const props = defineProps({
  name: String
})

function cancel() {
  emits('cancel')
}

defineExpose({
  cancel
})
</script>

<template>
  <div class="modal-window-plate">
    <div class="modal-window">
      <div class="modal-window-header">
        <h2>{{ name }}</h2>
        <CancelButton
          @click="(e) => $emit('cancel', e)"
          style="margin-right: 0px; margin-left: auto"
        />
      </div>
      <slot />
    </div>
  </div>
</template>
