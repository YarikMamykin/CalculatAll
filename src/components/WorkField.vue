<script setup lang="ts">
import { useWorkfieldStore } from "../store/workfield";
import Connection from "./widgets/Connection.vue";
import Widget from "./widgets/Widget.vue";
import { Point } from "../model/point";
import { type ID } from "../model/id";
import { computed, type Ref, ref, reactive } from "vue";

const workfieldRef: Ref<HTMLElement | null> = ref(null);
const workfieldStore = useWorkfieldStore();
const widgets = workfieldStore.widgets;
const drawing = computed(() => workfieldStore.drawing);
const points = computed(() => workfieldStore.points);
const connections = computed(() => workfieldStore.connections);
const connectionsContainerStyle = reactive({
  height: `${window.screen.height}px`,
});

let outputId: ID;

interface IOPressedEvent {
  p: Point;
  id: ID;
}

function widgetOutputPressed({ p, id }: IOPressedEvent) {
  if (drawing.value) {
    return;
  }

  const workfieldRect = workfieldRef.value?.getBoundingClientRect();

  if (!workfieldRect) {
    return;
  }

  workfieldStore.addTemporaryConnectionPoint(
    new Point(p.x - workfieldRect.x, p.y - workfieldRect.y),
  );
  workfieldStore.toggleDrawing();
  outputId = id;
}

function handleMouseMove(event: MouseEvent): void {
  if (!drawing.value) {
    return;
  }

  const workfieldRect = workfieldRef.value?.getBoundingClientRect();

  if (!workfieldRect) {
    return;
  }

  workfieldStore.addTemporaryConnectionPoint(
    new Point(
      event.clientX - workfieldRect.x,
      event.clientY - workfieldRect.y + (workfieldRef.value?.scrollTop ?? 0),
    ),
  );
}

function handleScroll(_: Event): void {
  if (!drawing.value) {
    return;
  }

  const workfieldRect = workfieldRef.value?.getBoundingClientRect();

  if (!workfieldRect) {
    return;
  }

  connectionsContainerStyle.height = `${connectionsContainerStyle.height.split("px")[0] + (workfieldRef.value?.scrollTop ?? 0)}px`;
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

  const workfieldRect = workfieldRef.value?.getBoundingClientRect();

  if (!workfieldRect) {
    return;
  }

  workfieldStore.addTemporaryConnectionPoint(
    new Point(
      p.x - workfieldRect.x,
      p.y - workfieldRect.y + (workfieldRef.value?.scrollTop ?? 0),
    ),
  );

  workfieldStore.connectWidgets(outputId, id);

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
  <div
    id="workfield"
    ref="workfieldRef"
    @mousemove="handleMouseMove($event)"
    @scroll="handleScroll($event)"
  >
    <widget
      v-for="[id, widget] in widgets"
      :key="id.toString()"
      :id="id"
      :component="widget.component"
      @outputPressed="widgetOutputPressed($event)"
      @inputPressed="widgetInputPressed($event)"
    />
    <svg class="connection-container" :style="connectionsContainerStyle">
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
    </svg>
  </div>
</template>
