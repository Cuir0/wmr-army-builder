/// <reference types="vitest" />
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '$root': __dirname,
      '$components': path.resolve(__dirname, 'src/components'),
      '$types': path.resolve(__dirname, 'src/types'),
      '$builder': path.resolve(__dirname, 'src/builder')
    }
  },
  test: {
    include: ['./tests/**/*.{test,spec}.ts']
  }
})
