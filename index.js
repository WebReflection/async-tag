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
