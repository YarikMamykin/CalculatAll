<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import Headline from "./Headline.vue";
import { widgets } from "./widgets";

const props = defineProps({
  name: { type: String, required: false },
  widgetType: { type: String, required: true },
});
</script>

<template>
  <div class="widget">
    <headline :title="props.name" />
    <component :is="props.widgetType" />
  </div>
</template>
