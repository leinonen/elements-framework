import E from '../lib/elements';
import {p, h1, h4, div, textInput} from '../lib/elements-helpers';
import {TwoColumnGrid} from '../layouts/grid';
import WikiSearch from '../components/wiki-search';



const WikiPage = div([
  h1('Wikipedia API test page'),
  TwoColumnGrid(
    [
      WikiSearch
    ],
    [
      E.img()
        .css('float-right')
        .attr('src', 'https://en.wikipedia.org/static/images/project-logos/enwiki.png')
    ]

  )
]);

export default WikiPage;
