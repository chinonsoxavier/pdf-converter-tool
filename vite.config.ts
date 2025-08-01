import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/pdf-worker': {
        target: 'https://unpkg.com/pdfjs-dist@3.8.162/legacy/build/pdf.worker.min.js',
        rewrite: (path) => path.replace(/^\/pdf-worker/, ''),
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
