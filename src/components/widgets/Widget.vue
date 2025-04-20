<script setup lang="ts">
import Headline from "./Headline.vue";
import { type Component as AsyncComponent } from "vue";
import { type PropType, shallowRef } from "vue";
import { useWorkfieldStore } from "../../store/workfield";

const props = defineProps({
  name: { type: String, required: false, default: "Unnamed" },
  widgetType: { type: Object as PropType<AsyncComponent>, required: true },
  preview: { type: Boolean, required: false, default: false },
  id: { type: String, required: false, default: Math.random().toString(8) },
});

const workfieldStore = useWorkfieldStore();

function selectOrInteract(e: Event) {
  if (props.preview) {
    e.stopPropagation();
    workfieldStore.addWidget({
      name: props.name,
      widgetType: shallowRef(props.widgetType),
      id: props.id,
    });
    return;
  }
}

function close() {
  workfieldStore.removeWidget(props.id);
}
</script>

<template>
  <div class="widget" @click="selectOrInteract">
    <headline :title="props.name" :preview="props.preview" @close="close" />
    <component :is="props.widgetType" />
  </div>
</template>
