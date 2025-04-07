<script setup lang="ts">
import Headline from "./Headline.vue";
import { useWidgetsMenuStore } from "../../store/widgets_menu";

const widgetsMenuState = useWidgetsMenuStore();
</script>

<template>
  <div id="widgets-menu-container">
    <div id="widgets-menu">
      <headline title="Widgets" @close="widgetsMenuState.show = false" />
    </div>
  </div>
</template>
