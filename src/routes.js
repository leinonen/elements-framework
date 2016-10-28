import HomePage from './pages/home.page';
import TestPage from './pages/test.page';
import WikiPage from './pages/wiki.page';

const routes = [
  { path: '/',
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
];

export default routes;
