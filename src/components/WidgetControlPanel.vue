<script setup lang="ts">
function narrowWidget() {
  console.log()
}
function widenWidget() {
  console.log()
}
</script>

<template>
  <div id="widget-control-panel">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      class="widget-control-panel-element"
      viewBox="0 0 488.4 488.4"
      @click="narrowWidget"
    >
      <path
        d="M393.8 260.9h94.6v-33.4h-94.6l40-39.5-23.7-23.7-80.2 79.9 80.2 79.9 23.7-23.7zM94.6 227.5H0v33.4h94.6l-40 39.5 23.7 23.7 80.2-79.9-80.2-79.9L54.6 188zM185.7 0H228v488.4h-42.3zM268.6 0h42.3v488.4h-42.3z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      class="widget-control-panel-element"
      viewBox="0 0 490 490"
      @click="widenWidget"
    >
      <path
        d="M425.8 228.3h-71.1v33.4h71.1l-39.6 39.7 23.7 23.7L490 245l-80.1-80.1-23.7 23.7zM64.2 261.7h71.1v-33.4H64.2l39.6-39.7-23.7-23.7L0 245l80.1 80.1 23.7-23.7zM178.5 0h50.2v490h-50.2zM269.5 0h50.2v490h-50.2z"
      />
    </svg>
  </div>
</template>
