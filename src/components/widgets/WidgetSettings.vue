<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import SettingsHeadline from "./SettingsHeadline.vue";

const props = defineProps({
  defaultName: { type: String, required: true },
});

const emit = defineEmits(["save", "cancel"]);
</script>

<template>
  <div class="widget-settings">
    <settings-headline
      title="Settings"
      @save="() => emit('save')"
      @cancel="() => emit('cancel')"
    />
    <div class="widget-settings-items">
      <label>Name</label>
      <input type="text" :value="props.defaultName" />
      <slot />
    </div>
  </div>
</template>
