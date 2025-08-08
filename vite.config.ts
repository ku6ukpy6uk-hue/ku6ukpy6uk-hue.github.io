import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    solidPlugin(), // Плагин для SolidJS
  ],
  base: '/ku6ukpy6uk-hue.github.io/', // Для репозитория username.github.io используйте '/'
  build: {
    target: 'esnext', // Сборка под современные браузеры
    outDir: 'dist',   // Папка для сборки
    assetsDir: 'assets', // Папка для статических ресурсов
    emptyOutDir: true, // Очищать папку перед сборкой
    sourcemap: true,   // Генерировать source maps для отладки
  },
  resolve: {
    alias: {
      '@': '/src', // Алиас для пути src/
    },
  },
  server: {
    port: 3000, // Порт для разработки
    open: true,  // Автоматически открывать браузер
    headers: {
      // Устанавливаем правильные MIME-типы
      "Content-Type": "application/javascript"
    }
  },
  optimizeDeps: {
    include: ['solid-js'], // Оптимизация зависимостей
  },
  css: {
    modules: {
      localsConvention: 'camelCase', // Стиль именования CSS-модулей
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`, // Глобальные SCSS переменные
      },
    },
  },
});
