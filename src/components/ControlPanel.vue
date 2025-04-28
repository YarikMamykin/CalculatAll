<script setup lang="ts">
import DefaultCircleButton from "./buttons/DefaultCircleButton.vue";
import { useWidgetsMenuStore } from "../store/widgets_menu";

const widgetsMenuState = useWidgetsMenuStore();
</script>

<template>
  <div class="centered-row control-panel">
    <div class="centered-row">
      <img class="default-size app-icon" src="/calculatall.webp" />
      <label class="app-name">CalculatAll</label>
    </div>
    <default-circle-button @click="widgetsMenuState.show = true">
      <img class="default-inner-size" src="@/assets/add-sign.svg" />
    </default-circle-button>
  </div>
</template>
