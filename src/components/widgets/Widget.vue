<script setup lang="ts">
import Headline from "./Headline.vue";
import { type Component as AsyncComponent } from "vue";
import { type PropType } from "vue";
import { useWorkfieldStore } from "../../store/workfield";

const props = defineProps({
  name: { type: String, required: false, default: "Unnamed" },
  widgetType: { type: Object as PropType<AsyncComponent>, required: true },
  preview: { type: Boolean, required: false, default: false },
});

const workfieldStore = useWorkfieldStore();

function selectOrInteract(e: Event) {
  if (props.preview) {
    e.stopPropagation();
    workfieldStore.addWidget({
      name: props.name,
      widgetType: props.widgetType,
      id: "someid",
    });
  }
}
</script>

<template>
  <div class="widget" @click="selectOrInteract">
    <headline :title="props.name" :preview="props.preview" />
    <component :is="props.widgetType" />
  </div>
</template>
