<script setup lang="ts">
import { ref, defineProps, defineEmits, Ref } from "vue";
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

const inputPreprocessorCode: Ref = ref("");
const programmablePreprocessorCode: Ref = ref("");

function save() {
  settings.inputPreprocessorCode.set(inputPreprocessorCode.value.getCode());
  settings.programmableInputPreprocessorCode.set(
    programmablePreprocessorCode.value.getCode(),
  );
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
      <div class="widget-settings-item">
        <label>User input preprocessor</label>
        <code-editor
          ref="inputPreprocessorCode"
          :initialValue="widget.inputPreprocessorFunction"
        />
      </div>
      <div class="widget-settings-item">
        <label>Programmable input preprocessor</label>
        <code-editor
          ref="programmablePreprocessorCode"
          :initialValue="widget.programmableInputPreprocessorFunction"
        />
      </div>
      <slot />
    </div>
  </div>
</template>
