'use strict';
const {isArray} = Array;

const sync = (values, i) => {
  const resolved = [];
  for (const {length} = values; i < length; i++)
    resolved.push(isArray(values[i]) ? sync(values[i], 0) : values[i]);
  return Promise.all(resolved);
};

/**
 * Returns a template literal tag abe to resolve, recursively, any possible
 * asynchronous interpolation.
 * @param {function} tag a template literal tag.
 * @returns {function} a template literal tag that resolves interpolations
 *                     before passing these to the initial template literal.
 */
module.exports = tag => {
  function invoke(template, values) {
    return tag.apply(this, [template].concat(values));
  }
  return function (template) {
    return sync(arguments, 1).then(invoke.bind(this, template));
  };
};
