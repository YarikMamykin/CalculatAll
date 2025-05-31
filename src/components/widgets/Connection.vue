<script setup lang="ts">
const props = defineProps({
  points: { type: String, required: true },
  temp: { type: Boolean, required: false, default: false },
});
</script>

<template>
  <svg class="connection-container">
    <polyline
      :class="props.temp ? 'connection temp-connection' : 'connection'"
      :points="props.points"
    ></polyline>
  </svg>
</template>
