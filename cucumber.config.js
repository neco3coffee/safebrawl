module.exports = {
  default: {
    require: ['👤user/**/*.steps.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' },
    paths: ['👤user/**/*.feature'],
  },
};
