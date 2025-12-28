import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // <--- Tambah baris ini

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Tambahkan blok resolve ini di bawah plugins
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
    },
  },
})