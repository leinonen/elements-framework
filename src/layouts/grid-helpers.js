import E from '../lib/elements';

export const Container = (children) => E.div().css('container').children(children);
export const Row = (children) => E.div().css('row').children(children);
export const Column = (children) => E.div().css('column').children(children);
