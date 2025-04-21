<script setup lang="ts">
import WidgetHeadlineButton from "../buttons/WidgetHeadlineButton.vue";
import { defineEmits } from "vue";

const emit = defineEmits(["save", "cancel"]);
</script>

<template>
  <div class="headline">
    <label class="headline-title">Settings</label>
    <div class="all-centered headline-buttons">
      <widget-headline-button @click="() => emit('save')">
        <img class="default-inner-size" src="@/assets/save.svg" />
      </widget-headline-button>
      <widget-headline-button @click="() => emit('cancel')">
        <img class="default-inner-size" src="@/assets/cross-sign.svg" />
      </widget-headline-button>
    </div>
  </div>
</template>
