<script setup lang="ts">
import Headline from "./Headline.vue";
import WidgetSettings from "./WidgetSettings.vue";
import { type Component as AsyncComponent } from "vue";
import { type PropType, ref, defineProps, defineEmits, type Ref } from "vue";
import { useWorkfieldStore } from "../../store/workfield";
import { ID } from "../../model/id";
import { Point } from "../../model/point";

const props = defineProps({
  component: { type: Object as PropType<AsyncComponent>, required: true },
  id: { type: ID, required: true },
});

const emit = defineEmits(["outputPressed", "inputPressed"]);

const workfieldStore = useWorkfieldStore();

const widget = workfieldStore.widget(props.id);

let showSettings = ref(false);

const widgetOutput: Ref<HTMLElement | undefined> = ref();
const widgetInput: Ref<HTMLElement | undefined> = ref();

function getDivCenter(element: HTMLElement): Point {
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  return { x, y };
}

function close() {
  workfieldStore.removeWidget(props.id);
}

function settings() {
  showSettings.value = true;
}

function handleInputClick(_: MouseEvent): void {
  emit("inputPressed", {
    p: getDivCenter(widgetInput.value as HTMLElement),
    id: props.id,
  });
}

function handleOutputClick(_: MouseEvent): void {
  emit("outputPressed", {
    p: getDivCenter(widgetOutput.value as HTMLElement),
    id: props.id,
  });
}
</script>

<template>
  <div class="widget">
    <widget-settings
      v-if="showSettings"
      :widgetId="props.id"
      @save="showSettings = false"
      @cancel="showSettings = false"
    />
    <headline
      :title="widget?.settings?.name ?? ''"
      @close="close"
      @settings="settings"
      v-if="!showSettings"
    />
    <component :is="props.component" v-if="!showSettings" />
    <div
      ref="widgetInput"
      class="widget-io widget-input"
      @click.prevent="handleInputClick($event)"
    ></div>
    <div
      ref="widgetOutput"
      class="widget-io widget-output"
      @click.prevent="handleOutputClick($event)"
    ></div>
  </div>
</template>
