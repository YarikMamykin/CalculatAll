<script setup lang="ts">
import { useWorkfieldStore } from "../store/workfield";
import Connection from "./widgets/Connection.vue";
import Widget from "./widgets/Widget.vue";
import { Point } from "../model/point";
import { computed } from "vue";

const workfieldStore = useWorkfieldStore();
const widgets = workfieldStore.widgets;
const drawing = computed(() => workfieldStore.drawing);
const points = computed(() => workfieldStore.points);

function widgetOutputPressed(p: Point) {
  if (drawing) {
    return;
  }
  workfieldStore.addTemporaryConnectionPoint(p);
  workfieldStore.toggleDrawing();
}
</script>

<template>
  <div id="workfield">
    <widget
      v-for="[id, widget] in widgets"
      :key="id.toString()"
      :id="id"
      :component="widget.component"
      @outputPressed="widgetOutputPressed($event)"
    />

    <connection v-if="drawing" :points="points" />
  </div>
</template>
