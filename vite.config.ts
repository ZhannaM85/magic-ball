import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Sub-path for GitHub Pages: https://zhannam85.github.io/magic-ball/
  // Override with: vite build --base / when building for Capacitor native
  base: '/magic-ball/',
})
