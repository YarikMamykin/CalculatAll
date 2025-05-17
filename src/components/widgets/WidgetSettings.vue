<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { useWorkfieldStore } from "../../store/workfield";
import { WidgetSettings } from "../../model/widget_settings";
import CodeEditor from "../CodeEditor.vue";
import SettingsHeadline from "./SettingsHeadline.vue";
import { ID } from "../../model/id";

const props = defineProps({
  widgetId: { type: ID, required: true },
});

const emit = defineEmits(["save", "cancel"]);

const workfieldStore = useWorkfieldStore();

const widget = workfieldStore.widget(props.widgetId);

if (!widget) {
  throw new Error("Widget undefined!");
}

const settings: WidgetSettings = widget.settings.clone();

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
      <div class="widget-settings-item vertical">
        <label>User input preprocessor</label>
        <code-editor :initialValue="widget.inputPreprocessorFunction" />
      </div>
      <div class="widget-settings-item vertical">
        <label>Programmable input preprocessor</label>
        <code-editor
          :initialValue="widget.programmableInputPreprocessorFunction"
        />
      </div>
      <slot />
    </div>
  </div>
</template>
