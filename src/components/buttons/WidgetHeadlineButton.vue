<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  active: { type: Boolean, required: false, default: true },
});
</script>

<template>
  <button
    class="default-size default-btn all-centered widget-headline-button"
    :disabled="!props.active"
  >
    <slot />
  </button>
</template>
