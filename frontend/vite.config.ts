import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],

  server: {
    host: true,        // wichtig für Container
    port: 5173,
    watch: {
      usePolling: true,
      interval: 100
    }
  }
})
