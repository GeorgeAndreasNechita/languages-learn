import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],

  server: {
    host: true, // wichtig für Container
    port: 5173,
    watch: {
      usePolling: true,
      interval: 100,
    },
    proxy: {
      "/api/words": {
        target: "http://backend:5000",
        changeOrigin: true,
      },
      "/api/articles": {
        target: "http://backend:5000",
        changeOrigin: true,
      },
      "/api/feedback": {
        target: "http://backend:5000",
        changeOrigin: true,
      },
    },
  },
});
