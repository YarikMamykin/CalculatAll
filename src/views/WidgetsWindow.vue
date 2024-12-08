<script setup lang="ts">
import ModalWindow from '@/components/ModalWindow.vue'
import WidgetPreview from '@/components/WidgetPreview.vue'
import { widgets, widgetTypes } from '@/components/widgets'
import { ref } from 'vue'
import { useWorkFieldStore, WidgetInfo } from '@/store/work_field'

const widgetsPreview = ref()
const workfieldStore = useWorkFieldStore()
function onWidgetSelected(widgetType: string) {
  workfieldStore.widgets.push(new WidgetInfo(widgetType))
  widgetsPreview.value?.cancel()
}
</script>

<template>
  <ModalWindow ref="widgetsPreview" name="WIDGETS">
    <div class="widgets-container">
      <WidgetPreview
        v-for="widgetType of widgetTypes"
        :key="widgetType"
        :widgetType="widgetType"
        @selected="onWidgetSelected"
      />
    </div>
  </ModalWindow>
</template>
