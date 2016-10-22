'use strict';

const
  express = require('express'),
  path = require('path'),
  webpack = require('webpack'),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  config = require('../webpack.config'),
  compiler = webpack(config),
  app = express(),
  port = 8080;

const serveStatic = dir => express.static(path.join(__dirname, dir));

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

app.use('/', serveStatic('../public'));
app.use('/css', serveStatic('../node_modules/milligram/dist'));

app.get('/api/test', (req, res, next) => {
  res.json([
    {
      name: 'Facebook',
      url: 'http://facebook.com'
    },
    {
      name: 'Google',
      url: 'http://google.com'
    },
    {
      name: 'Bing',
      url: 'http://bing.com'
    }
  ]);
});

app.get('/api/random', (req, res, next) => {
  res.json(Math.random() * 1000);
});


app.listen(port, () => console.log('Express Server listening on %d', port));

