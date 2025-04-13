<script setup lang="ts">
import Headline from "./Headline.vue";
import { type Component as AsyncComponent } from "vue";
import { type PropType } from "vue";

const props = defineProps({
  name: { type: String, required: false },
  widgetType: { type: Object as PropType<AsyncComponent>, required: true },
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
