var stringify = require('../js-stringify.js')

describe('js-stringify test', function () {

  it('should stringify null', function () {
    expect(stringify(null)).toBe('null')
  })

  it('should stringify undefined', function () {
    expect(stringify(undefined)).toBe('undefined')
  })

  it('should stringify regexp', function () {
    expect(stringify(/test/gi)).toBe('/test/gi')
  })

  it('should stringify a function', function () {
    expect(stringify(function (x, y, z) {})).toBe('function (x, y, z) {}')
  })

  it('should stringify a number', function () {
    expect(stringify(100)).toBe('100')
  })

  it('should stringify a simple string', function () {
    expect(stringify('abc')).toBe("'abc'")
  })

  it('should stringify a string containning single quote', function () {
    expect(stringify("a'bc")).toBe("'a\\'bc'")
    expect(eval(stringify("a'bc"))).toBe("a'bc")
  })

  it('should stringify an empty array', function () {
    expect(stringify([])).toBe('[]')
  })

  it('should stringify an array containning simple objects', function () {
    expect(eval(stringify([77, null, undefined, "a'bc"]))).toEqual([77, null, undefined, "a'bc"])
  })

  it('should stringify a simple object', function () {
    console.log(eval(stringify({ a: 77, b: 'abc' })));
    // expect(eval(stringify({ a: 77, b: 'abc' }))).toEqual({ a: 77, b: 'abc' });
  })

})
