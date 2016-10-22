import E from '../lib/elements';

const twoColumnGrid = (col1, col2) =>
  E.div()
  .css('container')
  .children([
    E.div()
      .css('row')
      .children([
        E.div().css('column').children(col1),
        E.div().css('column').children(col2)
      ])
  ]);



const TestPage = E.div()
  .children([
    E.h1()
      .text('This is a test page'),
    E.p()
      .text('Lets try some AJAX!'),
    twoColumnGrid(
      [
        E.button()
          .css('button')
          .text('Click to fetch random number')
          .on('click', function(/*e*/) {
            this
              .ajax('api/random')
              .then(data =>
                this.find('#ajaxDemo').text('Response: ' + data)
              )
          }),
        E.button()
          .css('button')
          .text('Click to fetch data')
          .on('click', function(/*e*/) {
            this
              .ajax('api/test')
              .then(data =>
                this.find('#ajaxDemo').
                text(
                  'Response: ' + data.map(a => `${a.name} (${a.url})`).join(',')
                )
              )
          })
      ],
      [
        E.p()
          .attr('id', 'ajaxDemo')
          .text('Click button to get a random number')
      ]
    )
  ]);

export default TestPage;
