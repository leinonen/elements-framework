/**
 * Elements
 * Micro DOM Framework
 * By Peter Leinonen 2016
 */

let ajax = function (api, url, successHandler, errorHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.onreadystatechange = function () {
    let status;
    let data;
    // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
    if (xhr.readyState == 4) { // `DONE`
      status = xhr.status;
      if (status == 200) {
        data = JSON.parse(xhr.responseText);
        successHandler && successHandler.bind(api)(data);
      } else {
        errorHandler && errorHandler.bind(api)(status);
      }
    }
  };
  xhr.send();
};

function create(tag) {
  let el = document.createElement(tag);
  let api = Object.create(null);

  api.wrap = function(elem) {
    let wrapper = create('div');
    wrapper.el = elem;
    return wrapper;
  };

  api.find = function (selector) {
    el = document.querySelector(selector);
    return api;
  };

  api.handler = function (callback) {
    callback();
    return api;
  };

  api.query = function (selector) {
    let obj = document.querySelectorAll(selector);
    return Array.prototype.slice.call(obj, 0);
  };

  api.dom = function () {
    return el;
  };

  api.text = function (txt) {
    el.innerText = txt;
    return api;
  };

  api.html = function (html) {
    el.innerHTML = html;
    return api;
  };

  api.attr = function (attr, value) {
    el.setAttribute(attr, value);
    return api;
  };

  api.css = function (css) {
    el.classList.add.apply(el.classList, css.split(' '));
    return api;
  };

  api.toggleClass = function(klass) {
    el.classList.toggle(klass);
    return api;
  };

  api.on = function (name, callback) {
    el.addEventListener(name, callback.bind(api));
    return api;
  };

  api.clear = function () {
    el.innerHTML = '';
    return api;
  };

  api.children = function (children) {
    children.forEach(child => el.appendChild(child.dom()));
    return api;
  };

  api.appendTo = function (target) {
    document.querySelector(target).appendChild(el)
  };

  api.exec = function(callback, wait) {
    if (typeof callback === 'function') {
      setTimeout(callback.bind(this), wait);
    }
    return api;
  };

  api.ajax = function (url) {
    return new Promise((resolve, reject) => {
      ajax(api, url, function (data) {
        resolve.bind(this)(data);
      }, function (err) {
        reject.bind(this)(err);
      });
    });
  };

  return api;
}

const ELEMENTS = ['div', 'span', 'h1', 'h2', 'h3', 'h4', 'p', 'button', 'ul', 'li', 'a', 'input', 'form'];

let E = ELEMENTS.reduce((prev, tag) => {
  prev[tag] = () => create(tag);
  return prev;
}, {});

export default E;