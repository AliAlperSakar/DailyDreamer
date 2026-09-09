import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves project pages from https://<user>.github.io/<repo>/,
// so the build needs to know it isn't living at the domain root.
const repoName = 'DailyDreamer'

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react()],
})
