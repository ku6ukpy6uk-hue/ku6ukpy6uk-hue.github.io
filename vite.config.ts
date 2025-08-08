import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    outDir: 'dist',
  },
  base: './',
  server: {
    headers: {
      // Принудительно устанавливаем правильные MIME-типы
      "Content-Type": "application/javascript"
    }
  }
})
