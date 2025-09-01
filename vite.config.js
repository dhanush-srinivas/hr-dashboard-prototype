import { defineConfig } from 'vite'

// Auto-set base for GitHub Pages project sites: /repo-name/
const base = process.env.CI && process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : '/'

export default defineConfig({
  base,
  server: { port: 5173, open: true },
})
