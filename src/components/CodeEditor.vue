<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, defineExpose } from "vue";
import { CodeEditor } from "../model/code_editor";

const editorRef = ref<HTMLElement | null>(null);

const props = defineProps({
  initialValue: { type: String, required: true },
});

let codeEditor: CodeEditor = new CodeEditor(editorRef, props.initialValue);

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

function getCode(): string {
  return codeEditor.code;
}

defineExpose({ getCode });
</script>

<template>
  <div ref="editorRef"></div>
</template>
