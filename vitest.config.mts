// vitest.config.mts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    // This plugin reads your tsconfig.json and teaches Vitest what "@/" means
    tsconfigPaths({ projects: ['./v2/tsconfig.json'] })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mts',
  },
})