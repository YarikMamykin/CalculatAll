<script setup lang="ts">
import { type Component as AsyncComponent } from "vue";
import { type PropType, shallowRef } from "vue";
import { useWorkfieldStore } from "../../store/workfield";
import { WidgetSettings } from "../../model/widget_settings";

const props = defineProps({
  name: { type: String, required: true },
  widgetType: { type: Object as PropType<AsyncComponent>, required: true },
});

const workfieldStore = useWorkfieldStore();

function addWidget(e: Event) {
  e.stopPropagation();
  workfieldStore.addWidget({
    settings: new WidgetSettings(props.name),
    widgetType: shallowRef(props.widgetType),
  });
  return;
}
</script>

<template>
  <div class="widget widget-preview" @click="addWidget">
    <label>{{ props.name }}</label>
    <component :is="props.widgetType" />
  </div>
</template>
