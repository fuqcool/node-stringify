var stringify = require('../node-stringify.js')

describe('node-stringify test', function () {
  var testEval = function (obj) {
    expect(eval(stringify(obj))).toEqual(obj)
  }

  it('should stringify null', function () {
    expect(stringify(null)).toBe('null')
    testEval(null)
  })

  it('should stringify undefined', function () {
    expect(stringify(undefined)).toBe('undefined')
    testEval(undefined)
  })

  it('should stringify regexp', function () {
    expect(stringify(/test/gi)).toBe('/test/gi')
    testEval(/test/gi)
  })

  it('should stringify a function', function () {
    expect(stringify(function (x, y, z) {})).toBe('(function (x, y, z) {})')
  })

  it('should stringify a number', function () {
    expect(stringify(100)).toBe('100')
    testEval(100)
  })

  it('should stringify a date', function () {
    expect(stringify(new Date(1000))).toBe('new Date(1000)')
    testEval(new Date(1000))
  })

  it('should stringify a simple string', function () {
    expect(stringify('abc')).toBe("'abc'")
    testEval('abc')
  })

  it('should stringify a string containning single quote', function () {
    expect(stringify("a'bc")).toBe("'a\\'bc'")
    testEval("a'bc")
  })

  it('should stringify an empty array', function () {
    expect(stringify([])).toBe('[]')
    testEval([])
  })

  it('should stringify an array containning simple objects', function () {
    testEval([77, null, undefined, "a'bc"])
  })

  it('should stringify an empty object', function () {
    expect(stringify({})).toBe('({})')
    testEval({})
  })

  it('should stringify an object with some fields', function () {
    testEval({a: 123, b: 'abc'})
  })

  it('should stringify an array containning objects', function () {
    testEval([{a: 123}, ['abc', {}]])
  })

  it('should stringify an object containning arrays', function () {
    testEval({a: [1, 2, 3], b: /foo$/i})
  })
})
