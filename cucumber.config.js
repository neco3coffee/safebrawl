module.exports = {
  default: {
    require: ['_user/**/*.steps.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' },
    paths: ['_user/**/*.feature'],
  },
};
