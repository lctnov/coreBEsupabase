module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    // 'next/core-web-vitals' removed because ESLint couldn't resolve it in this environment.
    // If you want Next.js specific rules, install eslint-config-next and re-enable.
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Enforce strict mode semantics
    'strict': ['error', 'global'],

    // Disable prop-types rule for TSX files (we rely on TypeScript)
    'react/prop-types': 'off',

    // TypeScript specific
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error',

    // React
    'react/react-in-jsx-scope': 'off',

    // Performance helpers
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};