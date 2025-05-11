<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { basicSetup } from "@codemirror/basic-setup";
import { EditorView } from "@codemirror/view";
import { EditorState, Compartment } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";

const editorRef = ref<HTMLElement | null>(null);
let view: EditorView | null = null;

onMounted(() => {
  if (!editorRef.value) {
    console.error("Editor ref is not available");
    return;
  }

  try {
    const themeCompartment = new Compartment();
    const customTheme = EditorView.theme({}, { dark: true });

    const startState = EditorState.create({
      doc: JSON.stringify({ some: "value" }),
      extensions: [
        basicSetup,
        javascript({ typescript: true }), // Enable TypeScript syntax
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            console.log(update.state.doc.toString());
            //emit('update:modelValue', update.state.doc.toString());
          }
        }),
        themeCompartment.of(customTheme),
        //readonlyCompartment.of([]),
        //readonlyField,
        EditorView.domEventHandlers({
          beforeinput: (event, _) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains("cm-readonly")) {
              event.preventDefault();
              return true;
            }
            return false;
          },
        }),
      ],
    });

    view = new EditorView({
      state: startState,
      parent: editorRef.value,
    });

    // Apply initial readonly lines
    //if (props.readonlyLines && props.readonlyLines.length > 0) {
    //  view.dispatch({
    //    effects: setReadonlyLines.of(props.readonlyLines),
    //  });
    //}
  } catch (error) {
    console.error("Failed to initialize CodeMirror:", error);
  }
});

// Watch readonlyLines changes
//watch(
//  () => props.readonlyLines,
//  (newLines) => {
//    if (view && newLines) {
//      try {
//        view.dispatch({
//          effects: setReadonlyLines.of(newLines),
//        });
//      } catch (error) {
//        console.warn('Failed to update readonly lines:', error);
//      }
//    }
//  },
//  { deep: true }
//);

// Watch modelValue changes
watch(
  () => JSON.stringify({ some: "value" }),
  (newValue) => {
    if (view && newValue !== view.state.doc.toString()) {
      try {
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: newValue },
        });
      } catch (error) {
        console.warn("Failed to update editor content:", error);
      }
    }
  },
);

onUnmounted(() => {
  if (view) {
    view.destroy();
    view = null;
  }
});
</script>

<template>
  <div ref="editorRef"></div>
</template>
