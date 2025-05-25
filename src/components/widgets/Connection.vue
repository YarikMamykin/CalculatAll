<script setup lang="ts">
const props = defineProps({
  points: { type: String, required: true },
});
</script>

<template>
  <svg>
    <polyline class="connection" :points="props.points"></polyline>
  </svg>
</template>
