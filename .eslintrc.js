module.exports = {
  root: true,
  plugins: ['prettier', '@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended', 'next/core-web-vitals'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': ['error', { allow: ['error', 'warn', 'debug'] }],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'lodash',
            message: "Use specific imports instead, like `import merge from 'lodash/merge'`.",
          },
          {
            name: 'react',
            importNames: ['FunctionComponent'],
            message: "Use `import FC from 'react'` instead.",
          },
          {
            name: '@mui/material',
            message: "Use 2nd-level imports instead, like `import Dialog from '@mui/material/Dialog'`.",
          },
          {
            name: '@mui/lab',
            message: "Use 2nd-level imports instead, like `import LoadingButton from '@mui/lab/LoadingButton'`.",
          },
        ],
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    '@next/next/no-page-custom-font': 'off',
    '@next/next/no-head-element': 'off',
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', ignoreRestSiblings: true }],
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    // Application
    {
      files: ['src/**/*.{ts,tsx}'],
      plugins: ['deprecation', 'prettier', '@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
      parserOptions: {
        project: 'tsconfig.json',
      },
      rules: {
        'deprecation/deprecation': 'error',
        // Disabled rules; we might re-enable them later
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true, allowNullish: true }],
      },
    },

    // Configuration files
    {
      files: ['./*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },

    // Generated GraphQL files
    {
      files: ['src/graphql/client/generated/*.generated.{ts,tsx}'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },

    // Migrations
    {
      files: ['migrations/**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
