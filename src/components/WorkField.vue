<script setup lang="ts">
import About from '@/views/About.vue'
import Email from '@/views/Email.vue'
import { useControlPanelStore, CurrentView } from '@/store/control_panel'
import { storeToRefs } from 'pinia'

const controlPanelStore = useControlPanelStore()
</script>

<template>
  <div id="work-field">
    <About
      v-if="CurrentView.About === controlPanelStore.currentView"
      @cancel="controlPanelStore.resetView()"
    />
    <Email
      v-if="CurrentView.Email === controlPanelStore.currentView"
      @cancel="controlPanelStore.resetView()"
      @submit="controlPanelStore.resetView()"
    />
  </div>
</template>
