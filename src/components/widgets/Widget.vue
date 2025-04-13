<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import Headline from "./Headline.vue";
import { widgets } from "./widgets";

const props = defineProps({
  name: { type: String, required: false },
  widgetType: { type: String, required: true },
  preview: { type: Boolean, required: false, default: false },
});
</script>

<template>
  <div class="widget">
    <headline :title="props.name ?? 'Unnamed'" :preview="props.preview" />
    <component :is="props.widgetType" />
  </div>
</template>
