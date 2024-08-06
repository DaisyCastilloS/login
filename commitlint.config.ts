module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-pattern': [2, 'always', /^(\w+)\(\w+#\d+\): .+$/],
    'type-enum': [
      2,
      'always',
      [
        'build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'
      ]
    ],
    'subject-case': [2, 'always', 'sentence-case'],
  },
};
