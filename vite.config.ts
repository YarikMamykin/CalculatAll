import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression({
      algorithm: "brotliCompress", // Use Brotli
      ext: ".br", // File extension for Brotli-compressed files
      threshold: 1024, // Compress files larger than 1KB
      deleteOriginFile: false, // Keep original files
      compressionOptions: {
        level: 11, // Maximum compression level (1-11, 11 is slowest but smallest)
      },
    }),
  ],
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
