<script setup lang="ts">
import { useWorkfieldStore } from "../store/workfield";
import Connection from "./widgets/Connection.vue";
import Widget from "./widgets/Widget.vue";
import { Point } from "../model/point";
import { type ID } from "../model/id";
import { computed } from "vue";
import { type Widget as WidgetModel } from "../model/widget";

const workfieldStore = useWorkfieldStore();
const widgets = workfieldStore.widgets;
const drawing = computed(() => workfieldStore.drawing);
const points = computed(() => workfieldStore.points);
const connections = computed(() => workfieldStore.connections);

let outputId: ID;

interface IOPressedEvent {
  p: Point;
  id: ID;
}

function widgetOutputPressed({ p, id }: IOPressedEvent) {
  if (drawing.value) {
    return;
  }
  workfieldStore.addTemporaryConnectionPoint(p);
  workfieldStore.toggleDrawing();
  outputId = id;
}

function handleMouseMove(event: MouseEvent): void {
  if (!drawing.value) {
    return;
  }

  workfieldStore.addTemporaryConnectionPoint(
    new Point(event.clientX, event.clientY),
  );
}

function widgetInputPressed({ p, id }: IOPressedEvent): void {
  if (!drawing.value) {
    return;
  }

  if (id === outputId) {
    workfieldStore.toggleDrawing();
    workfieldStore.resetTemporaryConnection();
    return;
  }

  workfieldStore.addTemporaryConnectionPoint(p);

  (workfieldStore.widget(outputId) as WidgetModel).output.subscribe(
    (value: unknown) => {
      (workfieldStore.widget(id) as WidgetModel).programmableInput.set(value);
    },
    id,
  );

  workfieldStore.addConnection({
    output: outputId,
    input: id,
    points: points.value,
  });

  workfieldStore.toggleDrawing();
  workfieldStore.resetTemporaryConnection();
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
      v-for="(connection, idx) in connections"
      :key="idx"
      :points="connection.points.map((p) => p.toString()).join(' ')"
    />

    <connection
      v-if="drawing"
      :points="points.map((p) => p.toString()).join(' ')"
      :temp="true"
    />
  </div>
</template>
