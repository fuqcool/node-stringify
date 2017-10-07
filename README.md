# node-stringify 

![Build Status](http://img.shields.io/travis/fuqcool/node-stringify.svg?style=flat-square) ![npm](http://img.shields.io/npm/v/node-stringify.svg?style=flat-square) ![Total Downloads](http://img.shields.io/npm/dm/node-stringify.svg?style=flat-square)

Stringify javascript objects and retrieve with `eval`.

## Important notes
This library **IS NOT** designed to replace `JSON.stringify`. Unless you truly understand what this library does, I suggest you use `JSON.stringify` in the first place.

## Install

```
npm install node-stringify --save
```

## Example

``` javascript
var stringify = require('node-stringify');

console.assert(stringify(123) === '123');

console.assert(stringify('abc') === '\'abc\'');

console.assert(stringify(null) === 'null');

console.assert(stringify(undefined) === 'undefined');

console.assert(stringify(new Date(1000)) === 'new Date(1000)');

console.assert(stringify(function (a,b,c) {}) === '(function (a,b,c) {})');

console.assert(stringify([1, 2, 3]) === '[1,2,3]');

// The parenthesis is to make the result work with `eval`
console.assert(stringify({a: 1, b: 2}) === '({a:1,b:2})');

console.assert(stringify({a: 1, b: [2, 3]}) === '({a:1,b:[2,3]})');

// You can turn off the parenthesis too
console.assert(stringify({a: 1, b: 2}, {parenthesis:false}) === '{a:1,b:2}');

console.assert(stringify({a: 1, b: [2, 3]}, {parenthesis:false}) === '{a:1,b:[2,3]}');
```

## Supported types

- null
- undefined
- number
- string
- date
- regexp
- function
- array
- object

## Difference with `JSON.stringify`
- The result of `node-stringify` can be retrieved directly using `eval`(Please be aware that `eval` may be insecure).

## Known issues
- Not support objects with circular references or too deeply nested(implemented in a recursive way).

## License
MIT License.
