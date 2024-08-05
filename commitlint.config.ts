module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'header-pattern': [2, 'always', /^(\w+)\((\w+)#\d+\): .+$/],
      'subject-case': [2, 'always', 'sentence-case'],
    },
  };
  