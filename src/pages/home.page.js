import E from '../lib/elements';

const TestPage = E.div()
  .children([
    E.h1()
      .text('Welcome!'),
    E.p()
      .text('This is an example application using the Elements Micro DOM Framework!'),
    E.p()
      .html('You can do lots of <strong>crazy stuff</strong> with it. Here are some of its features:'),
    E.ul()
      .children([
        'Simple chainable API',
        'Simple Router',
        'AJAX',
        'Publish / Subscribe messaging'
      ].map(item => E.li().text(item)))
  ]);

export default TestPage;
