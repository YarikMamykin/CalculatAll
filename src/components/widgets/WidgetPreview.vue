<script setup lang="ts">
import { type Component as AsyncComponent } from "vue";
import { type PropType, shallowRef } from "vue";
import { useWorkfieldStore } from "../../store/workfield";
import { Widget } from "../../model/widget";

const props = defineProps({
  name: { type: String, required: true },
  component: { type: Object as PropType<AsyncComponent>, required: true },
  widgetType: {
    type: Object as PropType<new (...args: any[]) => Widget>,
    required: true,
  },
});

const workfieldStore = useWorkfieldStore();

function addWidget(e: Event) {
  e.stopPropagation();
  workfieldStore.addWidget(new props.widgetType(shallowRef(props.component)));
  return;
}
</script>

<template>
  <div class="widget widget-preview" @click="addWidget">
    <label>{{ props.name }}</label>
    <component :is="props.component" />
  </div>
</template>
