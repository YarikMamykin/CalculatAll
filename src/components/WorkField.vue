<script setup lang="ts">
import About from '@/views/About.vue'
import Email from '@/views/Email.vue'
import WidgetsWindow from '@/views/WidgetsWindow.vue'
import Widget from '@/components/Widget.vue'
import { useControlPanelStore, CurrentView } from '@/store/control_panel'
import { useWorkFieldStore } from '@/store/work_field'

const controlPanelStore = useControlPanelStore()
const workfieldStore = useWorkFieldStore()
</script>

<template>
  <div id="work-field" @click="workfieldStore.$patch({ focused: undefined })">
    <About
      v-if="CurrentView.About === controlPanelStore.currentView"
      @cancel="controlPanelStore.resetView()"
    />
    <Email
      v-if="CurrentView.Email === controlPanelStore.currentView"
      @cancel="controlPanelStore.resetView()"
      @submit="controlPanelStore.resetView()"
    />
    <WidgetsWindow
      v-if="CurrentView.Add === controlPanelStore.currentView"
      @cancel="controlPanelStore.resetView()"
    />
    <Widget
      v-for="(widget, index) of workfieldStore.widgets"
      :key="widget"
      :id="index"
      :widgetType="widget"
    />
  </div>
</template>
