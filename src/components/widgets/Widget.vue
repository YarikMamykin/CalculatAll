<script setup lang="ts">
import Headline from "./Headline.vue";
import WidgetSettings from "./WidgetSettings.vue";
import { type Component as AsyncComponent } from "vue";
import { type PropType, shallowRef, ref } from "vue";
import { useWorkfieldStore } from "../../store/workfield";
import { generateWidgetId } from "../widgets/widgets";

const props = defineProps({
  name: { type: String, required: false, default: "Unnamed" },
  widgetType: { type: Object as PropType<AsyncComponent>, required: true },
  preview: { type: Boolean, required: false, default: false },
  id: { type: String, required: false, default: generateWidgetId() },
});

const workfieldStore = useWorkfieldStore();
let showSettings = ref(false);

function selectOrInteract(e: Event) {
  if (props.preview) {
    e.stopPropagation();
    workfieldStore.addWidget({
      id: generateWidgetId(),
      name: props.name,
      widgetType: shallowRef(props.widgetType),
    });
    return;
  }
}

function close() {
  workfieldStore.removeWidget(props.id);
}

function settings() {
  showSettings.value = true;
}
</script>

<template>
  <div class="widget" @click="selectOrInteract">
    <widget-settings
      v-if="showSettings"
      :defaultName="props.name"
      @cancel="showSettings = false"
    />
    <headline
      :title="props.name"
      :preview="props.preview"
      @close="close"
      @settings="settings"
      v-if="!showSettings"
    />
    <component :is="props.widgetType" v-if="!showSettings" />
  </div>
</template>
