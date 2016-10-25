import E from '../../lib/elements-core';
import css from './header.css';

const Header = E.h1()
  .css('bold beautiful')
  .on('click', function(/*e*/) {
    this.toggleClass('beautiful');
  })
  .children([
    E.span().text('elements'),
    E.span()
      .css('micro')
      .text('micro DOM framework')
  ]);

export default Header;
