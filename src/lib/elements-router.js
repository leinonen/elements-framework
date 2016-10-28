/**
 * Elements Router
 * Minimal router for the Elements Micro DOM Framework
 * By Peter Leinonen 2016
 */

import E from './elements-core';
import {lookupRoute} from './elements-router-utils';

function Router() {
  let _routes = [];
  let activeRoute = '';
  let router = {};
  let targetSelector = null;
  let _params = null;
  let pageCache = {};

  const extractPathFromHash = value => value.split('#')[1];

  router.target = function(selector) {
    targetSelector = selector;
    return router;
  };

  router.configure = function(routes) {
    _routes = routes;
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
    })).filter(r => r.path.indexOf(':') === -1);
  };

  router.params = function() {
    return _params;
  };

  router.navigate = function(path) {
    location.hash = path;
  };

  router.changeRoute = function(path) {
    _params = null;
    let matchRoute = lookupRoute(_routes, path);
    if (matchRoute) {
      _params = matchRoute.params;
      activeRoute = path;

      // Cache pages that are functions. used for lazy loading
      if (typeof matchRoute.route.component === 'function') {
        let cacheKey = matchRoute.route.component.name;
        let cached = pageCache[cacheKey];
        if (cached) {
          E.find(targetSelector).content(cached);
        } else {
          pageCache[cacheKey] = matchRoute.route.component();
          E.find(targetSelector).content(pageCache[cacheKey]);
        }
      } else {
        E.find(targetSelector).content(matchRoute.route.component);
      }

      E.publish('elements-router-change', {
        route: path
      });
      console.log('route changed to:', path);
      console.log('params', matchRoute.params);
    } else {
      console.log('ROUTE NOT FOUND', path);
      router.navigate('/');
    }
  };

  return router;
}

export default new Router();
