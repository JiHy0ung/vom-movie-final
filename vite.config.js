import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // 👉 소스맵 제거!
    minify: 'esbuild' // 기본값이라 명시하지 않아도 되지만 넣어줘도 됨
  }
})
