module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'space-before-function-paren': 0,
    'multiline-ternary': 0,
    'generator-star-spacing': 0,
    'react/display-name': 0,
    "react/prop-types": "off"
  }
}
