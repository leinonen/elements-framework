/**
 * Elements Router
 * Minimal router for the Elements Micro DOM Framework
 * By Peter Leinonen 2016
 */

function Router() {
  let _routes = [];
  let activeRoute = '';
  let router = {};
  let targetSelector = null;

  function dispatchRoute(path) {
    var event = new CustomEvent('elements-router-change', {
      'detail': {
        route: path
      }
    });
    document.dispatchEvent(event);
  }

  router.target = function (selector) {
    targetSelector = selector;
    return router;
  };

  router.configure = function(routes) {
    _routes = routes;
    return router;
  };

  router.addRoute = function (route) {
    _routes.push(route);
    return router;
  };

  router.items = function() {
    return _routes.map(r => ({
      path: r.path,
      name: r.name,
      active: r.path === activeRoute
    }));
  };

  router.listen = function () {
    window.addEventListener('hashchange', function (e) {
      let hash = e.newURL.split('#')[1];
      console.log('route change', hash);
      router.changeRoute(hash);
    });
    let initialHash = location.hash.split('#')[1] || '/';
    router.navigate(initialHash);
    router.changeRoute(initialHash);
    return router;
  };

  router.navigate = function (path) {
    location.hash = path;
    return router;
  };

  router.changeRoute = function (path) {
    activeRoute = path;
    dispatchRoute(path);
    let r = _routes.filter(rt => rt.path === path);
    if (r.length > 0) {
      let targetEl = document.querySelector(targetSelector);
      while (targetEl.firstChild) {
        targetEl.removeChild(targetEl.firstChild);
      }
      targetEl.appendChild(r[0].component.dom());
    } else {
      console.log('route not found:', path);
      router.navigate('/');
    }
    return router;
  };

  return router;
}

export default new Router();
