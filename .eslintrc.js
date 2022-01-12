module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-undef': 'off',
        'react-native/no-inline-styles': 'off',
      },
    },
  ],
};
