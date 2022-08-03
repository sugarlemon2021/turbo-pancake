module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb', 'airbnb/hooks', 'prettier'],
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'no-undef': 'error'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [],
  rules: {
    // Require explicit return and argument types on exported functions' and classes' public class methods
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Ensure consistent use of file extension within the import path
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never'
      }
    ],

    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['scripts/**', 'tailwind.config.js', 'webpack.config.ts']
      }
    ],

    // Validate import order/groupings
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }
    ],

    // Use .jsx extension for React components
    // https://github.com/airbnb/javascript/tree/master/react#naming
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],

    // Disallow JSX props spreading
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
    'react/jsx-props-no-spreading': 'off',

    // Prevent missing props validation in a React component definition
    // Checked by TS
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
    'react/prop-types': 'off',

    // Prevent missing React when using JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
    'react/react-in-jsx-scope': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    },
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
};
