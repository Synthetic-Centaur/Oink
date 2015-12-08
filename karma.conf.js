var path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: [ 'PhantomJS' ],
    files: [
      'test/loadtests.js',
    ],
    port: 8080,
    captureTimeout: 60000,
    frameworks: [ 'phantomjs-shim', 'mocha', 'chai' ],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: [ 'mocha', 'coverage' ],
    preprocessors: {
      'test/loadtests.js': [ 'webpack', 'sourcemap'],
    },
    webpack: {
      devtool: 'eval',
      module: {
        preLoaders: [
          {
            test: /\.(js|jsx)$/,
            loader: 'isparta-instrumenter-loader',
            include: [
              path.join(__dirname, '/client')
            ]
          }
        ],
        loaders: [
          {
            test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
            loader: 'null-loader'
          },
          {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: [
              path.join(__dirname, '/client'),
              path.join(__dirname, '/test')
            ]
          }
        ]
      }
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text' }
      ]
    }
  });
};