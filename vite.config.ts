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
  build: {
    minify: "terser", // Use Terser for aggressive minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs
        drop_debugger: true, // Remove debugger statements
        // pure_funcs: ["console.info", "console.debug"], // Remove specific console methods
      },
      mangle: true, // Shorten variable names
      format: {
        comments: false, // Remove comments
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          codemirror: [
            "codemirror",
            "@codemirror/lang-javascript",
            "@codemirror/language",
            "@codemirror/state",
            "@codemirror/view",
            "@lezer/highlight",
          ],
        },
      },
    },
  },
});
