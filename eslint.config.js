import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

export default [
  js.configs.recommended,
  {
    plugins: {
      stylistic,
    },
    rules: {
      'stylistic/indent': ['error', 2],
      'stylistic/semi': ['error', 'always'],
      'no-console': 'off',
    },
  },
];
