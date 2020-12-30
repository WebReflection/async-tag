# async-tag

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
