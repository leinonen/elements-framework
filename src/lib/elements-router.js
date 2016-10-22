/**
 * Elements Router
 * Minimal router for the Elements Micro DOM Framework
 * By Peter Leinonen 2016
 */

function Router() {
  let routes = [];
  let router = {};
  let targetEL = null;

  router.target = function (el) {
    targetEL = el;
    return router;
  };

  router.addRoute = function (route) {
    routes.push(route);
    return router;
  };

  router.items = function() {
    return routes.map(r => ({
      path: r.path,
      name: r.name
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
    let r = routes.filter(rt => rt.path === path);
    if (r.length > 0) {
      while (targetEL.firstChild) {
        targetEL.removeChild(targetEL.firstChild);
      }
      targetEL.appendChild(r[0].component.dom());
    } else {
      console.log('route not found:', path);
      router.navigate('/');
    }
    return router;
  };

  return router;
}

export default new Router();
