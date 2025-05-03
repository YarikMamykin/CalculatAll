<script setup lang="ts">
import { useWorkfieldStore } from "../store/workfield";
import Widget from "./widgets/Widget.vue";

const workfieldStore = useWorkfieldStore();
const widgets = workfieldStore.widgets;
</script>

<template>
  <div id="workfield">
    <widget
      v-for="[id, widget] in widgets"
      :key="id"
      :id="id"
      :widgetType="widget.widgetType"
      :name="widget.settings.name"
      :preview="false"
    />
  </div>
</template>
