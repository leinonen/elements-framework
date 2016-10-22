var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
var path = require('path');
var env = require('yargs').argv.mode || 'dev-server';

var libraryName = 'app';

var plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  plugins.push(new HotModuleReplacementPlugin());
  outputFile = libraryName + '.js';
}

var getEntry = function(env) {
  if (env === 'dev-server') {
    return [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?reload=true',
      __dirname + '/src/app.js'
    ];
  } else {
    return __dirname + '/src/app.js';
  }
};

var SRC_PATH = path.join(__dirname, 'src');

var config = {
  entry: getEntry(env),
  devtool: 'source-map',
  output: {
    path: (env === 'dev-server') ? '/' : (__dirname + '/dist'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: '/dist'
  },
  module: {
    loaders: [
      { test: /\.js$/,  loader: 'babel', include: SRC_PATH }
      /*{ test: /\.js$/,  loader: 'eslint-loader', include: SRC_PATH },*/
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins
};

module.exports = config;
