import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from 'path'
import * as pkg from './package.json'

const externals = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.dependencies || {})]

export default defineConfig({
  plugins: [react()],

  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    sourcemap: !!process.env.TAURI_DEBUG,
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'wind-editor',
      fileName: (format: string) => `wind-editor.${format}.js`
    },
    rollupOptions: {
      external: externals,
      output: {
        globals: {
          react: 'React'
        },
        exports: 'named'
      }
    }
  },
});
