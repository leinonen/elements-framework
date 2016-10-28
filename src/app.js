import E from './lib/elements-core';
import Router from './lib/elements-router';
import routes from './routes';

import Header from './components/Header/header';
import Menu from './components/Menu/menu';

const app = E.h('div#app.container')
  .children([ Header, Menu, E.h('div#content') ]);

app.extend('start', function() {
  this.appendTo('body');
  Router
    .target('#content')
    .configure(routes)
    .listen();
});

app.start();
