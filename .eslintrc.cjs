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
    'eslint:recommended',
    './config/eslint-style.cjs',
    './config/eslint-svelte.cjs',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended'
  ],
  plugins: [
    '@typescript-eslint'
  ],
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