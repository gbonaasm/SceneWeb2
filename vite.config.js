import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // semua request diarahkan ke index.html
    historyApiFallback: true,
  },
})
