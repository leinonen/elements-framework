import E from './elements';

export const div = (children) => E.div().children(children);
export const p = (text) => E.p().text(text);
export const h1 = (text) => E.h1().text(text);
export const h4 = (text) => E.h4().text(text);
export const textInput = value => E.input()
  .attr('type', 'text')
  .value(value);
