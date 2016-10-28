import E from '../../lib/elements-core';
import Router from '../../lib/elements-router';
import css from './menu.css';

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

const redrawItems = function() {
  this.children(MenuItems())
};

const Menu = E.h('ul#menu').subscribe('elements-router-change', redrawItems);

export default Menu;
