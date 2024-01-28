module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte']
  },
  extends: [
    './config/eslint-style.cjs',
    './config/eslint-svelte.cjs',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended'
  ],
  plugins: [
    '@typescript-eslint'
  ],
  ignorePatterns: ['app.css', 'vite-env.d.ts'],
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  ]
}