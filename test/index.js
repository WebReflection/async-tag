const asyncTag = require('../cjs');

const asyncRaw = asyncTag(String.raw);

// async invoke
asyncRaw`a${[
  1,
  [2, [Promise.resolve(3)], 4],
  [5, 6]
]}${Promise.resolve(7)}c`
  .then(result => {
    console.assert(result === 'a1,2,3,4,5,67c')
  });

// direct invoke
asyncRaw`a${'b'}c`
.then(result => {
  console.assert(result === 'abc')
});
