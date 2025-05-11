<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { CodeEditor } from "../model/code_editor";

const editorRef = ref<HTMLElement | null>(null);
const value = "function test() { return 'hello'; }";
let codeEditor: CodeEditor = new CodeEditor(editorRef, value);

onMounted(() => {
  try {
    codeEditor.mount();
  } catch (error) {
    console.error("Failed to mount CodeEditor:", error);
  }
});

onUnmounted(() => {
  codeEditor.unmount();
});
</script>

<template>
  <div ref="editorRef"></div>
</template>
