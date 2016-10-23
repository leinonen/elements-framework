import E from '../lib/elements';

const TwoColumnGrid = (col1, col2) =>
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

export default TwoColumnGrid;
