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
  if (drawing.value) {
    return;
  }
  workfieldStore.addTemporaryConnectionPoint(p);
  workfieldStore.toggleDrawing();
}

function handleMouseMove(event: MouseEvent): void {
  if (!drawing.value) {
    return;
  }

  workfieldStore.addTemporaryConnectionPoint(
    new Point(event.clientX, event.clientY),
  );
}

function widgetInputPressed(_: MouseEvent): void {
  if (!drawing.value) {
    return;
  }

  const pointsSaved = points.value.map((p: Point) => new Point(p.x, p.y));
  workfieldStore.toggleDrawing();
  workfieldStore.resetTemporaryConnection();
  console.log(pointsSaved);
}
</script>

<template>
  <div id="workfield" @mousemove="handleMouseMove($event)">
    <widget
      v-for="[id, widget] in widgets"
      :key="id.toString()"
      :id="id"
      :component="widget.component"
      @outputPressed="widgetOutputPressed($event)"
      @inputPressed="widgetInputPressed($event)"
    />

    <connection
      v-if="drawing"
      :points="points.map((p) => p.toString()).join(' ')"
    />
  </div>
</template>
