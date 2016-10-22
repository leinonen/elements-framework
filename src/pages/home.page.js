import E from '../lib/elements';

const TestPage = E.div()
  .children([
    E.h1()
      .text('Welcome!'),
    E.p()
      .text('This is an example application using the elements micro framework!'),
    E.p()
      .html('You can do lots of <strong>crazy stuff</strong> with it. Here are some of its features:'),
    E.ul()
      .children([
        E.li().text('Simple chainable API'),
        E.li().text('Simple Router'),
        E.li().text('AJAX')
      ])
  ]);

export default TestPage;
