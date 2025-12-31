<script setup lang="ts">
import Headline from "./Headline.vue";
import { useWidgetsMenuStore } from "../../store/widgets_menu";
import { widgets } from "./widgets";
import WidgetPreview from "./WidgetPreview.vue";

const widgetsMenuState = useWidgetsMenuStore();
</script>

<template>
  <div id="widgets-menu-container">
    <div id="widgets-menu">
      <headline title="Widgets" @close="widgetsMenuState.show = false" />
      <div class="widgets-preview-container">
        <widget-preview
          v-for="(widget, name) of widgets"
          :key="name"
          :widgetType="widget"
          :name="name"
        />
      </div>
    </div>
  </div>
</template>
