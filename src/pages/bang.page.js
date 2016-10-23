import E from '../lib/elements';
import {ThreeColumnGrid} from '../layouts/grid';

const TestPage = E.div().children([
  E.h1()
    .text('Bang bang development'),
  ThreeColumnGrid(
    [
      E.h4().text('Header 1'),
      E.p().text('This is the first column'),
      E.input()
        .attr('type', 'text')
        .value('')
        .on('keyup', function(e) {
          E.publish('magic', e.target.value)
        })
    ],
    [
      E.h4().text('Header 2'),
      E.p()
        .text('This is the second column')
        .subscribe('magic', function(value) {
          this.text(value);
        })
    ],
    [
      E.h4().text('Header 3'),
      E.p().text('This is the third column')
    ]
  )
]);

export default TestPage;
