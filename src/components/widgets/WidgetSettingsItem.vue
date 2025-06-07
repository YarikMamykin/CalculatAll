<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
  name: { type: String, required: true },
});
</script>

<template>
  <div class="widget-settings-item">
    <label>{{ props.name }}</label>
    <slot />
  </div>
</template>
