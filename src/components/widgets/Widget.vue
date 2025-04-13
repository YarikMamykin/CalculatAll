<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import Headline from "./Headline.vue";
import { widgets } from "./widgets";

const props = defineProps({
  name: { type: String, required: false },
  widgetType: { type: String, required: true },
  preview: { type: Boolean, required: false, default: false },
});

function stopIfPreview(e: Event) {
  if (props.preview) {
    e.stopPropagation();
  }
}
</script>

<template>
  <div class="widget" @click="stopIfPreview">
    <headline :title="props.name ?? 'Unnamed'" :preview="props.preview" />
    <component :is="props.widgetType" />
  </div>
</template>
