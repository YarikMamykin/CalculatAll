<script setup lang="ts">
import CloseButton from "../buttons/CloseButton.vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  title: { type: String, required: true },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <div class="all-centered headline">
    <div style="width: 10px" />
    <label>{{ props.title }}</label>
    <close-button @click="() => emit('close')">
      <img class="default-inner-size" src="@/assets/cross-sign.svg" />
    </close-button>
  </div>
</template>
