import eslintPluginStylistic from '@stylistic/eslint-plugin'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      '@stylistic': eslintPluginStylistic,
    },
    rules: {
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: false }],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
    },
  },
]

