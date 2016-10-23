/**
 * Elements Router
 * Minimal router for the Elements Micro DOM Framework
 * By Peter Leinonen 2016
 */

import E from './elements';

function Router() {
  let _routes = [];
  let activeRoute = '';
  let router = {};
  let targetSelector = null;

  const dispatchRoute = path => {
    document.dispatchEvent(new CustomEvent('elements-router-change', {
      'detail': {
        route: path
      }
    }));
  };

  const extractPathFromHash = value => value.split('#')[1];

  router.target = function(selector) {
    targetSelector = selector;
    return router;
  };

  router.configure = function(routes) {
    _routes = routes;
    return router;
  };

  router.addRoute = function(route) {
    _routes.push(route);
    return router;
  };

  router.listen = function() {
    window.addEventListener('hashchange', function(e) {
      router.changeRoute(extractPathFromHash(e.newURL));
    });
    let initialHash = extractPathFromHash(location.hash) || '/';
    router.navigate(initialHash);
    router.changeRoute(initialHash);
    return router;
  };

  router.items = function() {
    return _routes.map(r => ({
      path: r.path,
      name: r.name,
      active: r.path === activeRoute
    }));
  };

  router.navigate = function(path) {
    location.hash = path;
  };

  router.changeRoute = function(path) {
    let matchedRoutes = _routes.filter(rt => rt.path === path);
    if (matchedRoutes.length > 0) {
      E.find(targetSelector).content(matchedRoutes[0].component);
      activeRoute = path;
      dispatchRoute(path);
      console.log('route changed to:', path);
    } else {
      console.log('route not found:', path);
      router.navigate('/');
    }
  };

  return router;
}

export default new Router();
