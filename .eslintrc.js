  module.exports = {
    root: true,
    env: {
      'node': true
    },
    extends: [
      'plugin:vue/essential',
      '@vue/typescript',
      '@vue/prettier',
    ],
    plugins: ['@typescript-eslint'],
    parserOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          '#': 'prettier config in here :)',
          'singleQuote': true,
          'semi': false,
          'trailingComma': 'none',
          'space-before-function-paren': 'off'
        }
      ]
    },
    "@typescript-eslint/no-this-alias": [
        "error",
        {
          "allowDestructuring": true, // Allow `const { props, state } = this`; false by default
          "allowedNames": ["vm"] // Allow `const vm= this`; `[]` by default
        }
      ]
  }
  