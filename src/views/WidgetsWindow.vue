<script setup lang="ts">
import ModalWindow from '@/components/ModalWindow.vue'
import Widget from '@/components/Widget.vue'
</script>

<template>
  <ModalWindow name="WIDGETS">
    <div class="widgets-container">
      <Widget />
      <Widget />
    </div>
  </ModalWindow>
</template>
