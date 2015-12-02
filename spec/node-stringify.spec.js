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
    expect(stringify(function (a, b) { return a + b }))
      .toBe('(function (a, b) { return a + b })')

    var fn = eval(stringify(function (a, b) { return a + b }))
    expect(fn(2, 5)).toBe(7)
  })

  it('should stringify a number', function () {
    expect(stringify(100)).toBe('100')
    testEval(100)
  })

  it('should stringify special numbers', function () {
    expect(stringify(NaN)).toBe('NaN')
    expect(stringify(Infinity)).toBe('Infinity')
  })

  it('should stringify a boolean', function () {
    expect(stringify(true)).toBe('true')
    testEval(true)

    expect(stringify(false)).toBe('false')
    testEval(false)
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

  it('should stringify a string with multiple lines', function () {
    expect(stringify('\n')).toBe("'\\n'")
    testEval('\n')
  })

  it('should stringify a windows style multi-line', function () {
    expect(stringify('abc\r\n')).toBe("'abc\\r\\n'")
    testEval('abc\r\n')
  })

  it('should stringify a string with special chars', function () {
    expect(stringify('ab\t\b\v\fc')).toBe("'ab\\t\\b\\v\\fc'")
    testEval('ab\t\b\v\f\\c')
  })

  it('should stringify an empty array', function () {
    expect(stringify([])).toBe('[]')
    testEval([])
  })

  it('should stringify an array containning simple objects', function () {
    testEval([77, null, undefined, "a'bc"])
  })

  it('should stringify arguments to array', function () {
    var fn = function (a, b) {
      expect(stringify(arguments)).toBe('[3,5]')
    }

    fn(3, 5)
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

  it('should stringify an object having non-valid identifiers as keys', function () {
    testEval({"a'bc": [1]})
  })
})
