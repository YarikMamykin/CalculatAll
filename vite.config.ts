import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    dedupe: [
      "codemirror",
      "@codemirror/lang-javascript",
      "@codemirror/language",
      "@codemirror/state",
      "@codemirror/view",
      "@lezer/highlight",
    ],
  },
});
