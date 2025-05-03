<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { useWorkfieldStore } from "../../store/workfield";
import { WidgetSettings } from "../../model/widget_settings";
import SettingsHeadline from "./SettingsHeadline.vue";
import { ID } from "../../model/id";

const props = defineProps({
  widgetId: { type: ID, required: true },
});

const emit = defineEmits(["save", "cancel"]);

const workfieldStore = useWorkfieldStore();

const widgetSettings: WidgetSettings = workfieldStore.widget(
  props.widgetId,
).settings;

const settings: WidgetSettings = widgetSettings.clone();

function save() {
  workfieldStore.updateWidget(props.widgetId, settings);
  emit("save");
}
</script>

<template>
  <div class="widget-settings">
    <settings-headline
      title="Settings"
      @save="save"
      @cancel="() => emit('cancel')"
    />
    <div class="widget-settings-items">
      <div class="widget-settings-item">
        <label>Name</label>
        <input type="text" v-model="settings.name" />
      </div>
      <slot />
    </div>
  </div>
</template>
