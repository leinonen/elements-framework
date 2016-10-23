import E from '../lib/elements';
import Router from '../lib/elements-router';

const MenuItems = () => Router.items().map(
  route =>
    E.li()
      .css(route.active ? 'active' : '')
      .children([
        E.a()
          .text(route.name)
          .attr('href', '#' + route.path)
      ])
);

const Menu = E.ul()
  .attr('id', 'menu')
  .routeChange(function() {
    this.children(MenuItems())
  });

export default Menu;
