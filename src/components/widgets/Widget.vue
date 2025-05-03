<script setup lang="ts">
import Headline from "./Headline.vue";
import WidgetSettings from "./WidgetSettings.vue";
import { type Component as AsyncComponent } from "vue";
import { type PropType, ref } from "vue";
import { useWorkfieldStore } from "../../store/workfield";
import { ID } from "../../model/id";

const props = defineProps({
  widgetType: { type: Object as PropType<AsyncComponent>, required: true },
  id: { type: ID, required: true },
});

const workfieldStore = useWorkfieldStore();

const widget = workfieldStore.widget(props.id);

let showSettings = ref(false);

function close() {
  workfieldStore.removeWidget(props.id);
}

function settings() {
  showSettings.value = true;
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
      :title="widget.settings.name"
      @close="close"
      @settings="settings"
      v-if="!showSettings"
    />
    <component :is="props.widgetType" v-if="!showSettings" />
  </div>
</template>
