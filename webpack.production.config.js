var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    'babel-core/polyfill',
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.min.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          optional: [ 'runtime' ],
          stage: 2,
          env: {
            development: {
              plugins: [
                'react-transform'
              ],
              extra: {
                'react-transform': {
                  transforms: [
                    {
                      transform: 'react-transform-hmr',
                      imports: [ 'react' ],
                      locals:  [ 'module' ]
                    }
                  ]
                }
              }
            }
          }
        }
      }
    ]
  }
}
