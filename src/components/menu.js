import E from '../lib/elements';
import Router from '../lib/elements-router';

const Menu = E.ul()
  .attr('id', 'menu')
  .exec(function () {
    this.children(

      Router.items().map(
        route => E.li()
          .children([
            E.a()
              .text(route.name)
              .attr('href', '#' + route.path)
          ])
      )

    )
  }, 10);

export default Menu;
