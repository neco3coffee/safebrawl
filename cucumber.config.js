module.exports = {
  default: {
    require: ['👤user/**/*.steps.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar'],
    formatOptions: { snippetInterface: 'async-await' },
    paths: ['👤user/**/*.feature'],
  },
};
