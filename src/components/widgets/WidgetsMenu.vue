<script setup lang="ts">
import Headline from "./Headline.vue";
import { useWidgetsMenuStore } from "../../store/widgets_menu";
import { ref } from "vue";
import { widgets } from "./widgets";
import Widget from "./Widget.vue";

const widgetsMenuState = useWidgetsMenuStore();
const preview = ref(true);
</script>

<template>
  <div id="widgets-menu-container">
    <div id="widgets-menu">
      <headline title="Widgets" @close="widgetsMenuState.show = false" />
      <div class="widgets-preview-container">
        <widget
          v-for="(widget, name) of widgets"
          :key="name"
          :widgetType="widget"
          :name="name"
          :preview="preview"
        />
      </div>
    </div>
  </div>
</template>
