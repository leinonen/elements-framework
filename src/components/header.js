import E from '../lib/elements';

const Header = E.h1()
  .css('bold beautiful')
  .text('elements')
  .on('click', function(/*e*/) {
    this.toggleClass('beautiful');
  })
  .children([
    E.span()
      .css('micro')
      .text('micro DOM framework')
  ]);

export default Header;
