self.asyncTag = (function () {
  'use strict';

  var isArray = Array.isArray;

  var sync = function sync(values, i) {
    var resolved = [];

    for (var length = values.length; i < length; i++) {
      resolved.push(isArray(values[i]) ? sync(values[i], 0) : values[i]);
    }

    return Promise.all(resolved);
  };
  /**
   * Returns a template literal tag abe to resolve, recursively, any possible
   * asynchronous interpolation.
   * @param {function} tag a template literal tag.
   * @returns {function} a template literal tag that resolves interpolations
   *                     before passing these to the initial template literal.
   */


  var index = (function (tag) {
    function invoke(template, values) {
      return tag.apply(this, [template].concat(values));
    }

    return function (template) {
      return sync(arguments, 1).then(invoke.bind(this, template));
    };
  });

  return index;

  

  

}());
