import E from '../lib/elements';

import TwoColumnGrid from '../layouts/two-column-grid';
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
          .css('button')
          .text('Click to fetch data')
          .on('click', function(/*e*/) {
            E.ajax('api/test')
              .then(data =>
                E.find('#ajaxDemo').content(TwoColumnTable(data))
              )
          })
      ],
      [
        E.h4()
          .text('Second column'),
        E.p()
          .text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id lectus sed massa finibus pharetra. Etiam aliquam dapibus lobortis.'),
        E.div().attr('id', 'ajaxDemo')
      ]
    )
  ]);

export default TestPage;
