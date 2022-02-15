/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
    'prefer-object-spread': 2,
    'prefer-destructuring': ['error', {
      'array': true,
      'object': true
    }, {
      'enforceForRenamedProperties': false
    }]
  }
};
