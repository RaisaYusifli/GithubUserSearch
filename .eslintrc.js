module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:sonarjs/recommended',
    'plugin:security/recommended'
  ],
  plugins: ['simple-import-sort', 'import', 'prettier', 'sonarjs'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/no-children-prop': 0,
    'no-console': 0,
    'simple-import-sort/imports': 'error',
    'import/newline-after-import': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
