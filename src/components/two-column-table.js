import E from '../lib/elements';

const TwoColumnTable = (data) => E.table()
  .children(
    data.map(item => E.tr()
      .children([
        E.td()
          .text(item.name),
        E.td()
          .text(item.url)
      ])
    )
  );

export default TwoColumnTable;
