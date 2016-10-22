var path = require('path');

var SRC_PATH = path.join(__dirname, 'src');

var config = {
  module: {
    preLoaders: [
      { test: /\.js$/, loaders: ['isparta'], include: SRC_PATH }
    ],
    loaders: [
      { test: /\.js$/,  loader: 'babel',  include: SRC_PATH}
    ]
  }
};

module.exports = config;
