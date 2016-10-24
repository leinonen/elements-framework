import E from '../lib/elements';

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

const search = (query) => E
  .ajax(wikipediaSearchUrl(query), false)
  .then(function(data) {
    // wikipedia has some funky json
    let result = JSON.parse(data.substring(5, data.length - 1));
    return result.query.search;
  });

let wikiResultRow = item => E.li()
  .children([
    E.h4().text(item.title),
    E.p().html(item.snippet)
  ]);

const WikiSearch = E.div().children(
  [
    E.h4().text('Wikipedia search'),
    E.p().text('Type a query below and click the button to search Wikipedia.'),
    E.input()
      .attr('type', 'text')
      .attr('id', 'search')
      .value('illuminati'),
    E.button()
      .css('button')
      .text('Search')
      .on('click', function(e) {
        E.find('#result').text('Loading..');
        let query = E.find('#search').dom().value;

        search(query)
          .then(function(results) {
            E.find('#result').children([
              E.ul().children(results.map(wikiResultRow))
            ]);
          })
          .catch(function(err) {
            console.log(err);
            E.find('#result').text('Error loading result');
          });

      }),
    E.button()
      .css('button button-outline float-right')
      .text('Clear results')
      .on('click', function(e) {
        E.find('#result').clear();
      })
    ,
    E.div()
      .css('wiki-results')
      .attr('id', 'result')
  ]);

export default WikiSearch;