import E from '../lib/elements';

import {TwoColumnGrid} from '../layouts/grid';
import TwoColumnTable from '../components/two-column-table';

const TestPage = E.div()
  .children([
    E.h1().text('This is a test page'),
    E.p().text('Lets try some AJAX!'),
    TwoColumnGrid(
      [
        E.h4()
          .text('First column'),
        E.p()
          .text('It is very easy to build complex layouts'),
        E.button()
          .css('button')
          .text('Click to fetch random number')
          .on('click', function(/*e*/) {
            E.ajax('api/random')
              .then(data =>
                E.find('#ajaxDemo').text('Response: ' + data)
              )
          }),
        E.button()
          .css('button float-right')
          .text('Click to fetch data')
          .on('click', function(/*e*/) {
            E.ajax('api/test')
              .then(data =>
                E.find('#ajaxDemo').content(TwoColumnTable(data))
              )
          }),
         E.div().attr('id', 'ajaxDemo')
      ],
      [
        E.h4()
          .text('Header 1'),
        E.p()
          .text('This is the first column'),
        E.input()
          .attr('type', 'text')
          .on('keyup', (e) => E.publish('magic', e.target.value)),
        E.h4()
          .text('Header 2'),
        E.p()
          .text('This is the second column')
          .subscribe('magic', function(value) {
            this.text(value);
          })

      ]
    )
  ]);

export default TestPage;
