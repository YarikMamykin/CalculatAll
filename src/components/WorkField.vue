<script setup lang="ts">
import { useWorkfieldStore } from "../store/workfield";
import Widget from "./widgets/Widget.vue";

const workfieldStore = useWorkfieldStore();
const widgets = workfieldStore.widgets;
</script>

<template>
  <div id="workfield">
    <widget
      v-for="(widget, name) of widgets"
      :key="name"
      :widgetType="widget"
      :name="name"
      :preview="false"
    />
  </div>
</template>
