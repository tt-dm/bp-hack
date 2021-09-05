const path = require('path');


const extensions = ['.js', '.ts', '.tsx', '.json', '.css', '.scss'];

const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules)
    .reduce((acc, rule) => { acc[`jsx-a11y/${rule}`] = 'off'; return acc }, {})

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'airbnb',
  ],
  settings: {
    'import/extensions': extensions,
    'import/resolver': {
      alias: {
        map: [
          ['Components', path.join(__dirname, 'comps')],
          ['Lib', path.join(__dirname, 'lib')],
          ['Lake', path.join(__dirname, 'lib/apollo/schemas')],
        ],
        extensions,
      },
      node: {
        extensions,
      },
    },
    'import/core-modules': [
      'redux-saga/effects',
    ],
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    ...a11yOff,
    camelcase: "off",
    '@typescript-eslint/camelcase': ["off"],
    indent: 'off',
    'linebreak-style': 'off',
    'max-len': [
      'warn',
      {
        code: 100,
        tabWidth: 4,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'arrow-parens': [
      'error',
      'as-needed',
      {
        requireForBlockBody: false,
      },
    ],
    'object-curly-newline': [
      'error',
      {
        multiline: true,
        consistent: true,
      },
    ],
    curly: [
      'error',
      'multi-or-nest',
    ],
    'nonblock-statement-body-position': [
      'error',
      'below',
    ],
    'operator-linebreak': [
      'error',
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
        },
      },
    ],
    'react/jsx-filename-extension': 'off',
    'react/jsx-indent': [
      'error',
      4,
    ],
    'react/jsx-indent-props': [
      'error',
      4,
    ],
    'react/sort-comp': [
      'error',
      {
        order: [
          'instance-variables',
          'static-methods',
          'lifecycle',
          'everything-else',
          'rendering',
        ],
        groups: {
          rendering: [
            '/^render.+$/',
            'render',
          ],
        },
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'jsx-quotes': [
      'error',
      'prefer-single',
    ],
    'no-restricted-syntax': 'off',
    'no-mixed-operators': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
    'no-nested-ternary': 'off',
    'no-confusing-arrow': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
      },
    ],
    'implicit-arrow-linebreak': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/indent': [
      'error',
      4,
      {
        SwitchCase: 1,
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    'import/no-unresolved': [
      'warn',
      {
        commonjs: true,
        caseSensitive: true,
      },
    ],
    'import/newline-after-import': [
      'error',
      {
        count: 2,
      },
    ],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/order': [
      'warn',
      {
        groups: [
          [
            'builtin',
            'external',
          ],
          'internal',
          [
            'parent',
            'sibling',
            'index',
          ],
        ],
        'newlines-between': 'always',
      },
    ],
  },
};
