import chai from 'chai';

import Header from './header';

chai.expect();
const expect = chai.expect;

describe('Header', () => {

  before(() => {
    Header.appendTo('body');
  });

  it('should set the provided properties', () => {

    let el = document.querySelector('h1');

    expect(el.innerText).to.be.equal('hello world');

  });

});
