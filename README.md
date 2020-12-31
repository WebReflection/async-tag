# async-tag

[![Build Status](https://travis-ci.com/WebReflection/async-tag.svg?branch=main)](https://travis-ci.com/WebReflection/async-tag) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/async-tag/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/async-tag?branch=main)

<sup>**Social Media Photo by [Tobias Rademacher](https://unsplash.com/@tobbes_rd) on [Unsplash](https://unsplash.com/)**</sup>

Resolves template literals tag values before applying a generic tag.

```js
import asyncTag from 'async-tag';
// or const asyncTag = require('asyncTag');
// or <script src="//unpkg.com/async-tag">

// example
const asyncRaw = asyncTag(String.raw);

// async values
asyncRaw`a${[
  1,
  [2, [Promise.resolve(3)], 4],
  [5, 6]
]}${Promise.resolve(7)}c`
  .then(result => {
    console.assert(result === 'a1,2,3,4,5,67c')
  });

// direct values
asyncRaw`a${'b'}c`
  .then(result => {
    console.assert(result === 'abc')
  });
```

### Compatibility

This [module source code](./esm/index.js) is written in a way that guarantees there won't be any code bloat once transpiled, without necessarily providing worse performance than native ES6+.

Both [index.js](./index.js) and [min.js](./min.js) target any client/server JavaScript engine, assuming there is support, or there is a polyfill, for:

  * `Array.isArray(any)` to work with nested interpolations
  * `Promise.all(array)` to resolve all interpolations
  * `Function.prototype.bind` to be sure both context and template are expected

Please note this module is pretty much done so, if there are not many updates in the long term, it's because it's 100% code covered and, for what it does, it won't likely need any change in the future.
