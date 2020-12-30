const {isArray} = Array;

const sync = (values, i) => {
  const resolved = [];
  for (const {length} = values; i < length; i++)
    resolved.push(isArray(values[i]) ? sync(values[i], 0) : values[i]);
  return Promise.all(resolved);
};

export default tag => {
  function invoke(template, values) {
    return tag.apply(this, [template].concat(values));
  }
  return function (template) {
    return sync(arguments, 1).then(invoke.bind(this, template));
  };
};
