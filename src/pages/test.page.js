import E from '../lib/elements-core';

import {TwoColumnGrid} from '../layouts/grid';
import TwoColumnTable from '../utils/two-column-table';

const fetchRandomNumber = (e) => {
  E.ajax('api/random')
    .then(data => {
      E.find('#ajaxDemo').text('Response: ' + data)
    });
};

const fetchSomeData = (e) => {
  E.ajax('api/test')
    .then(data => {
      E.find('#ajaxDemo').content(TwoColumnTable(data))
    });
};

const TestPage = () => {
  console.log(TestPage.name, 'lazy loaded');
  return E.div()
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
            .text('Fetch random number')
            .on('click', fetchRandomNumber),
          E.button()
            .css('button float-right')
            .text('Fetch data')
            .on('click', fetchSomeData),
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
};

export default TestPage;
