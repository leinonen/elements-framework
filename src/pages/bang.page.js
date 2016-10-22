import E from '../lib/elements';

const TestPage = E.div()
  .children([
    E.h1()
      .text('Bang Bang!'),
    E.p()
      .text('Bang bang development!')
  ]);

export default TestPage;
