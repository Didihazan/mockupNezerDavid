import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import packageJson from './package.json'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ['framer-motion', 'lucide-react', 'react-hook-form', 'react-hot-toast']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'ui': ['lucide-react'],
          'animation': ['framer-motion'],
        },
      },
    },
    target: 'esnext',
    minify: 'terser',
  },
  server: {
    hmr: {
      overlay: false,
    },
    host: true,
  },
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
})