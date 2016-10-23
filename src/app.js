import E from './lib/elements';
import Router from './lib/elements-router';

import Header from './components/header';
import Menu from './components/menu';

import HomePage from './pages/home.page';
import TestPage from './pages/test.page';
import BangPage from './pages/bang.page';

let application = E.div()
  .css('container')
  .children([
    Header,
    Menu,
    E.div()
      .attr('id', 'content')
  ]).appendTo('body');

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
      path: '/bang',
      name: 'Bang Bang!',
      component: BangPage
    }
  ])
  .listen();
