const webpackConfig = require('./webpack.test.config');
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');

const SPEC_PATTERN = 'src/**/*.spec.js';

module.exports = (config) => {
  config.set({
    frameworks: ['mocha'],
    reporters: ['coverage', 'mocha'],
    browsers: ['PhantomJS'],

    autoWatch: false,
    singleRun: true,

    logLevel: config.LOG_DEBUG,

    client: {
      mocha: {
        grep: argv.grep,
      },
    },

    files: [
      SPEC_PATTERN
    ],

    preprocessors: {
      [SPEC_PATTERN]: ['webpack'], // eslint-disable-line no-useless-computed-key
    },

    webpack: webpackConfig,

    // make Webpack bundle generation quiet
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },

    coverageReporter: {
      dir: path.join(process.cwd(), 'coverage'),
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' }
      ]
    }

  });
};
