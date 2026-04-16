import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/predict-crop': 'http://localhost:8000',
      '/predict-fertilizer': 'http://localhost:8000',
      '/predict-rainfall': 'http://localhost:8000',
      '/predict-yield': 'http://localhost:8000',
      '/predict-disease': 'http://localhost:8000',
    }
  }
})
