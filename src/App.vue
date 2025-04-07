<script setup lang="ts">
import ControlPanel from "./components/ControlPanel.vue";
import WorkField from "./components/WorkField.vue";
import WidgetsMenu from "./components/widgets/WidgetsMenu.vue";
import { useWidgetsMenuStore } from "./store/widgets_menu";

const widgetsMenuState = useWidgetsMenuStore();
</script>

<template>
  <widgets-menu v-show="widgetsMenuState.show" />
  <control-panel />
  <work-field />
</template>
