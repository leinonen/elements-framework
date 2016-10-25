import E from './lib/elements-core';
import Router from './lib/elements-router';

import Header from './components/Header/header';
import Menu from './components/Menu/menu';

import HomePage from './pages/home.page';
import TestPage from './pages/test.page';
import WikiPage from './pages/wiki.page';

E.div()
  .css('container')
  .children([
    Header,
    Menu,
    E.div()
      .attr('id', 'content')
  ])
  .appendTo('body');

Router
  .target('#content')
  .configure([
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/test',
      name: 'Test',
      component: TestPage
    },
    {
      path: '/wikipedia/:query',
      name: 'Search Wikipedia',
      component: WikiPage
    },
    {
      path: '/wikipedia',
      name: 'Search Wikipedia',
      component: WikiPage
    }
  ])
  .listen();
