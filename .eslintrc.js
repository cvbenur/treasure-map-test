module.exports = {
  root: true,
  env: { node: true },
  parser: '@typescript-eslint/parser',
  plugins: [ '@typescript-eslint' ],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: './tsconfig.json'
      },
    }
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended'
  ],
  rules: {
  }
}
