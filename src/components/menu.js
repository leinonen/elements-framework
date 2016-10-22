import E from '../lib/elements';
import Router from '../lib/elements-router';

const Menu = E.ul()
  .attr('id', 'menu')
  .exec(function () {
    this.children(

      Router.items().map(
        route => E.li()
          .text(route.name)
          .on('click', () => Router.navigate(route.path))
      )

    )
  }, 10);

export default Menu;
