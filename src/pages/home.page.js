import E from '../lib/elements-core';

const HomePage = () => {
  console.log(HomePage.name, 'lazy loaded');
  return E.div()
    .children([
      E.h1()
        .text('Welcome!'),
      E.p()
        .text('This is an example application using the Elements Micro DOM Framework!'),
      E.p()
        .html('You can do lots of <strong>crazy stuff</strong> with it. Here are some of its features:'),
      E.ul()
        .children([
          'Simple chainable and extensible API',
          'Functional templating with pure javascript',
          'Basic router with parameters',
          'AJAX',
          'Publish / Subscribe messaging'
        ].map(item => E.li().text(item)))
    ]);
};

export default HomePage;
