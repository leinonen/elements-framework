import E from '../lib/elements';
import {ThreeColumnGrid} from '../layouts/grid';

const wikipediaSearchUrl = query => {
  let params = {
    callback: '?',
    srsearch: encodeURIComponent(query),
    action: 'query',
    list: 'search',
    format: 'json',
    origin: '*'
  };
  return 'https://en.wikipedia.org/w/api.php?' +
    Object.keys(params).map(k => k + '=' + params[k]).join('&');
};

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
      E.p().text('This is the third column'),
      E.input()
        .attr('type', 'text')
        .attr('id', 'search')
        .value('illuminati'),
      E.button()
        .css('button')
        .text('Search')
        .on('click', function(e) {
          let url = wikipediaSearchUrl(E.find('#search').dom().value);
          E.find('#result').text('Loading..');
          E.ajax(url, false)
            .then(function(data) {
              // wikipedia has some funky json
              let result = JSON.parse(data.substring(5, data.length - 1));
              return result.query.search;
            })
            .then(function(results) {

              let mapItem = item => E.li()
                .children([
                  E.h4().text(item.title),
                  E.p().html(item.snippet)
                ]);

              E.find('#result').children([
                E.ul().children(results.map(mapItem))
              ]);

            })
            .catch(function(err) {
              console.log(err);
            });

        }),
      E.div()
        .attr('id', 'result')
    ]
  )
]);

export default TestPage;
