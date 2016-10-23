import E from '../lib/elements';
import {ThreeColumnGrid} from '../layouts/grid';

const TestPage = E.div().children([
  E.h1()
    .text('Bang bang development'),
  ThreeColumnGrid(
    [
      E.h4().text('Header 1'),
      E.p().text('This is the first column')
    ],
    [
      E.h4().text('Header 2'),
      E.p().text('This is the second column')
    ],
    [
      E.h4().text('Header 3'),
      E.p().text('This is the third column')
    ]
  )
]);

export default TestPage;
