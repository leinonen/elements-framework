import E from '../../lib/elements-core';
import css from './header.css';

const magic = function(test) {
  console.log(test);
  this.toggleClass('beautiful');
};

const Header = E.h1()
  .css('bold beautiful')
  .extend('magic', magic)
  .on('click', function(/*e*/) {
    this.magic('do crazy things!');
  })
  .children([
    E.span().text('elements'),
    E.span()
      .css('micro')
      .text('micro DOM framework')
  ]);

export default Header;
