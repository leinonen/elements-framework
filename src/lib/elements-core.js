/**
 * Elements
 * Micro DOM Framework
 * By Peter Leinonen 2016
 */

const ELEMENTS = [
  'div', 'span', 'pre', 'code',
  'h1', 'h2', 'h3', 'h4', 'h5',
  'a', 'p', 'button', 'img',
  'ul', 'ol', 'li',
  'input', 'form',
  'table', 'tr', 'td', 'th', 'tbody'
];

/**
 * Create a wrapper around a DOM element so we can chain calls.
 * @param elem
 * @param tag
 * @returns {null}
 */
function create(elem, tag) {
  let el = elem || document.createElement(tag);
  let api = Object.create(null);

  api.dom = function() {
    return el;
  };

  api.text = function(txt) {
    el.innerText = txt;
    return api;
  };

  api.value = function(value) {
    el.value = value;
    return api;
  };

  api.html = function(html) {
    el.innerHTML = html;
    return api;
  };

  api.clear = function() {
    // http://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    // el.innerHTML = ''; // This is slow
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    return api;
  };

  api.content = function(element) {
    api.clear();
    if (typeof element === 'function') {
      el.appendChild(element().dom());
    } else {
      el.appendChild(element.dom());
    }

    return api;
  };

  api.attr = function(attr, value) {
    el.setAttribute(attr, value);
    return api;
  };

  api.css = function(css) {
    let classList = css.split(' ').filter(a => a.length > 0);
    if (classList.length > 0) {
      el.classList.add.apply(el.classList, classList);
    }
    return api;
  };

  api.toggleClass = function(className) {
    el.classList.toggle(className);
    return api;
  };

  api.addClass = function(className) {
    el.classList.add(className);
    return api;
  };

  api.removeClass = function(className) {
    el.classList.remove(className);
    return api;
  };

  api.on = function(name, callback) {
    el.addEventListener(name, callback.bind(api));
    return api;
  };

  api.subscribe = function(event, callback) {
    document.addEventListener(event, function(e) {
      callback.bind(api)(e.detail);
    });
    return api;
  };

  api.children = function(children) {
    api.clear();
    children.forEach(child => {
      if (typeof child === 'function') {
        el.appendChild(child().dom());
      } else {
        el.appendChild(child.dom());
      }
    });
    return api;
  };

  api.appendTo = function(target) {
    let targetEl = document.querySelector(target);
    if (targetEl) {
      targetEl.appendChild(el);
    }
  };

  api.exec = function(callback, wait) {
    if (typeof callback === 'function') {
      setTimeout(callback.bind(this), wait || 0);
    }
    return api;
  };

  return api;
}


// Wrap common DOM elements for our API.
let E = ELEMENTS.reduce((api, tag) => {
  api[tag] = () => create(null, tag);
  return api;
}, {});

/**
 * Basic AJAX implementation using standard XMLHttpRequest.
 * @param url
 * @returns {Promise}
 */
E.ajax = function(url, parse=true) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.onreadystatechange = () => {
      // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
      if (xhr.readyState == 4) { // DONE
        if (xhr.status == 200) {
          resolve(parse ? JSON.parse(xhr.responseText) : xhr.responseText);
        } else {
          reject(xhr.status);
        }
      }
    };
    xhr.send();
  });
};

/**
 * Find a single DOM element, and wrap it with our API.
 * @param selector
 * @returns wrapped DOM element.
 */
E.find = function find(selector) {
  return create(document.querySelector(selector));
};

/**
 * Find one or many DOM elements, wrapped with our API.
 * @param selector
 * @returns {Array} of DOM elements instead of NodeList for convenience.
 */
E.query = function query(selector) {
  let elements = document.querySelectorAll(selector);
  return Array.prototype.slice.call(elements, 0).map(create);
};

/**
 * Publish events.
 * @param event
 * @param message
 */
E.publish = function publish(event, message) {
  document.dispatchEvent(new CustomEvent(event, {
    'detail': message
  }));
};

export default E;