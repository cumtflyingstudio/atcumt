module.exports = {
  extends: ['@antfu'],
  rules: {
    'vue/eqeqeq': 'warn',
    'no-console': ['error', { allow: ['warn', 'error', 'debug'] }],
    'vue/v-on-event-hyphenation': 'off',
  },
  ignorePatterns: ['node_modules/', 'dist/', 'browserPlugin/'],
}
