<script setup lang="ts">
import WidgetHeadlineButton from "../buttons/WidgetHeadlineButton.vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  preview: { type: Boolean, required: false, default: false },
});

const emit = defineEmits(["close", "settings"]);
</script>

<template>
  <div class="headline">
    <label class="headline-title">{{ props.title }}</label>
    <div class="all-centered headline-buttons">
      <widget-headline-button
        :active="!props.preview"
        @click="() => emit('settings')"
      >
        <img class="default-inner-size" src="@/assets/gear-sign.svg" />
      </widget-headline-button>
      <widget-headline-button
        :active="!props.preview"
        @click="() => emit('close')"
      >
        <img class="default-inner-size" src="@/assets/cross-sign.svg" />
      </widget-headline-button>
    </div>
  </div>
</template>
